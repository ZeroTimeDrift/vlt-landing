-- Waitlist table for vlt.money landing page
-- Run in Supabase SQL editor before deploying

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'unknown',
  signed_up_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick email lookup
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist(email);

-- Enable RLS (service role key bypasses this)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
