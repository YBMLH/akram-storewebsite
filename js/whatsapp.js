// ============================================================
// Akram Store — WhatsApp Order Integration
// Generates formatted order messages and opens WhatsApp
// ============================================================

class WhatsAppOrder {
  constructor() {
    this.phoneNumber = STORE_CONFIG.whatsappNumber;
  }

  // Build the formatted order message
  buildMessage(orderInfo, cartItems, subtotal, shippingCost = 0) {
    const total = subtotal + shippingCost;
    const lang = i18n.currentLang;

    let message = '';

    if (lang === 'ar') {
      message += '🛍️ *طلب جديد*\n\n';
      message += 'معلومات العميل\n';
      message += '━━━━━━━━━━━━━━━\n\n';
      message += `👤 الاسم: ${orderInfo.name}\n`;
      message += `📞 الهاتف: ${orderInfo.phone}\n`;
      message += `📍 الولاية: ${orderInfo.wilaya}\n`;
      if (orderInfo.commune) message += `🏘️ البلدية: ${orderInfo.commune}\n`;
      message += `🏠 العنوان: ${orderInfo.address}\n`;
      message += '\n';
      message += 'المنتجات المطلوبة\n';
      message += '━━━━━━━━━━━━━━━\n\n';

      cartItems.forEach((item, index) => {
        const emoji = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'][index] || `${index + 1}.`;
        message += `${emoji} ${item.product_name_ar}\n`;
        if (item.color_ar) message += `   اللون: ${item.color_ar}\n`;
        if (item.size) message += `   المقاس: ${item.size}\n`;
        message += `   الكمية: ${item.quantity}\n`;
        message += `   السعر: ${this.formatPrice(item.unit_price * item.quantity)}\n`;
        if (item.image_url) message += `   📸 ${item.image_url}\n`;
        message += '\n';
      });

      message += '━━━━━━━━━━━━━━━\n\n';
      if (shippingCost > 0) {
        message += `📦 التوصيل: ${this.formatPrice(shippingCost)}\n`;
      }
      message += `💰 *المجموع: ${this.formatPrice(total)}*\n`;

      if (orderInfo.notes) {
        message += `\n📝 ملاحظات:\n${orderInfo.notes}\n`;
      }
    } else {
      message += '🛍️ *NOUVELLE COMMANDE*\n\n';
      message += 'Informations Client\n';
      message += '━━━━━━━━━━━━━━━\n\n';
      message += `👤 Nom: ${orderInfo.name}\n`;
      message += `📞 Tél: ${orderInfo.phone}\n`;
      message += `📍 Wilaya: ${orderInfo.wilaya}\n`;
      if (orderInfo.commune) message += `🏘️ Commune: ${orderInfo.commune}\n`;
      message += `🏠 Adresse: ${orderInfo.address}\n`;
      message += '\n';
      message += 'Produits Commandés\n';
      message += '━━━━━━━━━━━━━━━\n\n';

      cartItems.forEach((item, index) => {
        const emoji = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'][index] || `${index + 1}.`;
        message += `${emoji} ${item.product_name_fr}\n`;
        if (item.color) message += `   Couleur: ${item.color}\n`;
        if (item.size) message += `   Taille: ${item.size}\n`;
        message += `   Quantité: ${item.quantity}\n`;
        message += `   Prix: ${this.formatPrice(item.unit_price * item.quantity)}\n`;
        if (item.image_url) message += `   📸 ${item.image_url}\n`;
        message += '\n';
      });

      message += '━━━━━━━━━━━━━━━\n\n';
      if (shippingCost > 0) {
        message += `📦 Livraison: ${this.formatPrice(shippingCost)}\n`;
      }
      message += `💰 *Total: ${this.formatPrice(total)}*\n`;

      if (orderInfo.notes) {
        message += `\n📝 Notes:\n${orderInfo.notes}\n`;
      }
    }

    return message;
  }

  formatPrice(amount) {
    return `${new Intl.NumberFormat('fr-DZ').format(amount)} DA`;
  }

  // Open WhatsApp with the order message
  sendOrder(orderInfo, cartItems, subtotal, shippingCost = 0) {
    const message = this.buildMessage(orderInfo, cartItems, subtotal, shippingCost);
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  }

  // Open WhatsApp for general contact
  openChat(customMessage = '') {
    const message = customMessage || (i18n.currentLang === 'ar'
      ? 'مرحباً، أريد الاستفسار عن منتجاتكم'
      : 'Bonjour, je souhaite me renseigner sur vos produits');
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}

// Global instance
const whatsapp = new WhatsAppOrder();
