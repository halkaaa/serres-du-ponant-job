"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteAccountButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"idle" | "confirm">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/account", { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Une erreur est survenue.");
      setLoading(false);
      setStep("idle");
      return;
    }

    router.push("/?compte=supprime");
    router.refresh();
  }

  if (step === "confirm") {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
          <div>
            <p className="font-medium text-destructive">Confirmer la suppression</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Cette action est <strong>irréversible</strong>. Votre compte et toutes vos
              données personnelles seront définitivement supprimés. Vos candidatures
              seront anonymisées (les recruteurs ne pourront plus les associer à votre compte).
            </p>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <div className="flex gap-3">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className="gap-2"
          >
            {loading
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <Trash2 className="h-4 w-4" />
            }
            Oui, supprimer définitivement
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStep("idle")}
            disabled={loading}
          >
            Annuler
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setStep("confirm")}
      className="gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
    >
      <Trash2 className="h-4 w-4" />
      Supprimer mon compte
    </Button>
  );
}
