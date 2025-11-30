import { createClient } from '@supabase/supabase-js';

// Load Supabase credentials from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are available
const hasCredentials = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

if (!hasCredentials) {
  console.warn(
    '⚠️ Supabase credentials not found. The app will work with local data only. ' +
    'To enable data persistence, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Replit Secrets.'
  );
}

// Create a mock client if credentials are missing
export const supabase = hasCredentials 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : {
      from: () => ({
        select: () => ({ eq: () => ({ limit: () => Promise.resolve({ data: null, error: null }) }) }),
        upsert: () => Promise.resolve({ error: null })
      })
    } as any;

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
