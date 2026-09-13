// ============================================================
// Akram Store — Internationalization (Arabic / French)
// ============================================================

const TRANSLATIONS = {
  // Navigation
  'nav.home': { ar: 'الرئيسية', fr: 'Accueil' },
  'nav.categories': { ar: 'الفئات', fr: 'Catégories' },
  'nav.new': { ar: 'جديد', fr: 'Nouveautés' },
  'nav.sale': { ar: 'عروض', fr: 'Promotions' },
  'nav.contact': { ar: 'اتصلي بنا', fr: 'Contact' },

  // Homepage
  'home.featured': { ar: 'منتجات مميزة', fr: 'Produits Vedettes' },
  'home.new_arrivals': { ar: 'وصل حديثاً', fr: 'Nouveautés' },
  'home.best_sellers': { ar: 'الأكثر مبيعاً', fr: 'Meilleures Ventes' },
  'home.categories': { ar: 'تصفحي حسب الفئة', fr: 'Parcourir par Catégorie' },
  'home.view_all': { ar: 'عرض الكل', fr: 'Voir Tout' },
  'home.shop_now': { ar: 'تسوقي الآن', fr: 'Achetez Maintenant' },
  'home.instagram': { ar: 'تابعينا على إنستغرام', fr: 'Suivez-nous sur Instagram' },

  // Product
  'product.add_to_cart': { ar: 'أضيفي إلى السلة', fr: 'Ajouter au Panier' },
  'product.buy_now': { ar: 'اشتري الآن', fr: 'Acheter Maintenant' },
  'product.size': { ar: 'المقاس', fr: 'Taille' },
  'product.color': { ar: 'اللون', fr: 'Couleur' },
  'product.quantity': { ar: 'الكمية', fr: 'Quantité' },
  'product.in_stock': { ar: 'متوفر', fr: 'En Stock' },
  'product.out_of_stock': { ar: 'غير متوفر', fr: 'Rupture de Stock' },
  'product.low_stock': { ar: 'كمية محدودة', fr: 'Stock Limité' },
  'product.description': { ar: 'الوصف', fr: 'Description' },
  'product.related': { ar: 'منتجات مشابهة', fr: 'Produits Similaires' },
  'product.select_size': { ar: 'اختاري المقاس', fr: 'Choisir la Taille' },
  'product.select_color': { ar: 'اختاري اللون', fr: 'Choisir la Couleur' },
  'product.price': { ar: 'السعر', fr: 'Prix' },
  'product.sale': { ar: 'تخفيض', fr: 'Promo' },

  // Cart
  'cart.title': { ar: 'سلة التسوق', fr: 'Panier' },
  'cart.empty': { ar: 'سلتك فارغة', fr: 'Votre panier est vide' },
  'cart.continue': { ar: 'متابعة التسوق', fr: 'Continuer vos achats' },
  'cart.subtotal': { ar: 'المجموع الفرعي', fr: 'Sous-total' },
  'cart.shipping': { ar: 'التوصيل', fr: 'Livraison' },
  'cart.total': { ar: 'المجموع الكلي', fr: 'Total' },
  'cart.free_shipping': { ar: 'مجاني', fr: 'Gratuit' },
  'cart.remove': { ar: 'حذف', fr: 'Supprimer' },
  'cart.place_order': { ar: 'اطلبي عبر واتساب', fr: 'Commander via WhatsApp' },
  'cart.items': { ar: 'منتج', fr: 'article(s)' },

  // Checkout form
  'checkout.title': { ar: 'معلومات التوصيل', fr: 'Informations de Livraison' },
  'checkout.name': { ar: 'الاسم الكامل', fr: 'Nom Complet' },
  'checkout.phone': { ar: 'رقم الهاتف', fr: 'Numéro de Téléphone' },
  'checkout.wilaya': { ar: 'الولاية', fr: 'Wilaya' },
  'checkout.commune': { ar: 'البلدية', fr: 'Commune' },
  'checkout.address': { ar: 'العنوان', fr: 'Adresse' },
  'checkout.notes': { ar: 'ملاحظات', fr: 'Notes' },
  'checkout.notes_placeholder': { ar: 'أي ملاحظات إضافية للطلب...', fr: 'Notes supplémentaires pour la commande...' },

  // Footer
  'footer.about': { ar: 'من نحن', fr: 'À Propos' },
  'footer.about_text': { ar: 'متجر أكرم للأزياء النسائية الراقية. نقدم أجود القفاطين والكاراكو والملابس العصرية.', fr: 'Akram Store pour la mode féminine haut de gamme. Nous proposons les meilleurs caftans, karakou et vêtements modernes.' },
  'footer.links': { ar: 'روابط سريعة', fr: 'Liens Rapides' },
  'footer.contact': { ar: 'اتصلي بنا', fr: 'Contactez-nous' },
  'footer.rights': { ar: 'جميع الحقوق محفوظة', fr: 'Tous droits réservés' },
  'footer.follow': { ar: 'تابعينا', fr: 'Suivez-nous' },

  // General
  'general.search': { ar: 'بحث...', fr: 'Rechercher...' },
  'general.loading': { ar: 'جاري التحميل...', fr: 'Chargement...' },
  'general.error': { ar: 'حدث خطأ', fr: 'Une erreur est survenue' },
  'general.no_results': { ar: 'لا توجد نتائج', fr: 'Aucun résultat' },
  'general.all': { ar: 'الكل', fr: 'Tous' },
  'general.currency': { ar: 'د.ج', fr: 'DA' },
  'general.added_to_cart': { ar: 'تمت الإضافة إلى السلة', fr: 'Ajouté au panier' },
  'general.whatsapp_order': { ar: 'طلب عبر واتساب', fr: 'Commander via WhatsApp' },

  // Category page
  'category.all_products': { ar: 'جميع المنتجات', fr: 'Tous les Produits' },
  'category.filter': { ar: 'تصفية', fr: 'Filtrer' },
  'category.sort': { ar: 'ترتيب', fr: 'Trier' },
  'category.sort_newest': { ar: 'الأحدث', fr: 'Plus Récents' },
  'category.sort_price_low': { ar: 'السعر: من الأقل', fr: 'Prix Croissant' },
  'category.sort_price_high': { ar: 'السعر: من الأعلى', fr: 'Prix Décroissant' },
  'category.sort_popular': { ar: 'الأكثر شعبية', fr: 'Plus Populaires' },

  // Admin
  'admin.dashboard': { ar: 'لوحة التحكم', fr: 'Tableau de Bord' },
  'admin.products': { ar: 'المنتجات', fr: 'Produits' },
  'admin.orders': { ar: 'الطلبات', fr: 'Commandes' },
  'admin.customers': { ar: 'العملاء', fr: 'Clients' },
  'admin.homepage': { ar: 'الصفحة الرئيسية', fr: 'Page d\'Accueil' },
  'admin.media': { ar: 'المكتبة', fr: 'Médiathèque' },
  'admin.settings': { ar: 'الإعدادات', fr: 'Paramètres' },
  'admin.logout': { ar: 'تسجيل الخروج', fr: 'Déconnexion' },
  'admin.login': { ar: 'تسجيل الدخول', fr: 'Connexion' },
  'admin.email': { ar: 'البريد الإلكتروني', fr: 'Email' },
  'admin.password': { ar: 'كلمة المرور', fr: 'Mot de passe' },
};

