import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

// DELETE /api/account — Suppression du compte candidat
export async function DELETE() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  // Empêcher la suppression d'un compte admin depuis ce endpoint
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "ADMIN") {
    return NextResponse.json(
      { error: "Un compte administrateur ne peut pas être supprimé via cette interface." },
      { status: 403 }
    );
  }

  // Anonymiser les candidatures (on garde les données RH mais on retire le lien au compte)
  await supabase
    .from("applications")
    .update({ candidate_id: null })
    .eq("candidate_id", user.id);

  // Supprimer le profil (la cascade supprime les données liées)
  await supabase.from("profiles").delete().eq("id", user.id);

  // Supprimer l'utilisateur Supabase Auth (nécessite le service role)
  const adminClient = await createAdminClient();
  const { error } = await adminClient.auth.admin.deleteUser(user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
