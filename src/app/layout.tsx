import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Recrutement — Serres du Ponant",
    template: "%s | Serres du Ponant",
  },
  description:
    "Rejoignez l'équipe des Serres du Ponant, producteur maraîcher breton. Découvrez nos offres d'emploi en CDI, CDD, stage et alternance.",
  keywords: ["emploi", "recrutement", "horticulture", "Bretagne", "maraîcher", "serres"],
  openGraph: {
    siteName: "Serres du Ponant — Recrutement",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
