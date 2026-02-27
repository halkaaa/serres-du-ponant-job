"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import JobForm from "@/components/jobs/JobForm";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import type { JobFormValues } from "@/lib/validations";

export default function NewJobPage() {
  const router = useRouter();

  async function handleCreate(values: JobFormValues) {
    const slug = slugify(values.title) + "-" + Date.now().toString(36);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, slug }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error ?? "Erreur lors de la création.");
    }

    router.push("/admin/jobs");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/jobs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Créer une offre</h1>
          <p className="text-sm text-muted-foreground">
            Remplissez le formulaire pour publier une nouvelle offre d&apos;emploi.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <JobForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}
