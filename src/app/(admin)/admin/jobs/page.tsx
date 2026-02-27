import Link from "next/link";
import type { Metadata } from "next";
import { Plus, Pencil, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CONTRACT_COLORS, CONTRACT_LABELS, formatDate, cn } from "@/lib/utils";
import DeleteJobButton from "@/components/admin/DeleteJobButton";
import type { Job } from "@/types";

export const metadata: Metadata = { title: "Admin — Offres d'emploi" };

export default async function AdminJobsPage() {
  const supabase = await createClient();

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*, applications(count)")
    .order("created_at", { ascending: false });

  const formattedJobs: Job[] = (jobs ?? []).map((j) => ({
    ...j,
    applications_count: (j.applications as unknown as { count: number }[])?.[0]?.count ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Offres d&apos;emploi</h1>
          <p className="text-sm text-muted-foreground">
            {formattedJobs.length} offre{formattedJobs.length !== 1 ? "s" : ""} au total
          </p>
        </div>
        <Link href="/admin/jobs/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle offre
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Titre</th>
              <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Contrat</th>
              <th className="hidden px-4 py-3 text-left font-medium lg:table-cell">Localisation</th>
              <th className="px-4 py-3 text-left font-medium">Candidatures</th>
              <th className="px-4 py-3 text-left font-medium">Statut</th>
              <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Date</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {formattedJobs.map((job) => (
              <tr key={job.id} className="transition-colors hover:bg-muted/20">
                <td className="px-4 py-3 font-medium">{job.title}</td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                      CONTRACT_COLORS[job.contract]
                    )}
                  >
                    {CONTRACT_LABELS[job.contract]}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                  {job.location}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {job.applications_count ?? 0}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={job.is_published ? "default" : "secondary"}>
                    {job.is_published ? "Publiée" : "Brouillon"}
                  </Badge>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                  {formatDate(job.created_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/jobs/${job.slug}`} target="_blank">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/jobs/${job.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeleteJobButton jobId={job.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {formattedJobs.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            Aucune offre créée. Commencez par en créer une !
          </div>
        )}
      </div>
    </div>
  );
}
