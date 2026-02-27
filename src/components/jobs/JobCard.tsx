import Link from "next/link";
import { MapPin, Clock, Banknote, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CONTRACT_COLORS, CONTRACT_LABELS, formatDateRelative, cn } from "@/lib/utils";
import type { Job } from "@/types";

interface JobCardProps {
  job: Job;
  showActions?: boolean; // admin mode
}

export default function JobCard({ job, showActions = false }: JobCardProps) {
  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex-1">
            <Link href={`/jobs/${job.slug}`}>
              <h2 className="text-lg font-semibold leading-tight text-foreground group-hover:text-brand-700 transition-colors">
                {job.title}
              </h2>
            </Link>
            <p className="mt-0.5 text-sm text-muted-foreground">{job.department}</p>
          </div>

          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-semibold",
              CONTRACT_COLORS[job.contract]
            )}
          >
            {CONTRACT_LABELS[job.contract]}
          </span>
        </div>

        {/* Meta */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {job.location}
          </span>
          {job.salary_range && (
            <span className="flex items-center gap-1">
              <Banknote className="h-3.5 w-3.5 shrink-0" />
              {job.salary_range}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            {formatDateRelative(job.created_at)}
          </span>
          {showActions && (
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 shrink-0" />
              {job.applications_count ?? 0} candidature{(job.applications_count ?? 0) !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t px-5 py-3">
        {showActions ? (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                job.is_published ? "bg-brand-500" : "bg-muted-foreground"
              )}
            />
            <span className="text-xs text-muted-foreground">
              {job.is_published ? "Publiée" : "Brouillon"}
            </span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">
            {job.view_count} vue{job.view_count !== 1 ? "s" : ""}
          </span>
        )}

        <Link href={`/jobs/${job.slug}`}>
          <Button size="sm" variant={showActions ? "outline" : "default"}>
            {showActions ? "Voir l'offre" : "Postuler"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
