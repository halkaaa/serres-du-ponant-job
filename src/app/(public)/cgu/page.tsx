import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description:
    "Conditions générales d'utilisation du site de recrutement des Serres du Ponant.",
};

export default function CguPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Conditions Générales d&apos;Utilisation</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Dernière mise à jour : février 2025
      </p>

      <Separator className="my-6" />

      <div className="space-y-8 text-sm leading-relaxed text-foreground">

        {/* Objet */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">1. Objet</h2>
          <p>
            Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès
            et l&apos;utilisation du site de recrutement de <strong>Serres du Ponant</strong> (SCEA)
            , accessible à l&apos;adresse{" "}
            <span className="font-medium">recrutement.serres-du-ponant.fr</span> (ci-après
            « le Site »). En accédant au Site, vous acceptez sans réserve les présentes CGU.
          </p>
        </section>

        {/* Accès */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">2. Accès au Site</h2>
          <p>
            Le Site est accessible gratuitement à tout utilisateur disposant d&apos;un accès
            à Internet. Tous les coûts liés à l&apos;accès au Site (matériel, logiciels,
            connexion Internet) sont à la charge exclusive de l&apos;utilisateur.
          </p>
          <p>
            Serres du Ponant se réserve le droit de modifier, suspendre ou interrompre
            l&apos;accès au Site à tout moment et sans préavis, notamment pour des raisons de
            maintenance ou de mise à jour.
          </p>
        </section>

        {/* Création de compte */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">3. Création de compte candidat</h2>
          <p>
            Pour déposer une candidature et suivre son avancement, l&apos;utilisateur peut
            créer un compte en fournissant une adresse email valide et un mot de passe.
            L&apos;utilisateur s&apos;engage à :
          </p>
          <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
            <li>Fournir des informations exactes, complètes et à jour</li>
            <li>Maintenir la confidentialité de ses identifiants de connexion</li>
            <li>Ne pas créer plusieurs comptes pour un même individu</li>
            <li>
              Informer immédiatement Serres du Ponant de toute utilisation non
              autorisée de son compte
            </li>
          </ul>
          <p>
            Serres du Ponant se réserve le droit de suspendre ou supprimer tout compte
            dont les informations seraient inexactes ou dont l&apos;utilisation serait
            contraire aux présentes CGU.
          </p>
        </section>

        {/* Candidatures */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">4. Dépôt de candidature</h2>
          <p>
            Le dépôt d&apos;une candidature implique que l&apos;utilisateur :
          </p>
          <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
            <li>
              Certifie l&apos;exactitude de toutes les informations communiquées (CV,
              lettre de motivation, expériences, diplômes)
            </li>
            <li>
              Autorise Serres du Ponant à conserver et traiter ses données à des
              fins de recrutement pendant une durée maximale de 2 ans
            </li>
            <li>
              Accepte que sa candidature soit transmise aux personnes habilitées au
              recrutement au sein de Serres du Ponant
            </li>
          </ul>
          <p>
            Toute candidature contenant des informations mensongères pourra entraîner
            l&apos;annulation du processus de recrutement, y compris après embauche.
          </p>
        </section>

        {/* Comportement */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">5. Comportement de l&apos;utilisateur</h2>
          <p>L&apos;utilisateur s&apos;engage à ne pas :</p>
          <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
            <li>Utiliser le Site à des fins illicites ou contraires aux bonnes mœurs</li>
            <li>Tenter d&apos;accéder sans autorisation à des parties restreintes du Site</li>
            <li>
              Transmettre des contenus comportant des virus ou tout autre code malveillant
            </li>
            <li>
              Usurper l&apos;identité d&apos;une autre personne lors du dépôt d&apos;une
              candidature
            </li>
            <li>Soumettre des candidatures multiples pour le même poste</li>
          </ul>
        </section>

        {/* Propriété intellectuelle */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">6. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des éléments composant le Site (design, textes, logos,
            structure) sont la propriété exclusive de Serres du Ponant et sont
            protégés par le droit de la propriété intellectuelle. Toute reproduction
            sans autorisation écrite préalable est interdite.
          </p>
        </section>

        {/* Limitation de responsabilité */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">7. Limitation de responsabilité</h2>
          <p>
            Serres du Ponant ne saurait être tenue responsable de :
          </p>
          <ul className="ml-4 list-disc space-y-1 text-muted-foreground">
            <li>
              Toute interruption ou indisponibilité du Site pour quelque cause que
              ce soit
            </li>
            <li>
              Toute perte de données résultant d&apos;une défaillance technique
            </li>
            <li>
              L&apos;utilisation frauduleuse par des tiers des données transmises via
              le Site, dès lors que Serres du Ponant a mis en œuvre les mesures
              de sécurité appropriées
            </li>
          </ul>
        </section>

        {/* Données personnelles */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">8. Données personnelles</h2>
          <p>
            Le traitement des données personnelles est régi par notre{" "}
            <a href="/confidentialite" className="text-brand-600 hover:underline">
              politique de confidentialité
            </a>{" "}
            et notre{" "}
            <a href="/rgpd" className="text-brand-600 hover:underline">
              charte RGPD
            </a>
            , accessibles depuis le bas de chaque page.
          </p>
        </section>

        {/* Modification des CGU */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">9. Modification des CGU</h2>
          <p>
            Serres du Ponant se réserve le droit de modifier les présentes CGU
            à tout moment. Les utilisateurs seront informés de toute modification
            substantielle par email. La poursuite de l&apos;utilisation du Site après
            notification vaut acceptation des nouvelles CGU.
          </p>
        </section>

        {/* Droit applicable */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">10. Droit applicable et litiges</h2>
          <p>
            Les présentes CGU sont soumises au droit français. En cas de litige, une
            solution amiable sera recherchée en priorité. À défaut, les tribunaux
            compétents du ressort de Brest seront saisis.
          </p>
          <p>
            Pour toute question relative aux présentes CGU :{" "}
            <a
              href="mailto:contact@serres-du-ponant.fr"
              className="text-brand-600 hover:underline"
            >
              contact@serres-du-ponant.fr
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
