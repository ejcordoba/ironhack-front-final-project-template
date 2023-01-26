import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vxjnhlojtcxucczcnkpd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4am5obG9qdGN4dWNjemNua3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE1NTk1NTUsImV4cCI6MTk4NzEzNTU1NX0.lUvP-nqtQUd0s-hP_9KzAsZkT8dYw1RUg4eUM4WHQ7o";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
