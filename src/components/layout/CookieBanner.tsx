"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "sdp_cookie_notice_dismissed";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white shadow-lg">
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ce site utilise uniquement des{" "}
              <span className="font-medium text-foreground">
                cookies strictement nécessaires
              </span>{" "}
              à son fonctionnement (gestion de session). Aucun cookie publicitaire
              ou de tracking n&apos;est utilisé.{" "}
              <Link
                href="/confidentialite#cookies"
                className="text-brand-600 underline hover:text-brand-700"
              >
                En savoir plus
              </Link>
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button size="sm" onClick={dismiss} className="gap-1.5">
              J&apos;ai compris
            </Button>
            <button
              onClick={dismiss}
              aria-label="Fermer"
              className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
