import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { jobSchema } from "@/lib/validations";

// GET /api/jobs — Liste des offres
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const supabase = await createClient();

  let query = supabase
    .from("jobs")
    .select("*, applications(count)")
    .order("created_at", { ascending: false });

  const contract = searchParams.get("contract");
  const department = searchParams.get("department");
  const search = searchParams.get("search");
  const adminAll = searchParams.get("adminAll");

  if (!adminAll) {
    query = query.eq("is_published", true);
  }
  if (contract) query = query.eq("contract", contract);
  if (department) query = query.eq("department", department);
  if (search) query = query.ilike("title", `%${search}%`);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/jobs — Créer une offre (admin)
export async function POST(request: Request) {
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

  const body = await request.json();
  const parsed = jobSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("jobs")
    .insert({ ...parsed.data, slug: body.slug, created_by: user.id })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
