"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import StatusBadge from "@/components/applications/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import type { Application, ApplicationStatus } from "@/types";

interface CandidateTableProps {
  applications: Application[];
  onStatusChange?: (id: string, status: ApplicationStatus) => Promise<void>;
  isAdmin?: boolean;
}

const STATUSES: ApplicationStatus[] = ["PENDING", "INTERVIEW", "REJECTED", "ACCEPTED"];
const STATUS_LABELS: Record<ApplicationStatus, string> = {
  PENDING:   "En attente",
  INTERVIEW: "Entretien",
  REJECTED:  "Refusé",
  ACCEPTED:  "Accepté",
};

export default function CandidateTable({
  applications,
  onStatusChange,
  isAdmin = false,
}: CandidateTableProps) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleStatusChange(id: string, status: ApplicationStatus) {
    if (!onStatusChange) return;
    setLoading(id);
    try {
      await onStatusChange(id, status);
    } finally {
      setLoading(null);
    }
  }

  if (applications.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Aucune candidature pour le moment.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Candidat</th>
            {isAdmin && (
              <th className="px-4 py-3 text-left font-medium">Email</th>
            )}
            <th className="px-4 py-3 text-left font-medium">Date</th>
            <th className="px-4 py-3 text-left font-medium">CV</th>
            <th className="px-4 py-3 text-left font-medium">Statut</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {applications.map((app) => (
            <tr key={app.id} className="transition-colors hover:bg-muted/20">
              <td className="px-4 py-3 font-medium">{app.full_name}</td>

              {isAdmin && (
                <td className="px-4 py-3 text-muted-foreground">{app.email}</td>
              )}

              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(app.created_at)}
              </td>

              <td className="px-4 py-3">
                <a
                  href={app.cv_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-600 hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Voir
                </a>
              </td>

              <td className="px-4 py-3">
                {isAdmin && onStatusChange ? (
                  <Select
                    value={app.status}
                    onValueChange={(v) =>
                      handleStatusChange(app.id, v as ApplicationStatus)
                    }
                    disabled={loading === app.id}
                  >
                    <SelectTrigger className="h-8 w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <StatusBadge status={app.status} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
