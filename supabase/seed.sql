-- ============================================
-- Données de test — Serres du Ponant
-- ============================================
-- NOTE: Insérer manuellement un utilisateur admin via Supabase Auth
-- puis mettre à jour son rôle :
-- UPDATE profiles SET role = 'ADMIN' WHERE email = 'admin@serres-du-ponant.fr';

INSERT INTO jobs (slug, title, description, department, location, contract, salary_range, is_published, created_at)
VALUES
(
  'responsable-production-serres',
  'Responsable Production Serres',
  '## À propos du poste

Nous recherchons un(e) **Responsable Production Serres** pour superviser l''ensemble de nos opérations de culture sous serre.

## Missions principales

- Planifier et coordonner les cycles de production (tomates, poivrons, concombres)
- Manager une équipe de 8 à 12 personnes
- Garantir la qualité sanitaire et phytosanitaire des cultures
- Optimiser les coûts de production
- Assurer le reporting hebdomadaire à la direction

## Profil recherché

- Bac+2 minimum en horticulture ou agronomie
- 3 ans d''expérience en production maraîchère sous serre
- Maîtrise des techniques hydroponiques appréciée
- Sens du management et rigueur organisationnelle

## Conditions

- Poste basé à Plouguerneau (29)
- Déplacements ponctuels sur sites partenaires
- Mutuelle d''entreprise, prime de production',
  'Production',
  'Plouguerneau (29)',
  'CDI',
  '32 000 – 38 000 €',
  true,
  NOW() - INTERVAL '5 days'
),
(
  'technicien-serre-junior',
  'Technicien(ne) de Serre Junior',
  '## Description du poste

Dans le cadre de notre développement, nous recrutons un(e) **Technicien(ne) de Serre Junior** pour renforcer notre équipe de production.

## Vos missions

- Assurer l''entretien quotidien des cultures
- Réaliser les traitements préventifs et curatifs
- Participer aux récoltes et au conditionnement
- Contrôler les paramètres climatiques (température, hygrométrie)

## Votre profil

- CAP/BEP ou Bac Pro Horticulture
- Débutant(e) accepté(e), une première expérience est un plus
- Goût du travail en équipe et en extérieur

## Ce que nous offrons

- Formation interne assurée
- Contrat évolutif',
  'Production',
  'Plouguerneau (29)',
  'CDD',
  '22 000 – 25 000 €',
  true,
  NOW() - INTERVAL '3 days'
),
(
  'commercial-grands-comptes-bretagne',
  'Commercial(e) Grands Comptes Bretagne',
  '## Votre rôle

Vous développerez et fidéliserez notre portefeuille de clients **GMS et restauration collective** sur la région Bretagne.

## Responsabilités

- Prospection et développement commercial (grande distribution, collectivités)
- Négociation des contrats et suivi des commandes
- Participation aux salons professionnels
- Reporting commercial hebdomadaire

## Compétences requises

- Bac+3 en commerce / négociation
- 2 ans minimum dans la vente B2B agroalimentaire
- Permis B obligatoire, véhicule de société fourni
- Autonomie, persévérance, excellent relationnel',
  'Commercial',
  'Bretagne (mobilité régionale)',
  'CDI',
  '30 000 – 45 000 € + variable',
  true,
  NOW() - INTERVAL '1 day'
),
(
  'stagiaire-marketing-digital',
  'Stagiaire Marketing Digital',
  '## Contexte

Les Serres du Ponant développent leur présence digitale et recherchent un(e) **Stagiaire Marketing Digital** pour accompagner cette transformation.

## Missions

- Création de contenus pour les réseaux sociaux (Instagram, LinkedIn)
- Rédaction d''articles de blog et newsletters
- Analyse des performances (Google Analytics, Meta Business)
- Support à l''organisation d''événements portes ouvertes

## Profil

- En cours de formation Bac+3/5 en marketing digital ou communication
- Maîtrise des outils créatifs (Canva, Adobe Express)
- Sens créatif et curiosité

## Conditions

- Stage de 4 à 6 mois
- Convention de stage obligatoire
- Gratification légale + tickets restaurant',
  'Marketing',
  'Plouguerneau (29) — Télétravail partiel possible',
  'Stage',
  'Gratification légale',
  true,
  NOW()
);
