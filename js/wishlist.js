// ============================================================
// Collection By Ibtissam — Wishlist (localStorage only)
// Lets shoppers save products without creating an account.
// ============================================================

const WISHLIST_KEY = 'cbi_wishlist';

const wishlist = {
  _items: null,

  load() {
    if (this._items) return this._items;
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      this._items = raw ? JSON.parse(raw) : [];
    } catch { this._items = []; }
    return this._items;
  },

  save() {
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(this._items || [])); } catch {}
    document.dispatchEvent(new CustomEvent('wishlistUpdated'));
  },

  has(productId) {
    return this.load().some(x => x.id === productId);
  },

  add(product) {
    const items = this.load();
    if (items.some(x => x.id === product.id)) return;
    items.push({
      id: product.id,
      slug: product.slug,
      name_fr: product.name_fr,
      name_ar: product.name_ar,
      base_price: product.base_price,
      sale_price: product.sale_price,
      image_url: (product.images && (product.images.find(i => i.is_primary) || product.images[0]))?.image_url || null,
      added_at: new Date().toISOString(),
    });
    this.save();
  },

  remove(productId) {
    this._items = this.load().filter(x => x.id !== productId);
    this.save();
  },

  toggle(product) {
    if (this.has(product.id)) {
      this.remove(product.id);
      return false;
    }
    this.add(product);
    return true;
  },

  count() { return this.load().length; },

  clear() { this._items = []; this.save(); },
};

// Convenience global for product cards: toggles and bounces the heart
function toggleWishlist(productJson, btn) {
  try {
    const product = typeof productJson === 'string' ? JSON.parse(decodeURIComponent(productJson)) : productJson;
    const added = wishlist.toggle(product);
    if (btn) {
      btn.classList.toggle('active', added);
      btn.style.transform = 'scale(1.3)';
      setTimeout(() => { btn.style.transform = ''; }, 180);
    }
    if (typeof showToast === 'function') {
      showToast(added
        ? (i18n.currentLang === 'ar' ? 'أُضيف إلى المفضلة' : 'Ajouté aux favoris')
        : (i18n.currentLang === 'ar' ? 'أُزيل من المفضلة' : 'Retiré des favoris'),
        'success', 1500);
    }
  } catch (e) {
    console.error('toggleWishlist', e);
  }
}
