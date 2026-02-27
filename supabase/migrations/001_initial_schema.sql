-- ============================================
-- Serres du Ponant — Schéma initial
-- ============================================

-- ============================================
-- TABLE: profiles
-- Extension de auth.users (Supabase Auth)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT,
  email       TEXT NOT NULL,
  avatar_url  TEXT,
  role        TEXT NOT NULL DEFAULT 'USER'
                CHECK (role IN ('USER', 'ADMIN')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- TABLE: jobs
-- ============================================
CREATE TABLE IF NOT EXISTS jobs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL,
  department   TEXT NOT NULL,
  location     TEXT NOT NULL,
  contract     TEXT NOT NULL
                 CHECK (contract IN ('CDI','CDD','Stage','Alternance','Freelance')),
  salary_range TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  view_count   INT NOT NULL DEFAULT 0,
  created_by   UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- TABLE: applications
-- ============================================
CREATE TABLE IF NOT EXISTS applications (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id         UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  candidate_id   UUID REFERENCES profiles(id) ON DELETE SET NULL,
  full_name      TEXT NOT NULL,
  email          TEXT NOT NULL,
  cover_letter   TEXT,
  cv_url         TEXT NOT NULL,
  status         TEXT NOT NULL DEFAULT 'PENDING'
                   CHECK (status IN ('PENDING','INTERVIEW','REJECTED','ACCEPTED')),
  admin_notes    TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE (job_id, email)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_jobs_contract    ON jobs(contract);
CREATE INDEX IF NOT EXISTS idx_jobs_department  ON jobs(department);
CREATE INDEX IF NOT EXISTS idx_jobs_location    ON jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_published   ON jobs(is_published);
CREATE INDEX IF NOT EXISTS idx_apps_job_id      ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_apps_candidate   ON applications(candidate_id);
CREATE INDEX IF NOT EXISTS idx_apps_status      ON applications(status);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "profiles_select_all" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Jobs
CREATE POLICY "jobs_select_public" ON jobs
  FOR SELECT USING (
    is_published = true
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'ADMIN'
  );

CREATE POLICY "jobs_insert_admin" ON jobs
  FOR INSERT WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'ADMIN'
  );

CREATE POLICY "jobs_update_admin" ON jobs
  FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'ADMIN'
  );

CREATE POLICY "jobs_delete_admin" ON jobs
  FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'ADMIN'
  );

-- Applications
CREATE POLICY "apps_select_own_or_admin" ON applications
  FOR SELECT USING (
    candidate_id = auth.uid()
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'ADMIN'
  );

CREATE POLICY "apps_insert_any" ON applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "apps_update_admin" ON applications
  FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'ADMIN'
  );

-- ============================================
-- FONCTION: auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER apps_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- FONCTION: créer un profil à l'inscription
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'USER'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- STORAGE: bucket "resumes"
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT DO NOTHING;

CREATE POLICY "resumes_upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "resumes_select_admin" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'resumes'
    AND (
      auth.uid()::text = (storage.foldername(name))[1]
      OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'ADMIN'
    )
  );
