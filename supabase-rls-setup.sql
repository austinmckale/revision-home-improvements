-- =============================================================================
-- Supabase RLS Setup for Public Portfolio Read Access
-- =============================================================================
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- for the Manager App project's Supabase instance.
--
-- These policies allow the rhipros-site to read portfolio-flagged photos
-- and their associated job metadata using the Supabase anon key.
-- =============================================================================

-- 1. Enable RLS on both tables (idempotent -- safe to re-run)
ALTER TABLE "FileAsset" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Job" ENABLE ROW LEVEL SECURITY;

-- 2. Public read policy for portfolio photos only
CREATE POLICY "public_portfolio_read"
  ON "FileAsset"
  FOR SELECT
  USING ("isPortfolio" = true);

-- 3. Limited read policy on Job for portfolio context (job name + tags only)
--    The SELECT clause in the rhipros-site query only requests jobName and
--    categoryTags, but RLS operates at the row level. This policy restricts
--    access to jobs that have at least one portfolio-flagged photo.
CREATE POLICY "public_portfolio_job_read"
  ON "Job"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "FileAsset"
      WHERE "FileAsset"."jobId" = "Job"."id"
        AND "FileAsset"."isPortfolio" = true
    )
  );

-- 4. Verify the storage bucket allows public reads.
--    In the Supabase Dashboard: Storage > job-assets > Policies
--    Ensure there is a SELECT policy for public access, or set the bucket to public.
--    If the bucket is already public, no additional policy is needed.
--
--    If the bucket is private, create a storage policy:
--      Bucket: job-assets
--      Policy name: public_portfolio_storage_read
--      Allowed operation: SELECT
--      Policy definition: true  (or restrict to portfolio paths if you use a folder convention)
