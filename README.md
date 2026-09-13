# Akram Store — Boutique Mode Féminine Algérienne

An elegant e-commerce website for an Algerian women's fashion boutique, featuring WhatsApp-based checkout and a full admin dashboard.

## ✨ Features

### Customer Website
- **Homepage** — Hero slider, featured products, new arrivals, best sellers, category browsing
- **Product Pages** — Multiple images with zoom, size/color selection, stock status, related products
- **Shopping Cart** — Full cart management with quantity controls
- **WhatsApp Checkout** — Formatted order messages sent directly via WhatsApp
- **Bilingual** — Full Arabic (RTL) and French support with one-click toggle
- **Responsive** — Mobile-first design that works on all devices
- **Algerian Wilayas** — All 58 wilayas in the checkout dropdown

### Admin Dashboard
- **Dashboard Overview** — Today's orders, monthly sales, product count, low stock alerts
- **Product Management** — Full CRUD with bilingual fields, variants (size × color), pricing, stock
- **Order Management** — View orders, update statuses, filter by status, WhatsApp contact
- **Customer Management** — Auto-built from orders, total spent tracking
- **Homepage Builder** — View and manage hero slider content
- **Media Library** — Upload and organize images (requires Supabase Storage)

### Technical Highlights
- **Zero-cost stack** — Vercel (frontend) + Supabase free tier (backend)
- **Demo Mode** — Works immediately with embedded sample data before Supabase is configured
- **No build step** — Pure HTML, CSS, and vanilla JavaScript
- **Product Variants** — Size × color combinations with independent stock tracking
- **Algerian phone validation** — Validates 05/06/07 format
- **Cash-on-delivery flow** — Designed for the Algerian market

## 🚀 Quick Start

### 1. View the Demo
Simply open `index.html` in a browser. The site works in demo mode with sample data.

### 2. Deploy to Vercel
1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects the static site — no build configuration needed
4. Your site will be live at `https://your-project.vercel.app`

> The included `vercel.json` enables clean URLs (no `.html` extensions) and optimized caching for static assets.

### 3. Connect Supabase (for production)

#### a. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free project
2. Note your **Project URL** and **anon/public key** from Settings → API

#### b. Set Up the Database
1. Go to the **SQL Editor** in your Supabase dashboard
2. Run `supabase/schema.sql` to create tables, indexes, RLS policies, and triggers
3. Optionally run `supabase/seed.sql` to populate sample data

#### c. Configure Storage Buckets
In Supabase dashboard → Storage:
1. Create buckets: `products`, `banners`, `media`
2. Set them all to **Public**
3. Add storage policies to allow authenticated uploads

#### d. Create Admin User
In Supabase dashboard → Authentication:
1. Create a new user with email and password
2. This will be your admin login for the dashboard

#### e. Update Configuration
Edit `js/config.js`:
```javascript
const STORE_CONFIG = {
  supabase: {
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key',
  },
  whatsappNumber: '213550000000', // Your WhatsApp number
  demoMode: false, // Set to false for production
  // ...
};
```

## 📁 Project Structure

```
├── index.html              # Homepage
├── product.html            # Product detail page
├── category.html           # Category listing / search
├── cart.html               # Cart + WhatsApp checkout
├── css/
│   ├── style.css           # Customer website styles
│   └── admin.css           # Admin dashboard styles
├── js/
│   ├── config.js           # Configuration (Supabase credentials, store info)
│   ├── demo-data.js        # Sample data for demo mode
│   ├── i18n.js             # Arabic/French translations
│   ├── store.js            # Data layer (Supabase or demo)
│   ├── cart.js             # Shopping cart (localStorage)
│   ├── whatsapp.js         # WhatsApp message builder
│   ├── wilayas.js          # All 58 Algerian wilayas
│   ├── components.js       # Shared UI (header, footer, product card)
│   └── admin/
│       └── sidebar.js      # Admin sidebar & shared components
├── admin/
│   ├── login.html          # Admin login
│   ├── index.html          # Dashboard
│   ├── orders.html         # Order management
│   ├── products.html       # Product listing
│   ├── product-edit.html   # Add/edit product
│   ├── customers.html      # Customer list
│   ├── homepage.html       # Homepage builder
│   └── media.html          # Media library
├── supabase/
│   ├── schema.sql          # Complete database schema
│   └── seed.sql            # Sample data
└── assets/
    └── logo.svg            # Store logo
```

## 🎨 Customization

### Store Branding
Edit `js/config.js` to change:
- Store name (Arabic and French)
- WhatsApp number
- Phone number
- Social media links
- Default language

### Colors
Edit the CSS custom properties in `css/style.css`:
```css
:root {
  --color-primary: #8B1A2B;     /* Deep burgundy */
  --color-secondary: #C9A96E;   /* Warm gold */
  --color-bg: #FAFAF7;          /* Warm off-white */
}
```

### Translations
Add or modify translations in `js/i18n.js`.

### Categories
Update the categories in `supabase/seed.sql` or through the admin panel once Supabase is connected.

## 📱 WhatsApp Order Format

When a customer places an order, this formatted message is generated:

```
🛍️ NOUVELLE COMMANDE

Informations Client
━━━━━━━━━━━━━━━

👤 Nom: Sarah Benali
📞 Tél: 0550123456
📍 Wilaya: Annaba
🏠 Adresse: Sidi Amar

Produits Commandés
━━━━━━━━━━━━━━━

1️⃣ Caftan Royal Bleu
   Couleur: Bleu Royal
   Taille: M
   Quantité: 1
   Prix: 15 000 DA

━━━━━━━━━━━━━━━

💰 Total: 15 000 DA
```

## 🔒 Security

- Supabase Row Level Security (RLS) ensures public users can only read active products and insert orders
- Admin operations require authentication
- Phone number validation prevents invalid inputs
- All user inputs are sanitized

## 📄 License

MIT — Free to use for commercial projects.