// ============================================================
// I18n Manager
// ============================================================
class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('akram_lang') || STORE_CONFIG.defaultLanguage || 'fr';
    this.updateDirection();
  }

  t(key) {
    const translation = TRANSLATIONS[key];
    if (!translation) return key;
    return translation[this.currentLang] || translation.fr || key;
  }

  // Get localized field from a database object (name_ar / name_fr pattern)
  field(obj, fieldBase) {
    if (!obj) return '';
    const key = `${fieldBase}_${this.currentLang}`;
    return obj[key] || obj[`${fieldBase}_fr`] || obj[`${fieldBase}_ar`] || '';
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('akram_lang', lang);
    this.updateDirection();
    this.translatePage();

    // Dispatch event for components that need to update
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  toggleLanguage() {
    this.setLanguage(this.currentLang === 'ar' ? 'fr' : 'ar');
  }

  get isRTL() {
    return this.currentLang === 'ar';
  }

  updateDirection() {
    document.documentElement.dir = this.isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = this.currentLang;
  }

  // Translate all elements with data-i18n attribute
  translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    });

    // Update elements with data-i18n-html (for HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = this.t(el.getAttribute('data-i18n-html'));
    });
  }

  // Format price in DA
  formatPrice(amount) {
    const formatted = new Intl.NumberFormat(this.currentLang === 'ar' ? 'ar-DZ' : 'fr-DZ', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return `${formatted} ${this.t('general.currency')}`;
  }

  // Format date
  formatDate(dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(this.currentLang === 'ar' ? 'ar-DZ' : 'fr-DZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }
}

// Global i18n instance
const i18n = new I18n();
