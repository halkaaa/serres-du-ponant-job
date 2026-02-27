"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Leaf, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  loginSchema,
  registerSchema,
  type LoginFormValues,
  type RegisterFormValues,
} from "@/lib/validations";
import { createClient } from "@/lib/supabase/client";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<"login" | "register">(
    searchParams.get("tab") === "register" ? "register" : "login"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const redirect = searchParams.get("redirect") ?? "/";

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  async function handleLogin(values: LoginFormValues) {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      setError("Email ou mot de passe incorrect.");
    } else {
      router.push(redirect);
      router.refresh();
    }
    setLoading(false);
  }

  async function handleRegister(values: RegisterFormValues) {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email:    values.email,
      password: values.password,
      options:  { data: { full_name: values.full_name } },
    });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "Un email de confirmation vous a été envoyé. Vérifiez votre boîte mail."
      );
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
            <Leaf className="h-6 w-6 text-brand-600" />
          </div>
          <h1 className="text-2xl font-bold">Serres du Ponant</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {tab === "login" ? "Connectez-vous à votre compte" : "Créez votre compte candidat"}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex rounded-lg border bg-muted p-1">
          <button
            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${
              tab === "login"
                ? "bg-white shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => { setTab("login"); setError(null); setSuccess(null); }}
          >
            Connexion
          </button>
          <button
            className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${
              tab === "register"
                ? "bg-white shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => { setTab("register"); setError(null); setSuccess(null); }}
          >
            Inscription
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-md bg-brand-50 px-3 py-2 text-sm text-brand-700">
            {success}
          </div>
        )}

        {/* Formulaire Connexion */}
        {tab === "login" && (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="vous@email.fr"
                {...loginForm.register("email")}
              />
              {loginForm.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...loginForm.register("password")}
              />
              {loginForm.formState.errors.password && (
                <p className="text-xs text-destructive">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={loading} className="w-full gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Se connecter
            </Button>
          </form>
        )}

        {/* Formulaire Inscription */}
        {tab === "register" && (
          <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="full_name">Nom complet</Label>
              <Input
                id="full_name"
                placeholder="Jean Dupont"
                {...registerForm.register("full_name")}
              />
              {registerForm.formState.errors.full_name && (
                <p className="text-xs text-destructive">
                  {registerForm.formState.errors.full_name.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-email">Email</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="vous@email.fr"
                {...registerForm.register("email")}
              />
              {registerForm.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-password">Mot de passe</Label>
              <Input
                id="reg-password"
                type="password"
                placeholder="••••••••"
                {...registerForm.register("password")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...registerForm.register("confirmPassword")}
              />
              {registerForm.formState.errors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {registerForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={loading} className="w-full gap-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Créer mon compte
            </Button>

            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              En créant un compte, vous acceptez nos{" "}
              <a href="/cgu" target="_blank" className="underline hover:text-foreground transition-colors">
                CGU
              </a>
              , notre{" "}
              <a href="/confidentialite" target="_blank" className="underline hover:text-foreground transition-colors">
                politique de confidentialité
              </a>
              {" "}et notre{" "}
              <a href="/rgpd" target="_blank" className="underline hover:text-foreground transition-colors">
                charte RGPD
              </a>
              . Vos données sont conservées 3 ans après la dernière activité.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageContent />
    </Suspense>
  );
}
