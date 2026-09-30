# Collection By Ibtissam

Boutique en ligne — mode féminine contemporaine.
Site statique (HTML + CSS + JavaScript vanilla) déployé sur Vercel.

**Site en ligne:** https://collectionbyibtissam.com

---

## Fonctionnalités

### Côté client
- Page d'accueil avec hero slider, catégories, produits vedettes, nouveautés, best-sellers
- Catalogue avec filtres et tri
- Pages produit avec galerie zoomable, variantes (tailles, couleurs), quantité
- Panier persisté (localStorage)
- Checkout via WhatsApp (avec formulaire de livraison, 58 wilayas)
- Bilingue Français ↔ Arabe (RTL)
- SEO complet : Open Graph, Twitter Cards, JSON-LD (Product, BreadcrumbList, Organization), sitemap, robots.txt
- Responsive (mobile-first)

### Côté admin (`/admin/login`)
- **Tableau de bord** — statistiques du jour et du mois
- **Commandes** — recherche, filtres par statut / date, modal de détail, facture imprimable, export CSV, WhatsApp direct
- **Analyses** — chiffre d'affaires, courbes 7/30/90 jours, top wilayas, statuts, produits populaires
- **Produits** — recherche, filtres (catégorie, statut), tri, sélection multiple + suppression en masse, duplication
- **Édition produit** — bilingue, prix promo, stock, variantes, aperçus d'images en direct, champs SEO
- **Catégories** — CRUD complet avec aperçu image
- **Clients** — dérivés des commandes, historique par client, export CSV, contact WhatsApp
- **Médiathèque** — bibliothèque d'images (nécessite Supabase Storage en production)
- **Page d'accueil** — gestion des slides du hero
- **Paramètres** — nom du magasin, WhatsApp, adresse, réseaux sociaux, devise

---

## Développement local

C'est un site statique — aucun build nécessaire.

```bash
# Servir localement
python3 -m http.server 8000
# ou
npx serve .
```

Puis ouvrir http://localhost:8000

---

## Déploiement

Le site est déployé automatiquement sur **Vercel** à chaque push sur `main`.

Configuration : voir `vercel.json` (clean URLs, headers cache).

---

## Mode démo vs Mode production

Par défaut le site fonctionne en **mode démo** : toutes les données (produits, commandes, catégories, paramètres) proviennent de `js/demo-data.js` et sont conservées en mémoire uniquement pendant la session en cours. Les modifications de l'admin sont perdues au rechargement de la page.

Pour passer en **mode production** avec vraie base de données, images uploadables, authentification admin et persistance permanente, il faut connecter **Supabase**.

### Configurer Supabase (~15 minutes)

**1. Créer un projet Supabase**
- Aller sur https://supabase.com et créer un compte gratuit
- Créer un nouveau projet (choisir la région Europe pour la meilleure latence depuis l'Algérie)
- Noter le mot de passe de la base de données

**2. Configurer la base de données**
- Dans le projet Supabase → **SQL Editor** → New query
- Copier-coller tout le contenu de `supabase/schema.sql` et exécuter
- Optionnel : copier-coller `supabase/seed.sql` pour des données d'exemple

**3. Configurer le stockage d'images**
- **Storage** → New bucket → nommer `media` → cocher "Public bucket" → Create
- Dans les policies du bucket : autoriser SELECT public, INSERT/UPDATE/DELETE pour authenticated

**4. Créer l'utilisateur admin**
- **Authentication → Users → Add user** → email + mot de passe
- Cet email/mot de passe sera utilisé sur `/admin/login`

**5. Récupérer les identifiants**
- **Project Settings → API**
- Copier `Project URL` et `anon public key`

**6. Modifier `js/config.js`**
```js
const STORE_CONFIG = {
  supabase: {
    url: 'https://VOTRE-PROJET.supabase.co',
    anonKey: 'eyJhbGc...VOTRE_CLE_ANON',
  },
  // ...
  demoMode: false,  // désactive le mode démo
};
```

**7. Ajouter le CDN Supabase dans les pages HTML**

Avant `<script src="js/config.js">` dans chaque page (index, product, category, cart, admin/*), ajouter :
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

**8. Déployer**
```bash
git add -A && git commit -m "Enable production Supabase" && git push
```

Vercel redéploie automatiquement.

---

## Structure du projet

```
├── index.html              # Homepage
├── product.html            # Page produit
├── category.html           # Catalogue avec filtres
├── cart.html               # Panier + checkout WhatsApp
├── robots.txt / sitemap.xml
├── favicon.svg / apple-touch-icon.svg
├── vercel.json             # Config déploiement
│
├── admin/                  # Dashboard admin (noindex)
│   ├── login.html
│   ├── index.html          # Tableau de bord
│   ├── orders.html         # Gestion commandes
│   ├── products.html       # Liste produits
│   ├── product-edit.html   # Édition produit
│   ├── categories.html     # Gestion catégories
│   ├── customers.html      # Clients
│   ├── analytics.html      # Analyses
│   ├── homepage.html       # Slides du hero
│   ├── media.html          # Médiathèque
│   └── settings.html       # Paramètres du magasin
│
├── css/
│   ├── style.css           # Styles client
│   └── admin.css           # Styles admin
│
├── js/
│   ├── config.js           # Config (Supabase, WhatsApp, etc.)
│   ├── store.js            # DataStore (Supabase + demo)
│   ├── cart.js             # Panier (localStorage)
│   ├── i18n.js             # Traductions FR/AR
│   ├── whatsapp.js         # Génération messages commande
│   ├── wilayas.js          # 58 wilayas d'Algérie
│   ├── demo-data.js        # Données démo
│   ├── components.js       # Header, footer, product card
│   └── admin/
│       └── sidebar.js      # Sidebar + auth admin
│
├── assets/
│   └── logo.svg
│
└── supabase/               # Backend (à configurer)
    ├── schema.sql          # Schéma DB
    └── seed.sql            # Données initiales
```

---

## Personnalisation rapide

- **Nom & branding** : `js/config.js` → `STORE_CONFIG.store.name`
- **Numéro WhatsApp** : `js/config.js` → `STORE_CONFIG.whatsappNumber` (format international sans `+`)
- **Palette / typographie** : `css/style.css` → tokens `--color-*` et `--font-*`
- **Contenu du hero** : `js/demo-data.js` → `homepage_sections`
- **Wilayas / prix de livraison** : `js/wilayas.js`

Une fois Supabase configuré, la plupart de ces paramètres se modifient depuis `/admin/settings`.
