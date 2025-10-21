import { createClient } from '@supabase/supabase-js';

// NOTE: For production you should move these to environment variables.
const SUPABASE_URL = 'https://kbjdmogbswqsjzxldbka.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiamRtb2dic3dxc2p6eGxkYmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MDQ1MjYsImV4cCI6MjA3NjM4MDUyNn0.ETu4jBhVdDoLGd3rmNfvcyDGnkDoG3hf6nwkrYXMOso';

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
