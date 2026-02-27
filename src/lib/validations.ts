import { z } from "zod";

// ─── Job ────────────────────────────────────
export const jobSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre doit faire au moins 3 caractères")
    .max(120, "Le titre ne peut pas dépasser 120 caractères"),
  description: z
    .string()
    .min(50, "La description doit faire au moins 50 caractères"),
  department: z.string().min(1, "Veuillez sélectionner un département"),
  location: z.string().min(2, "Veuillez indiquer une localisation"),
  contract: z.enum(["CDI", "CDD", "Stage", "Alternance", "Freelance"], {
    required_error: "Veuillez sélectionner un type de contrat",
  }),
  salary_range: z.string().optional(),
  is_published: z.boolean().default(false),
});

export type JobFormValues = z.infer<typeof jobSchema>;

// ─── Application ─────────────────────────────
export const applicationSchema = z.object({
  full_name: z
    .string()
    .min(2, "Veuillez entrer votre nom complet")
    .max(100, "Le nom est trop long"),
  email: z
    .string()
    .email("Adresse email invalide"),
  cover_letter: z
    .string()
    .max(3000, "La lettre de motivation ne peut pas dépasser 3000 caractères")
    .optional(),
  cv: z
    .instanceof(File, { message: "Veuillez joindre votre CV" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Le fichier ne doit pas dépasser 5 Mo"
    )
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Formats acceptés : PDF, DOC, DOCX"
    ),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

// ─── Auth ────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
});

export const registerSchema = loginSchema
  .extend({
    full_name: z.string().min(2, "Veuillez entrer votre nom complet"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;

// ─── Status update ───────────────────────────
export const statusUpdateSchema = z.object({
  status: z.enum(["PENDING", "INTERVIEW", "REJECTED", "ACCEPTED"]),
  admin_notes: z.string().max(500).optional(),
});

export type StatusUpdateValues = z.infer<typeof statusUpdateSchema>;
