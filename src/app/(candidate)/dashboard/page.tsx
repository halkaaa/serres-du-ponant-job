import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ApplicationCard from "@/components/applications/ApplicationCard";
import DeleteAccountButton from "@/components/dashboard/DeleteAccountButton";
import { Separator } from "@/components/ui/separator";
import type { Application } from "@/types";

export const metadata: Metadata = {
  title: "Mes candidatures",
};

export default async function CandidateDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/dashboard");

  const { data: applications } = await supabase
    .from("applications")
    .select("*, job:jobs(id, title, slug, department, location)")
    .eq("candidate_id", user.id)
    .order("created_at", { ascending: false });

  const apps = (applications ?? []) as Application[];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mes candidatures</h1>
        <p className="mt-1 text-muted-foreground">
          Suivez l&apos;état de toutes vos candidatures en temps réel.
        </p>
      </div>

      {/* Candidatures */}
      {apps.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
          <ClipboardList className="mb-4 h-10 w-10 text-muted-foreground/40" />
          <h3 className="text-lg font-semibold">Aucune candidature</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Vous n&apos;avez encore postulé à aucune offre.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {apps.length} candidature{apps.length !== 1 ? "s" : ""} envoyée
            {apps.length !== 1 ? "s" : ""}
          </p>
          {apps.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}

      {/* Zone de danger */}
      <div className="mt-16">
        <Separator className="mb-8" />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold">Zone de danger</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              La suppression de votre compte est définitive et irréversible.
              Vos données personnelles seront effacées conformément au RGPD.
            </p>
          </div>
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
}
