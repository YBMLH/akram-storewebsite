// ============================================================
// Akram Store — Shared UI Components
// Header, Footer, Product Card, WhatsApp FAB
// ============================================================

// ---- Render Header ----
function renderHeader(activePage = 'home') {
  const header = document.getElementById('site-header');
  if (!header) return;

  header.innerHTML = `
    <div class="header-top">
      <div class="container header-top-inner">
        <span class="header-top-text" data-i18n="footer.about_text"></span>
        <button class="lang-toggle" onclick="i18n.toggleLanguage(); renderPage();" aria-label="Toggle language">
          ${i18n.currentLang === 'ar' ? 'FR 🇫🇷' : 'عربي 🇩🇿'}
        </button>
      </div>
    </div>
    <nav class="header-main">
      <div class="container header-main-inner">
        <a href="index.html" class="logo">
          <span class="logo-text">${i18n.field(STORE_CONFIG.store.name, '') || (i18n.currentLang === 'ar' ? STORE_CONFIG.store.name.ar : STORE_CONFIG.store.name.fr)}</span>
        </a>
        <ul class="nav-links">
          <li><a href="index.html" class="${activePage === 'home' ? 'active' : ''}" data-i18n="nav.home">Accueil</a></li>
          <li class="nav-dropdown">
            <a href="#" class="${activePage === 'categories' ? 'active' : ''}" data-i18n="nav.categories">Catégories</a>
            <div class="dropdown-menu" id="nav-categories-dropdown"></div>
          </li>
          <li><a href="category.html?filter=new" class="${activePage === 'new' ? 'active' : ''}" data-i18n="nav.new">Nouveautés</a></li>
          <li><a href="category.html?filter=sale" class="${activePage === 'sale' ? 'active' : ''}" data-i18n="nav.sale">Promotions</a></li>
        </ul>
        <div class="header-actions">
          <a href="cart.html" class="header-action cart-link" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span class="cart-badge" style="display:${cart.count > 0 ? 'flex' : 'none'}">${cart.count}</span>
          </a>
          <button class="mobile-menu-toggle" onclick="toggleMobileMenu()" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu">
      <div class="mobile-menu-header">
        <span class="logo-text">${i18n.currentLang === 'ar' ? STORE_CONFIG.store.name.ar : STORE_CONFIG.store.name.fr}</span>
        <button onclick="toggleMobileMenu()" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <ul class="mobile-nav-links">
        <li><a href="index.html" data-i18n="nav.home">Accueil</a></li>
        <li><a href="category.html" data-i18n="nav.categories">Catégories</a></li>
        <li><a href="category.html?filter=new" data-i18n="nav.new">Nouveautés</a></li>
        <li><a href="category.html?filter=sale" data-i18n="nav.sale">Promotions</a></li>
        <li><a href="cart.html" data-i18n="cart.title">Panier</a></li>
      </ul>
      <div class="mobile-menu-footer">
        <button class="lang-toggle" onclick="i18n.toggleLanguage(); renderPage();">
          ${i18n.currentLang === 'ar' ? 'FR 🇫🇷 Français' : '🇩🇿 عربي Arabic'}
        </button>
      </div>
    </div>
  `;

  // Populate category dropdown
  loadCategoryDropdown();
  i18n.translatePage();
}

async function loadCategoryDropdown() {
  try {
    const categories = await store.getCategories();
    const dropdown = document.getElementById('nav-categories-dropdown');
    if (!dropdown) return;
    dropdown.innerHTML = categories.map(cat => `
      <a href="category.html?slug=${cat.slug}">${i18n.field(cat, 'name')}</a>
    `).join('');
  } catch (e) {
    console.error('Failed to load categories dropdown:', e);
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) {
    menu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  }
}

// ---- Render Footer ----
function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container footer-grid">
      <div class="footer-section">
        <h3 class="footer-title">${i18n.currentLang === 'ar' ? STORE_CONFIG.store.name.ar : STORE_CONFIG.store.name.fr}</h3>
        <p class="footer-text" data-i18n="footer.about_text"></p>
        <div class="footer-socials">
          ${STORE_CONFIG.store.instagram ? `<a href="${STORE_CONFIG.store.instagram}" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>` : ''}
          ${STORE_CONFIG.store.facebook ? `<a href="${STORE_CONFIG.store.facebook}" target="_blank" rel="noopener" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>` : ''}
        </div>
      </div>
      <div class="footer-section">
        <h3 class="footer-title" data-i18n="footer.links"></h3>
        <ul class="footer-links">
          <li><a href="index.html" data-i18n="nav.home"></a></li>
          <li><a href="category.html" data-i18n="nav.categories"></a></li>
          <li><a href="category.html?filter=new" data-i18n="nav.new"></a></li>
          <li><a href="category.html?filter=sale" data-i18n="nav.sale"></a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3 class="footer-title" data-i18n="footer.contact"></h3>
        <ul class="footer-links">
          <li>📞 ${STORE_CONFIG.store.phone}</li>
          <li>📍 ${i18n.currentLang === 'ar' ? STORE_CONFIG.store.address.ar : STORE_CONFIG.store.address.fr}</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>&copy; ${new Date().getFullYear()} ${i18n.currentLang === 'ar' ? STORE_CONFIG.store.name.ar : STORE_CONFIG.store.name.fr}. <span data-i18n="footer.rights"></span></p>
      </div>
    </div>
  `;

  i18n.translatePage();
}

// ---- Product Card Component ----
function renderProductCard(product) {
  const name = i18n.field(product, 'name');
  const primaryImage = product.images
    ? (product.images.find(img => img.is_primary) || product.images[0])
    : null;
  const imageUrl = primaryImage?.image_url || `https://placehold.co/400x500/e2e8f0/666?text=${encodeURIComponent(name)}`;

  const hasDiscount = product.sale_price && product.sale_price < product.base_price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.sale_price / product.base_price) * 100)
    : 0;

  return `
    <a href="product.html?slug=${product.slug}" class="product-card">
      <div class="product-card-image">
        <img src="${imageUrl}" alt="${name}" loading="lazy" />
        ${hasDiscount ? `<span class="product-badge sale">-${discountPercent}%</span>` : ''}
        ${product.is_new_arrival ? '<span class="product-badge new">' + i18n.t('nav.new') + '</span>' : ''}
        ${product.stock_quantity <= 0 ? '<span class="product-badge out">' + i18n.t('product.out_of_stock') + '</span>' : ''}
      </div>
      <div class="product-card-info">
        <h3 class="product-card-name">${name}</h3>
        <div class="product-card-price">
          ${hasDiscount
            ? `<span class="price-current">${i18n.formatPrice(product.sale_price)}</span>
               <span class="price-original">${i18n.formatPrice(product.base_price)}</span>`
            : `<span class="price-current">${i18n.formatPrice(product.base_price)}</span>`
          }
        </div>
      </div>
    </a>
  `;
}

// ---- WhatsApp Floating Action Button ----
function renderWhatsAppFAB() {
  const fab = document.createElement('a');
  fab.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;
  fab.target = '_blank';
  fab.rel = 'noopener';
  fab.className = 'whatsapp-fab';
  fab.setAttribute('aria-label', 'WhatsApp');
  fab.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  `;
  document.body.appendChild(fab);
}

// ---- Render Product Grid ----
function renderProductGrid(containerId, products) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = products.map(p => renderProductCard(p)).join('');
}

// ---- Loading Spinner ----
function showLoading(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p data-i18n="general.loading">${i18n.t('general.loading')}</p>
    </div>
  `;
}
