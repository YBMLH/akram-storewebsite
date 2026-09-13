// ============================================================
// Akram Store — Demo Data
// Used when Supabase is not configured (demo mode)
// ============================================================

const DEMO_DATA = {
  categories: [
    { id: 'cat-1', name_ar: 'قفطان', name_fr: 'Caftans', slug: 'caftans', image_url: 'https://placehold.co/400x400/8B1A2B/ffffff?text=Caftans', sort_order: 1 },
    { id: 'cat-2', name_ar: 'كاراكو', name_fr: 'Karakou', slug: 'karakou', image_url: 'https://placehold.co/400x400/c9a96e/ffffff?text=Karakou', sort_order: 2 },
    { id: 'cat-3', name_ar: 'فساتين سهرة', name_fr: 'Robes de Soirée', slug: 'soiree', image_url: 'https://placehold.co/400x400/1a1a2e/ffffff?text=Soir%C3%A9e', sort_order: 3 },
    { id: 'cat-4', name_ar: 'بوركيني', name_fr: 'Burkinis', slug: 'burkinis', image_url: 'https://placehold.co/400x400/0d47a1/ffffff?text=Burkinis', sort_order: 4 },
    { id: 'cat-5', name_ar: 'ملابس كاجوال', name_fr: 'Casual Wear', slug: 'casual', image_url: 'https://placehold.co/400x400/d4a5a5/ffffff?text=Casual', sort_order: 5 },
    { id: 'cat-6', name_ar: 'إكسسوارات', name_fr: 'Accessoires', slug: 'accessories', image_url: 'https://placehold.co/400x400/b7791f/ffffff?text=Accessoires', sort_order: 6 },
  ],

  products: [
    {
      id: 'prod-1', name_ar: 'قفطان رويال أزرق', name_fr: 'Caftan Royal Bleu', slug: 'caftan-royal-bleu',
      category_id: 'cat-1',
      description_ar: 'قفطان فاخر مصنوع من الحرير الطبيعي مع تطريز يدوي بخيوط ذهبية. تصميم أنيق يجمع بين الأصالة والحداثة. مناسب للأعراس والمناسبات الخاصة.',
      description_fr: 'Caftan luxueux en soie naturelle avec broderie à la main en fils dorés. Design élégant alliant authenticité et modernité. Parfait pour les mariages et occasions spéciales.',
      base_price: 15000, sale_price: null, is_featured: true, is_new_arrival: true, is_best_seller: false,
      stock_quantity: 8, status: 'active', views_count: 124,
      images: [
        { image_url: 'https://placehold.co/600x800/1a365d/ffffff?text=Caftan+Royal', is_primary: true },
        { image_url: 'https://placehold.co/600x800/1a365d/ffffff?text=Detail+Broderie', is_primary: false },
        { image_url: 'https://placehold.co/600x800/1a365d/ffffff?text=Vue+Dos', is_primary: false },
      ],
      variants: [
        { size: 'S', color_name_fr: 'Bleu Royal', color_name_ar: 'أزرق ملكي', color_hex: '#1a365d', stock_quantity: 2 },
        { size: 'M', color_name_fr: 'Bleu Royal', color_name_ar: 'أزرق ملكي', color_hex: '#1a365d', stock_quantity: 3 },
        { size: 'L', color_name_fr: 'Bleu Royal', color_name_ar: 'أزرق ملكي', color_hex: '#1a365d', stock_quantity: 2 },
        { size: 'XL', color_name_fr: 'Bleu Royal', color_name_ar: 'أزرق ملكي', color_hex: '#1a365d', stock_quantity: 1 },
      ],
    },
    {
      id: 'prod-2', name_ar: 'كاراكو تقليدي ذهبي', name_fr: 'Karakou Traditionnel Doré', slug: 'karakou-traditionnel-dore',
      category_id: 'cat-2',
      description_ar: 'كاراكو جزائري تقليدي بالمجبود الذهبي مع سروال شلقة. عمل يدوي متقن بأجود الخامات.',
      description_fr: 'Karakou algérien traditionnel en medjboud doré avec seroual chelka. Travail artisanal minutieux avec les meilleures matières.',
      base_price: 25000, sale_price: 22000, is_featured: true, is_new_arrival: false, is_best_seller: true,
      stock_quantity: 5, status: 'active', views_count: 256,
      images: [
        { image_url: 'https://placehold.co/600x800/b7791f/ffffff?text=Karakou+Dore', is_primary: true },
        { image_url: 'https://placehold.co/600x800/b7791f/ffffff?text=Karakou+Detail', is_primary: false },
      ],
      variants: [
        { size: 'S', color_name_fr: 'Doré', color_name_ar: 'ذهبي', color_hex: '#b7791f', stock_quantity: 1 },
        { size: 'M', color_name_fr: 'Doré', color_name_ar: 'ذهبي', color_hex: '#b7791f', stock_quantity: 2 },
        { size: 'L', color_name_fr: 'Doré', color_name_ar: 'ذهبي', color_hex: '#b7791f', stock_quantity: 2 },
      ],
    },
    {
      id: 'prod-3', name_ar: 'فستان سهرة أسود', name_fr: 'Robe de Soirée Noire', slug: 'robe-soiree-noire',
      category_id: 'cat-3',
      description_ar: 'فستان سهرة أنيق باللون الأسود مع تفاصيل من الكريستال. مثالي للمناسبات الخاصة والحفلات.',
      description_fr: 'Robe de soirée élégante en noir avec détails en cristal. Parfaite pour les occasions spéciales et les fêtes.',
      base_price: 18000, sale_price: null, is_featured: true, is_new_arrival: false, is_best_seller: false,
      stock_quantity: 12, status: 'active', views_count: 89,
      images: [
        { image_url: 'https://placehold.co/600x800/1a1a2e/ffffff?text=Robe+Soiree', is_primary: true },
      ],
      variants: [
        { size: 'S', color_name_fr: 'Noir', color_name_ar: 'أسود', color_hex: '#1a1a2e', stock_quantity: 3 },
        { size: 'M', color_name_fr: 'Noir', color_name_ar: 'أسود', color_hex: '#1a1a2e', stock_quantity: 4 },
        { size: 'L', color_name_fr: 'Noir', color_name_ar: 'أسود', color_hex: '#1a1a2e', stock_quantity: 3 },
        { size: 'XL', color_name_fr: 'Noir', color_name_ar: 'أسود', color_hex: '#1a1a2e', stock_quantity: 2 },
      ],
    },
    {
      id: 'prod-4', name_ar: 'بوركيني بريميوم أسود', name_fr: 'Burkini Premium Noir', slug: 'burkini-premium-noir',
      category_id: 'cat-4',
      description_ar: 'بوركيني عالي الجودة بقماش سريع الجفاف ومقاوم للكلور. تصميم رياضي أنيق مع حماية من الأشعة فوق البنفسجية.',
      description_fr: 'Burkini de haute qualité en tissu à séchage rapide et résistant au chlore. Design sportif élégant avec protection UV.',
      base_price: 8500, sale_price: null, is_featured: false, is_new_arrival: true, is_best_seller: true,
      stock_quantity: 20, status: 'active', views_count: 198,
      images: [
        { image_url: 'https://placehold.co/600x800/2d3436/ffffff?text=Burkini+Noir', is_primary: true },
      ],
      variants: [
        { size: 'S', color_name_fr: 'Noir', color_name_ar: 'أسود', color_hex: '#2d3436', stock_quantity: 5 },
        { size: 'M', color_name_fr: 'Noir', color_name_ar: 'أسود', color_hex: '#2d3436', stock_quantity: 5 },
        { size: 'L', color_name_fr: 'Noir', color_name_ar: 'أسود', color_hex: '#2d3436', stock_quantity: 5 },
        { size: 'XL', color_name_fr: 'Noir', color_name_ar: 'أسود', color_hex: '#2d3436', stock_quantity: 5 },
      ],
    },
    {
      id: 'prod-5', name_ar: 'بلوزة كاجوال وردية', name_fr: 'Blouse Casual Rose', slug: 'blouse-casual-rose',
      category_id: 'cat-5',
      description_ar: 'بلوزة كاجوال أنيقة من القطن الطبيعي 100%. مريحة للارتداء اليومي مع تصميم عصري.',
      description_fr: 'Blouse casual élégante en coton naturel 100%. Confortable pour le port quotidien avec un design moderne.',
      base_price: 4500, sale_price: 3800, is_featured: false, is_new_arrival: true, is_best_seller: false,
      stock_quantity: 15, status: 'active', views_count: 67,
      images: [
        { image_url: 'https://placehold.co/600x800/d4a5a5/ffffff?text=Blouse+Rose', is_primary: true },
      ],
      variants: [
        { size: 'S', color_name_fr: 'Rose', color_name_ar: 'وردي', color_hex: '#d4a5a5', stock_quantity: 5 },
        { size: 'M', color_name_fr: 'Rose', color_name_ar: 'وردي', color_hex: '#d4a5a5', stock_quantity: 5 },
        { size: 'L', color_name_fr: 'Rose', color_name_ar: 'وردي', color_hex: '#d4a5a5', stock_quantity: 5 },
      ],
    },
    {
      id: 'prod-6', name_ar: 'طقم إكسسوارات ذهبي', name_fr: 'Set Accessoires Doré', slug: 'set-accessoires-dore',
      category_id: 'cat-6',
      description_ar: 'طقم إكسسوارات مطلي بالذهب يتضمن عقد وأقراط وسوار. مثالي لإكمال إطلالة القفطان أو الكاراكو.',
      description_fr: 'Set d\'accessoires plaqué or comprenant collier, boucles d\'oreilles et bracelet. Parfait pour compléter un look caftan ou karakou.',
      base_price: 6000, sale_price: null, is_featured: true, is_new_arrival: false, is_best_seller: false,
      stock_quantity: 25, status: 'active', views_count: 45,
      images: [
        { image_url: 'https://placehold.co/600x800/c9a96e/ffffff?text=Set+Accessoires', is_primary: true },
      ],
      variants: [],
    },
    {
      id: 'prod-7', name_ar: 'قفطان مغربي فوشيا', name_fr: 'Caftan Marocain Fuchsia', slug: 'caftan-marocain-fuchsia',
      category_id: 'cat-1',
      description_ar: 'قفطان مغربي بلون الفوشيا مع حزام مطرز. قماش كريب دي شين فاخر مع تفاصيل راقية.',
      description_fr: 'Caftan marocain couleur fuchsia avec ceinture brodée. Tissu crêpe de Chine luxueux avec des détails raffinés.',
      base_price: 20000, sale_price: 17500, is_featured: false, is_new_arrival: true, is_best_seller: false,
      stock_quantity: 6, status: 'active', views_count: 112,
      images: [
        { image_url: 'https://placehold.co/600x800/d63384/ffffff?text=Caftan+Fuchsia', is_primary: true },
      ],
      variants: [
        { size: 'S', color_name_fr: 'Fuchsia', color_name_ar: 'فوشيا', color_hex: '#d63384', stock_quantity: 2 },
        { size: 'M', color_name_fr: 'Fuchsia', color_name_ar: 'فوشيا', color_hex: '#d63384', stock_quantity: 2 },
        { size: 'L', color_name_fr: 'Fuchsia', color_name_ar: 'فوشيا', color_hex: '#d63384', stock_quantity: 2 },
      ],
    },
    {
      id: 'prod-8', name_ar: 'بوركيني رياضي كحلي', name_fr: 'Burkini Sportif Marine', slug: 'burkini-sportif-marine',
      category_id: 'cat-4',
      description_ar: 'بوركيني بتصميم رياضي عصري باللون الكحلي. خفيف ومريح للسباحة مع حماية UV50+.',
      description_fr: 'Burkini au design sportif moderne en bleu marine. Léger et confortable pour la natation avec protection UV50+.',
      base_price: 7500, sale_price: null, is_featured: false, is_new_arrival: false, is_best_seller: true,
      stock_quantity: 18, status: 'active', views_count: 156,
      images: [
        { image_url: 'https://placehold.co/600x800/0d47a1/ffffff?text=Burkini+Marine', is_primary: true },
      ],
      variants: [
        { size: 'S', color_name_fr: 'Marine', color_name_ar: 'كحلي', color_hex: '#0d47a1', stock_quantity: 4 },
        { size: 'M', color_name_fr: 'Marine', color_name_ar: 'كحلي', color_hex: '#0d47a1', stock_quantity: 5 },
        { size: 'L', color_name_fr: 'Marine', color_name_ar: 'كحلي', color_hex: '#0d47a1', stock_quantity: 5 },
        { size: 'XL', color_name_fr: 'Marine', color_name_ar: 'كحلي', color_hex: '#0d47a1', stock_quantity: 4 },
      ],
    },
  ],

  homepage_sections: [
    {
      id: 'hs-1', section_type: 'hero_slide',
      title_ar: 'مجموعة الأناقة الجديدة', title_fr: 'Nouvelle Collection Élégance',
      subtitle_ar: 'اكتشفي أحدث تصاميم القفاطين والكاراكو', subtitle_fr: 'Découvrez les derniers designs de caftans et karakou',
      image_url: 'https://placehold.co/1920x800/8B1A2B/ffffff?text=Collection+Elegance',
      button_text_ar: 'تسوقي الآن', button_text_fr: 'Achetez Maintenant',
      link_url: 'category.html?slug=caftans', sort_order: 1,
    },
    {
      id: 'hs-2', section_type: 'hero_slide',
      title_ar: 'بوركيني صيف 2025', title_fr: 'Burkini Été 2025',
      subtitle_ar: 'تشكيلة جديدة من البوركيني العصري', subtitle_fr: 'Nouvelle collection de burkini moderne',
      image_url: 'https://placehold.co/1920x800/0d47a1/ffffff?text=Burkini+Collection',
      button_text_ar: 'اكتشفي المجموعة', button_text_fr: 'Découvrir la Collection',
      link_url: 'category.html?slug=burkinis', sort_order: 2,
    },
    {
      id: 'hs-3', section_type: 'hero_slide',
      title_ar: 'عروض خاصة', title_fr: 'Offres Spéciales',
      subtitle_ar: 'خصومات تصل إلى 30% على منتجات مختارة', subtitle_fr: 'Jusqu\'à 30% de réduction sur une sélection',
      image_url: 'https://placehold.co/1920x800/c9a96e/ffffff?text=Special+Offers',
      button_text_ar: 'تصفحي العروض', button_text_fr: 'Voir les Offres',
      link_url: 'category.html?slug=caftans', sort_order: 3,
    },
  ],

  // Demo orders for admin dashboard
  orders: [
    { id: 'ord-1', order_number: 1001, customer_name: 'سارة بن علي', customer_phone: '0550123456', wilaya: 'Annaba', commune: 'Sidi Amar', address: 'Rue principale', total_amount: 32000, status: 'new', created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
    { id: 'ord-2', order_number: 1002, customer_name: 'أمينة حداد', customer_phone: '0661234567', wilaya: 'Alger', commune: 'Bab El Oued', address: 'Cité 500 logements', total_amount: 15000, status: 'confirmed', created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
    { id: 'ord-3', order_number: 1003, customer_name: 'نور الهدى مراد', customer_phone: '0770345678', wilaya: 'Oran', commune: 'Bir El Djir', address: 'Lotissement El Yasmine', total_amount: 22000, status: 'shipped', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
    { id: 'ord-4', order_number: 1004, customer_name: 'فاطمة زهرة بوعلام', customer_phone: '0550987654', wilaya: 'Constantine', commune: 'El Khroub', address: 'Cité Daksi', total_amount: 8500, status: 'delivered', created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
    { id: 'ord-5', order_number: 1005, customer_name: 'ياسمين كريم', customer_phone: '0660112233', wilaya: 'Sétif', commune: 'Sétif', address: 'Centre ville', total_amount: 45000, status: 'preparing', created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
  ],
};
