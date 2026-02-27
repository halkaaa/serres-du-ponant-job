import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site de recrutement des Serres du Ponant.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Mentions légales</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Dernière mise à jour : février 2025
      </p>

      <Separator className="my-6" />

      <div className="space-y-8 text-sm leading-relaxed text-foreground">

        {/* Éditeur */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">1. Éditeur du site</h2>
          <p>
            Le présent site de recrutement est édité par la société :
          </p>
          <ul className="ml-4 space-y-1 text-muted-foreground">
            <li><span className="font-medium text-foreground">Raison sociale :</span> Serres du Ponant</li>
            <li><span className="font-medium text-foreground">Forme juridique :</span> Société Civile d'Exploitation Agricole (SCEA)</li>
            <li><span className="font-medium text-foreground">Capital social :</span> 648 780 €</li>
            <li><span className="font-medium text-foreground">Siège social :</span> Lieu-dit Kergasken, 29880 Plouguerneau, France</li>
            <li><span className="font-medium text-foreground">SIREN :</span> 800 529 307</li>
            <li><span className="font-medium text-foreground">SIRET :</span> 800 529 307 00012</li>
            <li><span className="font-medium text-foreground">N° TVA intracommunautaire :</span> FR à compléter</li>
            <li><span className="font-medium text-foreground">Téléphone :</span> À compléter</li>
            <li><span className="font-medium text-foreground">Email :</span> contact@serres-du-ponant.fr</li>
          </ul>
          <p>
            <span className="font-medium">Directeur de la publication :</span> M. Jean-Jacques Morvan, Gérant.
          </p>
        </section>

        {/* Hébergement */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">2. Hébergement</h2>
          <p>Le site est hébergé par :</p>
          <ul className="ml-4 space-y-1 text-muted-foreground">
            <li><span className="font-medium text-foreground">Société :</span> Vercel Inc.</li>
            <li><span className="font-medium text-foreground">Adresse :</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</li>
            <li><span className="font-medium text-foreground">Site web :</span> vercel.com</li>
          </ul>
          <p>
            La base de données est hébergée par Supabase Inc. (infrastructure AWS, région Europe — Frankfurt).
          </p>
        </section>

        {/* Propriété intellectuelle */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">3. Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site (textes, images, logos, structure) sont la
            propriété exclusive de Serres du Ponant ou de ses partenaires, et sont protégés par
            les lois françaises et internationales relatives à la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication ou adaptation de tout ou
            partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite
            sans l'autorisation écrite préalable de Serres du Ponant.
          </p>
        </section>

        {/* Responsabilité */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">4. Limitation de responsabilité</h2>
          <p>
            Serres du Ponant s'efforce d'assurer l'exactitude et la mise à jour des informations
            diffusées sur ce site. Toutefois, elle ne peut garantir l'exactitude, la précision ou
            l'exhaustivité des informations mises à disposition.
          </p>
          <p>
            Serres du Ponant se réserve le droit de corriger, à tout moment et sans préavis,
            le contenu de ce site. La responsabilité de Serres du Ponant ne peut être engagée
            en raison d'informations, opinions et recommandations formulées par des tiers.
          </p>
        </section>

        {/* Droit applicable */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">5. Droit applicable et juridiction</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de litige,
            et après l'échec de toute tentative de résolution amiable, les tribunaux français seront
            seuls compétents.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">6. Contact</h2>
          <p>
            Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à :
            <br />
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
