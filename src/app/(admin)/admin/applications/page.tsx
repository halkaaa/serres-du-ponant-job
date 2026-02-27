import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Application } from "@/types";

export const metadata: Metadata = { title: "Admin — Toutes les candidatures" };

export default async function AdminApplicationsPage() {
  const supabase = await createClient();

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title, slug, applications(count)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Candidatures</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les candidatures par offre d&apos;emploi.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(jobs ?? []).map((job) => {
          const count = (job.applications as unknown as { count: number }[])?.[0]?.count ?? 0;
          return (
            <Link key={job.id} href={`/admin/applications/${job.id}`}>
              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold line-clamp-2">
                    {job.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{count}</span>
                    <Badge variant={count > 0 ? "default" : "secondary"}>
                      {count} candidature{count !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {(jobs ?? []).length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Aucune offre créée.
        </p>
      )}
    </div>
  );
}
