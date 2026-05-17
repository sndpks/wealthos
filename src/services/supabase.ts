import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://admakimrhpwqppbywdbg.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkbWFraW1yaHB3cXBwYnl3ZGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5MjIxNDQsImV4cCI6MjA5NDQ5ODE0NH0.DqKwjY5dihw-ohV-n_65d996GEuFLm7uEtXeloqxaS4'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)