import { Briefcase } from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import type { Job } from "@/types";

interface JobListProps {
  jobs: Job[];
  showActions?: boolean;
}

export default function JobList({ jobs, showActions = false }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <Briefcase className="mb-4 h-10 w-10 text-muted-foreground/40" />
        <h3 className="text-lg font-semibold">Aucune offre trouvée</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Essayez de modifier vos filtres ou revenez plus tard.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        {jobs.length} offre{jobs.length !== 1 ? "s" : ""} disponible
        {jobs.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} showActions={showActions} />
        ))}
      </div>
    </div>
  );
}
