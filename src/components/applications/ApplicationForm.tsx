"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, FileText, Loader2, Upload, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { applicationSchema, type ApplicationFormValues } from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
}

export default function ApplicationForm({ jobId, jobTitle }: ApplicationFormProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null | undefined>(undefined); // undefined = chargement
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
  });

  async function onSubmit(values: ApplicationFormValues) {
    setLoading(true);
    setError(null);

    try {
      // 1. Upload du CV via l'API serveur (fonctionne connecté ou non)
      const formData = new FormData();
      formData.append("file", values.cv);

      const uploadRes = await fetch("/api/applications/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error ?? "Erreur lors du téléchargement du CV.");

      // 2. Créer la candidature
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id:       jobId,
          candidate_id: user?.id ?? null,
          full_name:    values.full_name,
          email:        values.email,
          cover_letter: values.cover_letter ?? null,
          cv_url:       uploadData.url,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Une erreur est survenue.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  // Chargement de la session
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Non connecté → CTA inscription
  if (user === null) {
    return (
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
          <UserPlus className="h-6 w-6 text-brand-600" />
        </div>
        <div>
          <h3 className="font-semibold">Postuler à cette offre</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Vous devez créer un compte pour pouvoir postuler.
          </p>
        </div>
        <Button asChild className="w-full gap-2">
          <Link href={`/login?tab=register&redirect=${pathname}`}>
            <UserPlus className="h-4 w-4" />
            Créer un compte
          </Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          Déjà un compte ?{" "}
          <Link href={`/login?redirect=${pathname}`} className="underline hover:text-foreground transition-colors">
            Se connecter
          </Link>
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-brand-200 bg-brand-50 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-600" />
        <div>
          <h3 className="text-lg font-semibold text-brand-800">Candidature envoyée !</h3>
          <p className="mt-1 text-sm text-brand-700">
            Votre candidature pour le poste <strong>{jobTitle}</strong> a bien été reçue.
            Nous reviendrons vers vous rapidement.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="text-xl font-semibold">Postuler à cette offre</h2>

      {/* Nom complet */}
      <div className="space-y-1.5">
        <Label htmlFor="full_name">Nom complet *</Label>
        <Input
          id="full_name"
          placeholder="Jean Dupont"
          {...register("full_name")}
        />
        {errors.full_name && (
          <p className="text-xs text-destructive">{errors.full_name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">Adresse email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="jean.dupont@email.fr"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Lettre de motivation */}
      <div className="space-y-1.5">
        <Label htmlFor="cover_letter">
          Lettre de motivation
          <span className="ml-1 text-xs text-muted-foreground">(optionnel)</span>
        </Label>
        <Textarea
          id="cover_letter"
          placeholder="Présentez-vous et expliquez votre motivation..."
          rows={5}
          {...register("cover_letter")}
        />
        {errors.cover_letter && (
          <p className="text-xs text-destructive">{errors.cover_letter.message}</p>
        )}
      </div>

      {/* CV upload */}
      <div className="space-y-1.5">
        <Label>CV *</Label>

        {selectedFile ? (
          <div className="flex items-center justify-between rounded-md border border-brand-300 bg-brand-50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-brand-700">
              <FileText className="h-4 w-4 shrink-0" />
              <span className="truncate max-w-[200px]">{selectedFile.name}</span>
              <span className="text-xs text-brand-500">
                ({(selectedFile.size / 1024 / 1024).toFixed(2)} Mo)
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                setValue("cv", undefined as unknown as File, { shouldValidate: false });
              }}
              className="ml-2 shrink-0 text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="cv"
            className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-input px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-brand-400 hover:bg-brand-50"
          >
            <Upload className="h-4 w-4 shrink-0" />
            Choisir un fichier (PDF, DOC, DOCX — max 5 Mo)
          </label>
        )}

        <input
          id="cv"
          type="file"
          className="sr-only"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setSelectedFile(file);
              setValue("cv", file, { shouldValidate: true });
            }
          }}
        />

        {errors.cv && (
          <p className="text-xs text-destructive">{errors.cv.message as string}</p>
        )}
      </div>

      {/* Erreur globale */}
      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" disabled={loading} className="w-full gap-2">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Envoyer ma candidature
      </Button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        En soumettant ce formulaire, vous acceptez notre{" "}
        <a href="/confidentialite" target="_blank" className="underline hover:text-foreground transition-colors">
          politique de confidentialité
        </a>
        . Vos données (CV, lettre de motivation) sont conservées 2 ans
        conformément aux recommandations de la CNIL.
      </p>
    </form>
  );
}
