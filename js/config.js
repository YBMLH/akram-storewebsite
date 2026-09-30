// ============================================================
// Collection By Ibtissam — Configuration
// Replace these values with your Supabase project credentials
// ============================================================

const STORE_CONFIG = {
  // Supabase credentials — get these from your Supabase project settings
  supabase: {
    url: 'https://umrygtfilgkdeabucdbg.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtcnlndGZpbGdrZGVhYnVjZGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3OTM5OTYsImV4cCI6MjEwNjM2OTk5Nn0.3kRAT1_jPrfYGuTr70WgRb3QkMlloK-SAjNBsj35bsQ',
  },

  // WhatsApp number for orders (international format, no + sign)
  whatsappNumber: '213550000000',

  // Store information
  store: {
    name: { ar: 'مجموعة إبتسام', fr: 'Collection By Ibtissam' },
    shortName: { ar: 'CBI', fr: 'CBI' },
    phone: '0550000000',
    address: { ar: 'الجزائر', fr: 'Algérie' },
    currency: 'DA',
    instagram: '',
    facebook: '',
  },

  // Default language: 'ar' or 'fr'
  defaultLanguage: 'fr',

  // Demo mode: true = use embedded sample data. false = use Supabase (production).
  demoMode: false,
};

// Auto-fallback to demo mode if Supabase creds aren't set
if (!STORE_CONFIG.supabase.url || !STORE_CONFIG.supabase.anonKey) {
  STORE_CONFIG.demoMode = true;
}
