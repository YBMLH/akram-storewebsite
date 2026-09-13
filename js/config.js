// ============================================================
// Akram Store — Configuration
// Replace these values with your Supabase project credentials
// ============================================================

const STORE_CONFIG = {
  // Supabase credentials — get these from your Supabase project settings
  supabase: {
    url: '',       // e.g. 'https://xxxxx.supabase.co'
    anonKey: '',   // Your anon/public key
  },

  // WhatsApp number for orders (international format, no + sign)
  whatsappNumber: '213550000000',

  // Store information
  store: {
    name: { ar: 'متجر أكرم', fr: 'Akram Store' },
    phone: '0550000000',
    address: { ar: 'الجزائر', fr: 'Algérie' },
    currency: 'DA',
    instagram: '',
    facebook: '',
  },

  // Default language: 'ar' or 'fr'
  defaultLanguage: 'fr',

  // Demo mode: when true (or when Supabase isn't configured),
  // the site uses embedded sample data
  demoMode: true,
};

// Auto-detect demo mode if Supabase isn't configured
if (!STORE_CONFIG.supabase.url || !STORE_CONFIG.supabase.anonKey) {
  STORE_CONFIG.demoMode = true;
}
