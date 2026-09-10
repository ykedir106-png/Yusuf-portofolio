// ==========================================
// YUSUF KEDIR PORTFOLIO
// SUPABASE CONFIGURATION
// ==========================================

const SUPABASE_URL =
  "https://uhusjizdjnloxjfbtgds.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_9f_AW2HeN-l-eHtb8RZvKA_S1FPY3xB";

// Create Supabase client
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

// Make it available to other JavaScript files
window.supabaseClient = supabaseClient;

console.log("✅ Supabase connected:", SUPABASE_URL);
