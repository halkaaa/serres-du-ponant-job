"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Leaf, Menu, X, LayoutDashboard, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) setProfile(data);
    }

    loadProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadProfile();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setProfile(null);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-brand-700">
          <Leaf className="h-6 w-6 text-brand-600" />
          <span className="hidden sm:block">Serres du Ponant</span>
          <span className="sm:hidden">SdP</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Offres d&apos;emploi
          </Link>

          {profile?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
            >
              <LayoutDashboard className="h-4 w-4" />
              Admin
            </Link>
          )}

          {profile ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  Mes candidatures
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Connexion
                </Button>
              </Link>
              <Link href="/login?tab=register">
                <Button size="sm">Créer un compte</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              Offres d&apos;emploi
            </Link>

            {profile?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="text-sm font-medium text-brand-600"
                onClick={() => setIsOpen(false)}
              >
                Dashboard Admin
              </Link>
            )}

            {profile ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Mes candidatures
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { handleSignOut(); setIsOpen(false); }}
                  className="w-full gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link href="/login?tab=register" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="w-full">Créer un compte</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
