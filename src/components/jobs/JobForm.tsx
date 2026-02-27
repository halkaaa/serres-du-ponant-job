"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobSchema, type JobFormValues } from "@/lib/validations";
import { DEPARTMENTS } from "@/lib/utils";
import type { Job } from "@/types";

// Éditeur Markdown — chargé uniquement côté client
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface JobFormProps {
  job?: Job;
  onSubmit: (values: JobFormValues) => Promise<void>;
}

const CONTRACTS = ["CDI", "CDD", "Stage", "Alternance", "Freelance"] as const;

export default function JobForm({ job, onSubmit }: JobFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mdValue, setMdValue] = useState(job?.description ?? "");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title:        job?.title ?? "",
      description:  job?.description ?? "",
      department:   job?.department ?? "",
      location:     job?.location ?? "",
      contract:     job?.contract ?? undefined,
      salary_range: job?.salary_range ?? "",
      is_published: job?.is_published ?? false,
    },
  });

  async function handleFormSubmit(values: JobFormValues) {
    setLoading(true);
    try {
      await onSubmit({ ...values, description: mdValue });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Titre */}
      <div className="space-y-1.5">
        <Label htmlFor="title">Titre du poste *</Label>
        <Input id="title" placeholder="ex: Technicien(ne) de Serre" {...register("title")} />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* Contrat + Département */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Type de contrat *</Label>
          <Select
            defaultValue={job?.contract}
            onValueChange={(v) => setValue("contract", v as JobFormValues["contract"])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner..." />
            </SelectTrigger>
            <SelectContent>
              {CONTRACTS.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.contract && (
            <p className="text-xs text-destructive">{errors.contract.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Département *</Label>
          <Select
            defaultValue={job?.department}
            onValueChange={(v) => setValue("department", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner..." />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.department && (
            <p className="text-xs text-destructive">{errors.department.message}</p>
          )}
        </div>
      </div>

      {/* Localisation + Salaire */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="location">Localisation *</Label>
          <Input id="location" placeholder="ex: Plouguerneau (29)" {...register("location")} />
          {errors.location && (
            <p className="text-xs text-destructive">{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="salary_range">Fourchette salariale</Label>
          <Input
            id="salary_range"
            placeholder="ex: 30 000 – 35 000 €"
            {...register("salary_range")}
          />
        </div>
      </div>

      {/* Description Markdown */}
      <div className="space-y-1.5">
        <Label>Description du poste * (Markdown)</Label>
        <div data-color-mode="light">
          <MDEditor
            value={mdValue}
            onChange={(v) => {
              setMdValue(v ?? "");
              setValue("description", v ?? "");
            }}
            height={400}
            preview="live"
          />
        </div>
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Publication */}
      <div className="flex items-center gap-3">
        <input
          id="is_published"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-brand-600"
          {...register("is_published")}
        />
        <Label htmlFor="is_published" className="cursor-pointer">
          Publier l&apos;offre immédiatement
        </Label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading} className="gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {job ? "Mettre à jour" : "Créer l'offre"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}
