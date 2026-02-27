"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CandidateTable from "@/components/dashboard/CandidateTable";
import type { Application, ApplicationStatus } from "@/types";

interface JobInfo {
  id: string;
  title: string;
  slug: string;
}

export default function AdminJobApplicationsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [applications, setApplications] = useState<Application[]>([]);
  const [job, setJob] = useState<JobInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const [appsRes, jobRes] = await Promise.all([
      fetch(`/api/applications?jobId=${jobId}`),
      fetch(`/api/jobs/${jobId}`),
    ]);

    const [appsData, jobData] = await Promise.all([appsRes.json(), jobRes.json()]);
    setApplications(appsData);
    setJob(jobData);
    setLoading(false);
  }, [jobId]);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleStatusChange(id: string, status: ApplicationStatus) {
    await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/applications">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Candidatures</h1>
          {job && (
            <p className="text-sm text-muted-foreground">
              {job.title} — {applications.length} candidature
              {applications.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <CandidateTable
          applications={applications}
          onStatusChange={handleStatusChange}
          isAdmin
        />
      </div>
    </div>
  );
}
