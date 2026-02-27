// ============================================
// Types globaux — Serres du Ponant Job
// ============================================

export type UserRole = "USER" | "ADMIN";

export type ContractType = "CDI" | "CDD" | "Stage" | "Alternance" | "Freelance";

export type ApplicationStatus = "PENDING" | "INTERVIEW" | "REJECTED" | "ACCEPTED";

// ─── Profile ────────────────────────────────
export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
}

// ─── Job ────────────────────────────────────
export interface Job {
  id: string;
  slug: string;
  title: string;
  description: string;
  department: string;
  location: string;
  contract: ContractType;
  salary_range: string | null;
  is_published: boolean;
  view_count: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  // Computed via join
  applications_count?: number;
}

export type JobInsert = Omit<Job, "id" | "view_count" | "created_at" | "updated_at">;
export type JobUpdate = Partial<JobInsert>;

// ─── Application ─────────────────────────────
export interface Application {
  id: string;
  job_id: string;
  candidate_id: string | null;
  full_name: string;
  email: string;
  cover_letter: string | null;
  cv_url: string;
  status: ApplicationStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
  // Relations
  job?: Pick<Job, "id" | "title" | "slug" | "department" | "location">;
}

export type ApplicationInsert = Omit<
  Application,
  "id" | "status" | "admin_notes" | "created_at" | "updated_at" | "job"
>;

// ─── Filtres offres ──────────────────────────
export interface JobFilters {
  contract?: ContractType | "";
  department?: string;
  location?: string;
  search?: string;
}

// ─── Statistiques admin ──────────────────────
export interface AdminStats {
  totalJobs: number;
  publishedJobs: number;
  totalApplications: number;
  pendingApplications: number;
  totalViews: number;
}

// ─── Utilitaires ────────────────────────────
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };
