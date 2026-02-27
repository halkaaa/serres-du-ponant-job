import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5 Mo

// POST /api/applications/upload — Upload CV via le client admin (bypass RLS)
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Aucun fichier fourni." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Format non autorisé (PDF, DOC, DOCX)." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Fichier trop volumineux (max 5 Mo)." }, { status: 400 });
  }

  const supabase = await createAdminClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const buffer = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from("resumes")
    .upload(fileName, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: "Erreur lors du téléchargement du CV." }, { status: 500 });
  }

  // URL signée valable 10 ans
  const { data: signedData } = await supabase.storage
    .from("resumes")
    .createSignedUrl(fileName, 60 * 60 * 24 * 365 * 10);

  if (!signedData?.signedUrl) {
    return NextResponse.json({ error: "Impossible de générer le lien du CV." }, { status: 500 });
  }

  return NextResponse.json({ url: signedData.signedUrl });
}
