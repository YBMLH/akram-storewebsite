// ============================================================
// Admin Sidebar Component
// ============================================================

function renderAdminSidebar(activePage = 'dashboard') {
  const sidebar = document.getElementById('admin-sidebar');
  if (!sidebar) return;

  const storeName = i18n.currentLang === 'ar' ? STORE_CONFIG.store.name.ar : STORE_CONFIG.store.name.fr;

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <div class="sidebar-logo">${storeName}</div>
      <div class="sidebar-subtitle">Admin Panel</div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section-label">${i18n.currentLang === 'ar' ? 'الرئيسية' : 'PRINCIPAL'}</div>
      <a href="/admin/index.html" class="${activePage === 'dashboard' ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        <span data-i18n="admin.dashboard">${i18n.t('admin.dashboard')}</span>
      </a>
      <a href="/admin/orders.html" class="${activePage === 'orders' ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span data-i18n="admin.orders">${i18n.t('admin.orders')}</span>
      </a>
      <a href="/admin/analytics.html" class="${activePage === 'analytics' ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        <span data-i18n="admin.analytics">${i18n.t('admin.analytics')}</span>
      </a>

      <div class="sidebar-section-label">${i18n.currentLang === 'ar' ? 'المتجر' : 'BOUTIQUE'}</div>
      <a href="/admin/products.html" class="${activePage === 'products' ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
        <span data-i18n="admin.products">${i18n.t('admin.products')}</span>
      </a>
      <a href="/admin/categories.html" class="${activePage === 'categories' ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        <span data-i18n="admin.categories">${i18n.t('admin.categories')}</span>
      </a>
      <a href="/admin/customers.html" class="${activePage === 'customers' ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <span data-i18n="admin.customers">${i18n.t('admin.customers')}</span>
      </a>

      <div class="sidebar-section-label">${i18n.currentLang === 'ar' ? 'المحتوى' : 'CONTENU'}</div>
      <a href="/admin/homepage.html" class="${activePage === 'homepage' ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span data-i18n="admin.homepage">${i18n.t('admin.homepage')}</span>
      </a>
      <a href="/admin/media.html" class="${activePage === 'media' ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <span data-i18n="admin.media">${i18n.t('admin.media')}</span>
      </a>

      <div class="sidebar-section-label">${i18n.currentLang === 'ar' ? 'الإعدادات' : 'CONFIGURATION'}</div>
      <a href="/admin/settings.html" class="${activePage === 'settings' ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        <span data-i18n="admin.settings">${i18n.t('admin.settings')}</span>
      </a>
    </nav>
    <div class="sidebar-footer">
      <a href="/" target="_blank">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        ${i18n.currentLang === 'ar' ? 'عرض المتجر' : 'Voir la Boutique'}
      </a>
      <a href="#" onclick="adminLogout()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span data-i18n="admin.logout">${i18n.t('admin.logout')}</span>
      </a>
    </div>
  `;

  i18n.translatePage();
}

function renderAdminTopbar(title, actions = '') {
  const topbar = document.getElementById('admin-topbar');
  if (!topbar) return;

  const currentTheme = getAdminTheme();
  const nextIcon = currentTheme === 'dark'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  topbar.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;">
      <button class="sidebar-toggle" onclick="toggleAdminSidebar()" aria-label="Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <h1>${title}</h1>
    </div>
    <div class="admin-topbar-actions">
      ${actions}
      <button class="admin-theme-toggle" onclick="toggleAdminTheme()" aria-label="Toggle theme" title="Toggle theme">
        ${nextIcon}
      </button>
      <button class="lang-toggle" onclick="i18n.toggleLanguage(); location.reload();">
        ${i18n.currentLang === 'ar' ? 'FR' : 'عربي'}
      </button>
    </div>
  `;
}

function toggleAdminSidebar() {
  document.getElementById('admin-sidebar').classList.toggle('open');
}

// ---- Theme (light / dark) ----
function getAdminTheme() {
  try {
    const saved = localStorage.getItem('cbi_admin_theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {}
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyAdminTheme(theme) {
  document.documentElement.setAttribute('data-admin-theme', theme);
  try { localStorage.setItem('cbi_admin_theme', theme); } catch {}
}

function toggleAdminTheme() {
  const next = getAdminTheme() === 'dark' ? 'light' : 'dark';
  applyAdminTheme(next);
  // Re-render topbar so the icon flips
  const topbarTitle = document.querySelector('.admin-topbar h1')?.textContent || '';
  const actionsWrap = document.querySelector('.admin-topbar-actions');
  const extraActionsHTML = actionsWrap
    ? Array.from(actionsWrap.children).filter(c =>
        !c.classList.contains('admin-theme-toggle') && !c.classList.contains('lang-toggle')
      ).map(c => c.outerHTML).join('')
    : '';
  renderAdminTopbar(topbarTitle, extraActionsHTML);
}

// Apply saved theme immediately (before DOM ready) to avoid flash
(function initAdminTheme() {
  applyAdminTheme(getAdminTheme());
})();

async function checkAdminAuth() {
  try {
    const session = await store.getSession();
    if (!session) {
      console.warn('[admin] no session found, redirecting to login');
      window.location.href = '/admin/login.html';
      return false;
    }
    return true;
  } catch (e) {
    console.error('[admin] auth check failed:', e);
    // Don't redirect on transient errors — let the page render and surface the error
    return true;
  }
}

async function adminLogout() {
  if (STORE_CONFIG.demoMode) {
    sessionStorage.removeItem('akram_admin_demo');
  }
  await store.signOut();
  window.location.href = '/admin/login.html';
}

// Order status labels and colors
const ORDER_STATUSES = {
  new: { ar: 'جديد', fr: 'Nouveau', class: 'status-new' },
  contacted: { ar: 'تم التواصل', fr: 'Contacté', class: 'status-contacted' },
  confirmed: { ar: 'مؤكد', fr: 'Confirmé', class: 'status-confirmed' },
  preparing: { ar: 'قيد التحضير', fr: 'En Préparation', class: 'status-preparing' },
  shipped: { ar: 'تم الشحن', fr: 'Expédié', class: 'status-shipped' },
  delivered: { ar: 'تم التوصيل', fr: 'Livré', class: 'status-delivered' },
  cancelled: { ar: 'ملغي', fr: 'Annulé', class: 'status-cancelled' },
};

function getStatusLabel(status) {
  const s = ORDER_STATUSES[status] || { ar: status, fr: status, class: '' };
  return `<span class="status-badge ${s.class}">${i18n.currentLang === 'ar' ? s.ar : s.fr}</span>`;
}
