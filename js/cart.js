// ============================================================
// Akram Store — Shopping Cart
// Persisted in localStorage
// ============================================================

class Cart {
  constructor() {
    this.storageKey = 'akram_cart';
    this.items = this.load();
  }

  load() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch {
      return [];
    }
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.updateBadge();
    document.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: this } }));
  }

  // Add item to cart
  add(product, variant, quantity = 1) {
    const existingIndex = this.items.findIndex(item =>
      item.product_id === product.id &&
      item.size === (variant?.size || null) &&
      item.color === (variant?.color_name_fr || null)
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      const primaryImage = product.images
        ? (product.images.find(img => img.is_primary) || product.images[0])
        : null;

      this.items.push({
        product_id: product.id,
        variant_id: variant?.id || null,
        product_name_ar: product.name_ar,
        product_name_fr: product.name_fr,
        product_slug: product.slug,
        size: variant?.size || null,
        color: variant?.color_name_fr || null,
        color_ar: variant?.color_name_ar || null,
        color_hex: variant?.color_hex || null,
        quantity,
        unit_price: product.sale_price || product.base_price,
        original_price: product.base_price,
        image_url: primaryImage?.image_url || '',
      });
    }

    this.save();
    this.showNotification();
  }

  // Update item quantity
  updateQuantity(index, quantity) {
    if (quantity <= 0) {
      this.remove(index);
      return;
    }
    if (this.items[index]) {
      this.items[index].quantity = quantity;
      this.save();
    }
  }

  // Remove item
  remove(index) {
    this.items.splice(index, 1);
    this.save();
  }

  // Clear cart
  clear() {
    this.items = [];
    this.save();
  }

  // Get total items count
  get count() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Get subtotal
  get subtotal() {
    return this.items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
  }

  // Get total (with shipping)
  getTotal(shippingCost = 0) {
    return this.subtotal + shippingCost;
  }

  // Update cart badge in header
  updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
      const count = this.count;
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // Show "added to cart" notification
  showNotification() {
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${i18n.t('general.added_to_cart')}</span>
    `;
    document.body.appendChild(notification);

    requestAnimationFrame(() => notification.classList.add('show'));
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }
}

// Global cart instance
const cart = new Cart();
