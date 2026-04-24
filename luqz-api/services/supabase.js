import { createClient } from '@supabase/supabase-js'

// Admin client — bypassa RLS, para queries internas
export const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// Auth client — anon key, obrigatório para signInWithPassword
export const authClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)
