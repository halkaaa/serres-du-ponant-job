import { Badge } from "@/components/ui/badge";
import { APPLICATION_STATUS_LABELS, APPLICATION_STATUS_COLORS } from "@/lib/utils";
import type { ApplicationStatus } from "@/types";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant={APPLICATION_STATUS_COLORS[status]}>
      {APPLICATION_STATUS_LABELS[status]}
    </Badge>
  );
}
