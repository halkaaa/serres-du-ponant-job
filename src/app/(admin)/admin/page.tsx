import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Users, Eye, Clock, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import StatsCard from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/applications/StatusBadge";
import { formatDateRelative } from "@/lib/utils";
import type { AdminStats, Application } from "@/types";

export const metadata: Metadata = { title: "Admin — Vue d'ensemble" };

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Statistiques
  const [
    { count: totalJobs },
    { count: publishedJobs },
    { count: totalApplications },
    { count: pendingApplications },
    { data: viewsData },
  ] = await Promise.all([
    supabase.from("jobs").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("applications").select("*", { count: "exact", head: true }),
    supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "PENDING"),
    supabase.from("jobs").select("view_count"),
  ]);

  const totalViews = (viewsData ?? []).reduce((sum, j) => sum + j.view_count, 0);

  const stats: AdminStats = {
    totalJobs:           totalJobs ?? 0,
    publishedJobs:       publishedJobs ?? 0,
    totalApplications:   totalApplications ?? 0,
    pendingApplications: pendingApplications ?? 0,
    totalViews,
  };

  // Dernières candidatures
  const { data: recentApps } = await supabase
    .from("applications")
    .select("*, job:jobs(id, title, slug)")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vue d&apos;ensemble</h1>
          <p className="text-sm text-muted-foreground">
            Tableau de bord recrutement — Serres du Ponant
          </p>
        </div>
        <Link href="/admin/jobs/new">
          <Button className="gap-2">
            <Briefcase className="h-4 w-4" />
            Nouvelle offre
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard
          title="Offres publiées"
          value={stats.publishedJobs}
          icon={Briefcase}
          description={`sur ${stats.totalJobs} au total`}
        />
        <StatsCard
          title="Candidatures"
          value={stats.totalApplications}
          icon={Users}
          description="toutes offres"
        />
        <StatsCard
          title="En attente"
          value={stats.pendingApplications}
          icon={Clock}
          description="à traiter"
        />
        <StatsCard
          title="Vues totales"
          value={stats.totalViews}
          icon={Eye}
          description="sur toutes les offres"
        />
      </div>

      {/* Dernières candidatures */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Dernières candidatures</CardTitle>
          <Link href="/admin/applications">
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              Voir tout <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {(recentApps ?? []).length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              Aucune candidature reçue.
            </p>
          ) : (
            <div className="divide-y">
              {(recentApps ?? []).map((app) => (
                <div
                  key={app.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div>
                    <p className="font-medium text-sm">{app.full_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(app.job as { title: string } | null)?.title ?? "Offre supprimée"} ·{" "}
                      {formatDateRelative(app.created_at)}
                    </p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
