import Link from "next/link";
import { ExternalLink, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "@/components/applications/StatusBadge";
import { formatDate } from "@/lib/utils";
import type { Application } from "@/types";

interface ApplicationCardProps {
  application: Application;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          {/* Infos offre */}
          <div className="flex-1">
            {application.job ? (
              <Link
                href={`/jobs/${application.job.slug}`}
                className="font-semibold hover:text-brand-700 transition-colors"
              >
                {application.job.title}
              </Link>
            ) : (
              <span className="font-semibold text-muted-foreground">[Offre supprimée]</span>
            )}

            {application.job && (
              <p className="mt-0.5 text-sm text-muted-foreground">
                {application.job.department} · {application.job.location}
              </p>
            )}
          </div>

          <StatusBadge status={application.status} />
        </div>

        <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            Postulé le {formatDate(application.created_at)}
          </span>

          <a
            href={application.cv_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-brand-600 hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Voir le CV
          </a>
        </div>

        {application.cover_letter && (
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {application.cover_letter}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
