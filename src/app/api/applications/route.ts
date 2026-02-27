import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { z } from "zod";

const insertSchema = z.object({
  job_id:       z.string().uuid(),
  candidate_id: z.string().uuid().nullable().optional(),
  full_name:    z.string().min(2),
  email:        z.string().email(),
  cover_letter: z.string().nullable().optional(),
  cv_url:       z.string().url(),
});

// GET /api/applications?jobId=... (admin)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "ADMIN") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  let query = supabase
    .from("applications")
    .select("*, job:jobs(id, title, slug, department, location)")
    .order("created_at", { ascending: false });

  if (jobId) query = query.eq("job_id", jobId);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

// POST /api/applications — Soumettre une candidature
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = insertSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Vérifier que l'offre est publiée (client standard, lecture publique)
  const supabase = await createClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("id, is_published")
    .eq("id", parsed.data.job_id)
    .single();

  if (!job || !job.is_published) {
    return NextResponse.json({ error: "Offre introuvable ou non publiée" }, { status: 404 });
  }

  // Insert avec le client admin pour bypasser la RLS (fonctionne connecté ou non)
  const adminSupabase = await createAdminClient();
  const { data, error } = await adminSupabase
    .from("applications")
    .insert(parsed.data)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Vous avez déjà postulé à cette offre avec cet email." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
