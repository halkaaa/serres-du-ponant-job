import { redirect } from "next/navigation";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

const navItems = [
  { href: "/admin",              label: "Vue d'ensemble"  },
  { href: "/admin/jobs",         label: "Offres d'emploi" },
  { href: "/admin/applications", label: "Candidatures"    },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "ADMIN") redirect("/");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar client (navigation + état actif) */}
      <AdminSidebar />

      {/* Contenu */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:hidden">
          <Leaf className="h-5 w-5 text-brand-600" />
          <span className="font-bold text-brand-700">Admin</span>
          <nav className="ml-4 flex gap-4 overflow-x-auto text-sm">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="shrink-0 text-muted-foreground hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}
