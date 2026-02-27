import { Suspense } from "react";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import JobList from "@/components/jobs/JobList";
import JobFilters from "@/components/jobs/JobFilters";
import type { Job, ContractType } from "@/types";

export const metadata: Metadata = {
  title: "Nos offres d'emploi",
  description:
    "Découvrez toutes les offres d'emploi des Serres du Ponant : CDI, CDD, stage et alternance en Bretagne.",
};

interface PageProps {
  searchParams: Promise<{
    search?:     string;
    contract?:   string;
    department?: string;
  }>;
}

async function JobResults({ searchParams }: { searchParams: Awaited<PageProps["searchParams"]> }) {
  const supabase = await createClient();

  let query = supabase
    .from("jobs")
    .select("*, applications(count)")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (searchParams.search) {
    query = query.ilike("title", `%${searchParams.search}%`);
  }
  if (searchParams.contract) {
    query = query.eq("contract", searchParams.contract as ContractType);
  }
  if (searchParams.department) {
    query = query.eq("department", searchParams.department);
  }

  const { data: jobs } = await query;

  const formattedJobs: Job[] = (jobs ?? []).map((j) => ({
    ...j,
    applications_count: (j.applications as unknown as { count: number }[])?.[0]?.count ?? 0,
  }));

  return <JobList jobs={formattedJobs} />;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Rejoignez les{" "}
          <span className="text-brand-600">Serres du Ponant</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Producteur maraîcher passionné au cœur de la Bretagne. Découvrez nos
          opportunités et construisons ensemble l&apos;agriculture de demain.
        </p>
      </div>

      {/* Filtres */}
      <div className="mb-6">
        <Suspense>
          <JobFilters />
        </Suspense>
      </div>

      {/* Liste des offres */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        }
      >
        <JobResults searchParams={params} />
      </Suspense>
    </div>
  );
}
