import { createClient } from '@supabase/supabase-js';

// Load Supabase credentials from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that required environment variables are set
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Replit Secrets.'
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/*
  Expected table schema (run this in Supabase SQL editor if the table doesn't exist):

  create table public.site (
    id int primary key,
    data jsonb,
    updated_at timestamptz default now()
  );

  Then insert an initial row (optional):
  insert into public.site (id, data) values (1, '{}');

  The code below will upsert id=1 with the whole site JSON in `data` column.
*/
