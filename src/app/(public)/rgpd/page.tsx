import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "RGPD — Vos droits",
  description:
    "Informations sur le traitement de vos données personnelles et l'exercice de vos droits RGPD chez Serres du Ponant.",
};

export default function RgpdPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      {/* Hero */}
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-brand-100 p-3 shrink-0">
          <ShieldCheck className="h-7 w-7 text-brand-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">RGPD — Protection de vos données</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Dernière mise à jour : février 2025 — Conforme au Règlement UE 2016/679
          </p>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-8 text-sm leading-relaxed text-foreground">

        {/* Engagement */}
        <section className="rounded-xl border border-brand-200 bg-brand-50 p-5 space-y-2">
          <h2 className="font-semibold text-brand-800">Notre engagement</h2>
          <p className="text-brand-700">
            Chez Serres du Ponant, nous traitons vos données personnelles avec sérieux et transparence.
            Nous collectons uniquement ce qui est nécessaire au traitement de votre candidature,
            et nous ne les partageons jamais à des fins commerciales.
          </p>
        </section>

        {/* Qui est responsable */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Qui est responsable de vos données ?</h2>
          <p>
            Le responsable du traitement est <strong>Serres du Ponant</strong> (SCEA — SIREN 800 529 307),
            représentée par son Gérant M. Jean-Jacques Morvan.
          </p>
          <ul className="ml-4 space-y-1 text-muted-foreground">
            <li><span className="font-medium text-foreground">Siège social :</span> Lieu-dit Kergasken, 29880 Plouguerneau</li>
            <li><span className="font-medium text-foreground">DPO (Délégué à la Protection des Données) :</span> À compléter</li>
            <li><span className="font-medium text-foreground">Contact DPO :</span>{" "}
              <a href="mailto:dpo@serres-du-ponant.fr" className="text-brand-600 hover:underline">
                dpo@serres-du-ponant.fr
              </a>
            </li>
          </ul>
        </section>

        {/* Quelles données */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Quelles données collectons-nous et pourquoi ?</h2>

          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Lors de la création de votre compte</h3>
              <p className="mt-1 text-muted-foreground">
                Nom, prénom, adresse email et mot de passe (chiffré). Ces données servent
                uniquement à vous authentifier et à associer vos candidatures à votre profil.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Base légale : exécution d'un contrat (CGU).
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Lors d'une candidature</h3>
              <p className="mt-1 text-muted-foreground">
                Nom, email, lettre de motivation et CV (fichier). Ces données sont transmises
                exclusivement aux recruteurs de Serres du Ponant concernés par le poste.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Base légale : mesures précontractuelles à la demande de la personne concernée.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Données techniques</h3>
              <p className="mt-1 text-muted-foreground">
                Adresse IP et logs de navigation, collectés automatiquement par notre hébergeur
                à des fins de sécurité et de débogage. Conservés 12 mois maximum.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Base légale : intérêt légitime (sécurité du service).
              </p>
            </div>
          </div>
        </section>

        {/* Durée de conservation */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Combien de temps conservons-nous vos données ?</h2>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-xs">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Type de données</th>
                  <th className="px-4 py-2 text-left font-medium">Durée de conservation</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-2">Données de compte</td>
                  <td className="px-4 py-2">Jusqu'à suppression du compte ou 3 ans d'inactivité</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">CV et candidatures</td>
                  <td className="px-4 py-2">2 ans à compter du dépôt (recommandation CNIL)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Logs techniques</td>
                  <td className="px-4 py-2">12 mois maximum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Vos droits */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Vos droits RGPD</h2>
          <p>
            Conformément au RGPD, vous pouvez exercer à tout moment les droits suivants :
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { titre: "Droit d'accès", desc: "Obtenir une copie de toutes les données que nous détenons sur vous." },
              { titre: "Droit de rectification", desc: "Corriger toute donnée inexacte ou incomplète vous concernant." },
              { titre: "Droit à l'effacement", desc: "Demander la suppression de vos données (\"droit à l'oubli\")." },
              { titre: "Droit à la portabilité", desc: "Recevoir vos données dans un format lisible par machine (JSON, CSV)." },
              { titre: "Droit d'opposition", desc: "Vous opposer à un traitement fondé sur l'intérêt légitime." },
              { titre: "Droit à la limitation", desc: "Suspendre temporairement le traitement de vos données." },
            ].map(({ titre, desc }) => (
              <div key={titre} className="rounded-lg border p-3">
                <h3 className="font-medium text-brand-700">{titre}</h3>
                <p className="mt-0.5 text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comment exercer */}
        <section className="rounded-xl border p-5 space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Mail className="h-5 w-5 text-brand-600" />
            Comment exercer vos droits ?
          </h2>
          <p>
            Envoyez votre demande par email en précisant votre nom, prénom et la nature du droit
            que vous souhaitez exercer. Nous répondrons dans un délai maximum d'<strong>un mois</strong>.
          </p>
          <a
            href="mailto:dpo@serres-du-ponant.fr"
            className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition-colors"
          >
            <Mail className="h-4 w-4" />
            Contacter notre DPO
          </a>
        </section>

        {/* Réclamation */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Droit de réclamation</h2>
          <p>
            Si vous estimez que le traitement de vos données ne respecte pas la réglementation,
            vous avez le droit d'introduire une réclamation auprès de l'autorité de contrôle
            compétente en France :
          </p>
          <div className="rounded-lg border p-4">
            <p className="font-medium">Commission Nationale de l'Informatique et des Libertés (CNIL)</p>
            <p className="mt-1 text-muted-foreground">3 Place de Fontenoy — TSA 80715 — 75334 Paris Cedex 07</p>
            <a
              href="https://www.cnil.fr/fr/plaintes"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-brand-600 hover:underline"
            >
              cnil.fr/fr/plaintes →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
