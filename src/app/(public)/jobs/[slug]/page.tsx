import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { MapPin, Banknote, Calendar, Eye } from "lucide-react";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
import ApplicationForm from "@/components/applications/ApplicationForm";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CONTRACT_COLORS, CONTRACT_LABELS, formatDate, cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Génération des métadonnées dynamiques (SEO)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase
    .from("jobs")
    .select("title, description, location, contract")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!job) return { title: "Offre non trouvée" };

  return {
    title: job.title,
    description: `${job.contract} · ${job.location} — ${job.description.slice(0, 155)}...`,
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!job) notFound();

  // Incrémenter le compteur de vues (fire & forget via admin client)
  const adminClient = await createAdminClient();
  await adminClient
    .from("jobs")
    .update({ view_count: job.view_count + 1 })
    .eq("id", job.id);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Contenu principal */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex-1">
                <h1 className="text-2xl font-bold leading-tight">{job.title}</h1>
                <p className="mt-1 text-muted-foreground">{job.department}</p>
              </div>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-sm font-semibold",
                  CONTRACT_COLORS[job.contract as keyof typeof CONTRACT_COLORS]
                )}
              >
                {CONTRACT_LABELS[job.contract as keyof typeof CONTRACT_LABELS]}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-600" />
                {job.location}
              </span>
              {job.salary_range && (
                <span className="flex items-center gap-1.5">
                  <Banknote className="h-4 w-4 text-brand-600" />
                  {job.salary_range}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand-600" />
                Publiée le {formatDate(job.created_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-brand-600" />
                {job.view_count + 1} vue{job.view_count + 1 > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Description Markdown */}
          <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Description du poste</h2>
            <Separator className="mb-5" />
            <article className="prose prose-sm max-w-none prose-headings:text-foreground prose-a:text-brand-600">
              <ReactMarkdown>{job.description}</ReactMarkdown>
            </article>
          </div>
        </div>

        {/* Sidebar — Formulaire de candidature */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-sm">
            <ApplicationForm jobId={job.id} jobTitle={job.title} />
          </div>
        </div>
      </div>

      {/* Clause de non-discrimination */}
      <div className="mt-8 rounded-xl border border-muted bg-muted/30 px-5 py-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Égalité de traitement — </span>
          Serres du Ponant s&apos;engage à respecter le principe de non-discrimination
          à l&apos;embauche conformément à l&apos;article L1132-1 du Code du travail. Toutes les
          candidatures sont examinées sans distinction de sexe, d&apos;âge, d&apos;origine,
          de handicap, d&apos;orientation sexuelle, d&apos;opinions politiques ou de convictions
          religieuses. Si vous êtes en situation de handicap et nécessitez un aménagement
          de poste, merci de le préciser dans votre candidature.
        </p>
      </div>
    </div>
  );
}
