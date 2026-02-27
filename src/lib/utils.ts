import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import type { ApplicationStatus, ContractType } from "@/types";

// ─── Tailwind merge ──────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Slug ────────────────────────────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Dates ───────────────────────────────────
export function formatDate(date: string | Date): string {
  return format(new Date(date), "d MMMM yyyy", { locale: fr });
}

export function formatDateRelative(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
}

// ─── Statut candidature ──────────────────────
export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  PENDING:   "En attente",
  INTERVIEW: "Entretien",
  REJECTED:  "Refusé",
  ACCEPTED:  "Accepté",
};

export const APPLICATION_STATUS_COLORS: Record<
  ApplicationStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  PENDING:   "secondary",
  INTERVIEW: "default",
  REJECTED:  "destructive",
  ACCEPTED:  "outline",
};

// ─── Type de contrat ─────────────────────────
export const CONTRACT_LABELS: Record<ContractType, string> = {
  CDI:        "CDI",
  CDD:        "CDD",
  Stage:      "Stage",
  Alternance: "Alternance",
  Freelance:  "Freelance",
};

export const CONTRACT_COLORS: Record<ContractType, string> = {
  CDI:        "bg-brand-100 text-brand-800",
  CDD:        "bg-blue-100 text-blue-800",
  Stage:      "bg-purple-100 text-purple-800",
  Alternance: "bg-orange-100 text-orange-800",
  Freelance:  "bg-yellow-100 text-yellow-800",
};

// ─── Départements ────────────────────────────
export const DEPARTMENTS = [
  "Production",
  "Commercial",
  "Marketing",
  "Logistique",
  "Administratif",
  "Technique",
  "Direction",
] as const;

export type Department = (typeof DEPARTMENTS)[number];
