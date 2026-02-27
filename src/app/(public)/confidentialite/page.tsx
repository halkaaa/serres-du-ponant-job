import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site de recrutement des Serres du Ponant.",
};

export default function ConfidentialitePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Dernière mise à jour : février 2025
      </p>

      <Separator className="my-6" />

      <div className="space-y-8 text-sm leading-relaxed text-foreground">

        {/* Introduction */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">1. Introduction</h2>
          <p>
            Serres du Ponant (ci-après « nous ») accorde une importance primordiale à la
            protection de vos données personnelles. La présente politique de confidentialité
            décrit comment nous collectons, utilisons, stockons et protégeons vos informations
            dans le cadre de notre site de recrutement, conformément au Règlement Général sur
            la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés.
          </p>
        </section>

        {/* Responsable du traitement */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">2. Responsable du traitement</h2>
          <ul className="ml-4 space-y-1 text-muted-foreground">
            <li><span className="font-medium text-foreground">Société :</span> Serres du Ponant (SCEA)</li>
            <li><span className="font-medium text-foreground">SIREN :</span> 800 529 307</li>
            <li><span className="font-medium text-foreground">Adresse :</span> Lieu-dit Kergasken, 29880 Plouguerneau</li>
            <li><span className="font-medium text-foreground">Email :</span> dpo@serres-du-ponant.fr</li>
          </ul>
        </section>

        {/* Données collectées */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">3. Données personnelles collectées</h2>
          <p>Nous collectons les données suivantes selon le contexte :</p>

          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Données</th>
                  <th className="px-4 py-2 text-left font-medium">Finalité</th>
                  <th className="px-4 py-2 text-left font-medium">Base légale</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2">Nom, prénom, email</td>
                  <td className="px-4 py-2">Création de compte, candidature</td>
                  <td className="px-4 py-2">Exécution d'un contrat</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">CV (fichier PDF/DOC)</td>
                  <td className="px-4 py-2">Traitement de la candidature</td>
                  <td className="px-4 py-2">Exécution d'un contrat</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Lettre de motivation</td>
                  <td className="px-4 py-2">Évaluation du candidat</td>
                  <td className="px-4 py-2">Exécution d'un contrat</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Adresse IP, logs de connexion</td>
                  <td className="px-4 py-2">Sécurité, débogage</td>
                  <td className="px-4 py-2">Intérêt légitime</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Durée de conservation */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">4. Durée de conservation</h2>
          <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Données de compte :</span> conservées
              jusqu'à la suppression du compte par l'utilisateur ou 3 ans après la dernière activité.
            </li>
            <li>
              <span className="font-medium text-foreground">Candidatures (CV, lettre) :</span> conservées
              2 ans à compter de la dernière candidature, conformément aux recommandations de la CNIL.
            </li>
            <li>
              <span className="font-medium text-foreground">Logs techniques :</span> 12 mois maximum.
            </li>
          </ul>
        </section>

        {/* Destinataires */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">5. Destinataires des données</h2>
          <p>Vos données sont accessibles uniquement aux personnes habilitées :</p>
          <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
            <li>L'équipe RH et de direction de Serres du Ponant (pour les candidatures)</li>
            <li>Nos sous-traitants techniques (Supabase pour la base de données et le stockage de fichiers, Vercel pour l'hébergement) — liés par des accords de traitement conformes au RGPD</li>
          </ul>
          <p>
            Nous ne vendons, ne louons et ne cédons jamais vos données personnelles à des tiers
            à des fins commerciales.
          </p>
        </section>

        {/* Transferts hors UE */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">6. Transferts hors Union Européenne</h2>
          <p>
            Nos prestataires Supabase (hébergé sur AWS, région Europe — Frankfurt) et Vercel
            sont susceptibles de transférer certaines données hors de l'UE. Ces transferts sont
            encadrés par des Clauses Contractuelles Types (CCT) approuvées par la Commission
            européenne, garantissant un niveau de protection adéquat.
          </p>
        </section>

        {/* Vos droits */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">7. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
          </p>
          <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
            <li><span className="font-medium text-foreground">Droit d'accès</span> — obtenir une copie de vos données</li>
            <li><span className="font-medium text-foreground">Droit de rectification</span> — corriger des données inexactes</li>
            <li><span className="font-medium text-foreground">Droit à l'effacement</span> — demander la suppression de vos données</li>
            <li><span className="font-medium text-foreground">Droit à la portabilité</span> — recevoir vos données dans un format structuré</li>
            <li><span className="font-medium text-foreground">Droit d'opposition</span> — s'opposer à certains traitements</li>
            <li><span className="font-medium text-foreground">Droit à la limitation</span> — restreindre le traitement dans certains cas</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à{" "}
            <a href="mailto:dpo@serres-du-ponant.fr" className="text-brand-600 hover:underline">
              dpo@serres-du-ponant.fr
            </a>
            . Vous disposez également du droit d'introduire une réclamation auprès de la{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline"
            >
              CNIL
            </a>
            .
          </p>
        </section>

        {/* Cookies */}
        <section id="cookies" className="space-y-3 scroll-mt-24">
          <h2 className="text-lg font-semibold">8. Cookies</h2>
          <p>
            Ce site utilise uniquement des cookies strictement nécessaires à son fonctionnement :
          </p>
          <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Cookie de session Supabase</span> —
              maintient votre connexion. Durée : session navigateur + token de rafraîchissement (1 heure / 60 jours).
            </li>
          </ul>
          <p>
            Aucun cookie publicitaire ou de tracking tiers n'est utilisé sur ce site.
          </p>
        </section>

        {/* Modifications */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">9. Modifications de la politique</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique à tout moment. Toute modification
            substantielle sera notifiée par email aux utilisateurs enregistrés. La date de la dernière
            mise à jour est indiquée en haut de cette page.
          </p>
        </section>

      </div>
    </div>
  );
}
