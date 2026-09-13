-- ============================================================
-- Akram Store — Sample Seed Data
-- Run after schema.sql to populate demo content
-- ============================================================

-- Categories
INSERT INTO categories (id, name_ar, name_fr, slug, description_ar, description_fr, sort_order) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'قفطان', 'Caftans', 'caftans', 'تشكيلة فاخرة من القفاطين التقليدية والعصرية', 'Collection luxueuse de caftans traditionnels et modernes', 1),
  ('c1000000-0000-0000-0000-000000000002', 'كاراكو', 'Karakou', 'karakou', 'كاراكو جزائري أصيل بتصاميم راقية', 'Karakou algérien authentique avec des designs élégants', 2),
  ('c1000000-0000-0000-0000-000000000003', 'فساتين سهرة', 'Robes de Soirée', 'soiree', 'فساتين سهرة أنيقة لجميع المناسبات', 'Robes de soirée élégantes pour toutes les occasions', 3),
  ('c1000000-0000-0000-0000-000000000004', 'بوركيني', 'Burkinis', 'burkinis', 'بوركيني عصري ومريح للشاطئ والمسبح', 'Burkini moderne et confortable pour la plage et la piscine', 4),
  ('c1000000-0000-0000-0000-000000000005', 'ملابس كاجوال', 'Casual Wear', 'casual', 'ملابس يومية أنيقة وعصرية', 'Vêtements quotidiens élégants et modernes', 5),
  ('c1000000-0000-0000-0000-000000000006', 'إكسسوارات', 'Accessoires', 'accessories', 'إكسسوارات مميزة تكمل إطلالتك', 'Accessoires distinctifs pour compléter votre look', 6);

-- Products
INSERT INTO products (id, name_ar, name_fr, slug, category_id, description_ar, description_fr, base_price, sale_price, is_featured, is_new_arrival, is_best_seller, stock_quantity, status) VALUES
  ('p1000000-0000-0000-0000-000000000001', 'قفطان رويال أزرق', 'Caftan Royal Bleu', 'caftan-royal-bleu', 'c1000000-0000-0000-0000-000000000001',
   'قفطان فاخر مصنوع من الحرير الطبيعي مع تطريز يدوي بخيوط ذهبية. تصميم أنيق يجمع بين الأصالة والحداثة.',
   'Caftan luxueux en soie naturelle avec broderie à la main en fils dorés. Design élégant alliant authenticité et modernité.',
   15000, NULL, TRUE, TRUE, FALSE, 8, 'active'),

  ('p1000000-0000-0000-0000-000000000002', 'كاراكو تقليدي ذهبي', 'Karakou Traditionnel Doré', 'karakou-traditionnel-dore', 'c1000000-0000-0000-0000-000000000002',
   'كاراكو جزائري تقليدي بالمجبود الذهبي مع سروال شلقة. عمل يدوي متقن.',
   'Karakou algérien traditionnel en medjboud doré avec seroual chelka. Travail artisanal minutieux.',
   25000, 22000, TRUE, FALSE, TRUE, 5, 'active'),

  ('p1000000-0000-0000-0000-000000000003', 'فستان سهرة أسود', 'Robe de Soirée Noire', 'robe-soiree-noire', 'c1000000-0000-0000-0000-000000000003',
   'فستان سهرة أنيق باللون الأسود مع تفاصيل من الكريستال. مثالي للمناسبات الخاصة.',
   'Robe de soirée élégante en noir avec détails en cristal. Parfaite pour les occasions spéciales.',
   18000, NULL, TRUE, FALSE, FALSE, 12, 'active'),

  ('p1000000-0000-0000-0000-000000000004', 'بوركيني بريميوم أسود', 'Burkini Premium Noir', 'burkini-premium-noir', 'c1000000-0000-0000-0000-000000000004',
   'بوركيني عالي الجودة بقماش سريع الجفاف ومقاوم للكلور. تصميم رياضي أنيق.',
   'Burkini de haute qualité en tissu à séchage rapide et résistant au chlore. Design sportif élégant.',
   8500, NULL, FALSE, TRUE, TRUE, 20, 'active'),

  ('p1000000-0000-0000-0000-000000000005', 'بلوزة كاجوال وردية', 'Blouse Casual Rose', 'blouse-casual-rose', 'c1000000-0000-0000-0000-000000000005',
   'بلوزة كاجوال أنيقة من القطن الطبيعي. مريحة للارتداء اليومي.',
   'Blouse casual élégante en coton naturel. Confortable pour le port quotidien.',
   4500, 3800, FALSE, TRUE, FALSE, 15, 'active'),

  ('p1000000-0000-0000-0000-000000000006', 'طقم إكسسوارات ذهبي', 'Set Accessoires Doré', 'set-accessoires-dore', 'c1000000-0000-0000-0000-000000000006',
   'طقم إكسسوارات مطلي بالذهب يتضمن عقد وأقراط وسوار. مثالي لإكمال إطلالة القفطان.',
   'Set d''accessoires plaqué or comprenant collier, boucles d''oreilles et bracelet. Parfait pour compléter un look caftan.',
   6000, NULL, TRUE, FALSE, FALSE, 25, 'active'),

  ('p1000000-0000-0000-0000-000000000007', 'قفطان مغربي فوشيا', 'Caftan Marocain Fuchsia', 'caftan-marocain-fuchsia', 'c1000000-0000-0000-0000-000000000001',
   'قفطان مغربي بلون الفوشيا مع حزام مطرز. قماش كريب دي شين فاخر.',
   'Caftan marocain couleur fuchsia avec ceinture brodée. Tissu crêpe de Chine luxueux.',
   20000, 17500, FALSE, TRUE, FALSE, 6, 'active'),

  ('p1000000-0000-0000-0000-000000000008', 'بوركيني رياضي كحلي', 'Burkini Sportif Marine', 'burkini-sportif-marine', 'c1000000-0000-0000-0000-000000000004',
   'بوركيني بتصميم رياضي عصري باللون الكحلي. خفيف ومريح للسباحة.',
   'Burkini au design sportif moderne en bleu marine. Léger et confortable pour la natation.',
   7500, NULL, FALSE, FALSE, TRUE, 18, 'active');

-- Product images (using placeholder URLs — replace with real Supabase storage URLs)
INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
  ('p1000000-0000-0000-0000-000000000001', 'https://placehold.co/600x800/1a365d/ffffff?text=Caftan+Royal+Bleu', TRUE, 1),
  ('p1000000-0000-0000-0000-000000000001', 'https://placehold.co/600x800/1a365d/ffffff?text=Caftan+Detail', FALSE, 2),
  ('p1000000-0000-0000-0000-000000000002', 'https://placehold.co/600x800/b7791f/ffffff?text=Karakou+Dore', TRUE, 1),
  ('p1000000-0000-0000-0000-000000000002', 'https://placehold.co/600x800/b7791f/ffffff?text=Karakou+Back', FALSE, 2),
  ('p1000000-0000-0000-0000-000000000003', 'https://placehold.co/600x800/1a1a2e/ffffff?text=Robe+Soiree', TRUE, 1),
  ('p1000000-0000-0000-0000-000000000004', 'https://placehold.co/600x800/2d3436/ffffff?text=Burkini+Noir', TRUE, 1),
  ('p1000000-0000-0000-0000-000000000005', 'https://placehold.co/600x800/d4a5a5/ffffff?text=Blouse+Rose', TRUE, 1),
  ('p1000000-0000-0000-0000-000000000006', 'https://placehold.co/600x800/c9a96e/ffffff?text=Set+Accessoires', TRUE, 1),
  ('p1000000-0000-0000-0000-000000000007', 'https://placehold.co/600x800/d63384/ffffff?text=Caftan+Fuchsia', TRUE, 1),
  ('p1000000-0000-0000-0000-000000000008', 'https://placehold.co/600x800/0d47a1/ffffff?text=Burkini+Marine', TRUE, 1);

-- Product variants
INSERT INTO product_variants (product_id, size, color_name_ar, color_name_fr, color_hex, stock_quantity) VALUES
  -- Caftan Royal Blue
  ('p1000000-0000-0000-0000-000000000001', 'S', 'أزرق ملكي', 'Bleu Royal', '#1a365d', 2),
  ('p1000000-0000-0000-0000-000000000001', 'M', 'أزرق ملكي', 'Bleu Royal', '#1a365d', 3),
  ('p1000000-0000-0000-0000-000000000001', 'L', 'أزرق ملكي', 'Bleu Royal', '#1a365d', 2),
  ('p1000000-0000-0000-0000-000000000001', 'XL', 'أزرق ملكي', 'Bleu Royal', '#1a365d', 1),
  -- Karakou
  ('p1000000-0000-0000-0000-000000000002', 'S', 'ذهبي', 'Doré', '#b7791f', 1),
  ('p1000000-0000-0000-0000-000000000002', 'M', 'ذهبي', 'Doré', '#b7791f', 2),
  ('p1000000-0000-0000-0000-000000000002', 'L', 'ذهبي', 'Doré', '#b7791f', 2),
  -- Burkini Noir
  ('p1000000-0000-0000-0000-000000000004', 'S', 'أسود', 'Noir', '#2d3436', 5),
  ('p1000000-0000-0000-0000-000000000004', 'M', 'أسود', 'Noir', '#2d3436', 5),
  ('p1000000-0000-0000-0000-000000000004', 'L', 'أسود', 'Noir', '#2d3436', 5),
  ('p1000000-0000-0000-0000-000000000004', 'XL', 'أسود', 'Noir', '#2d3436', 5),
  -- Blouse Rose
  ('p1000000-0000-0000-0000-000000000005', 'S', 'وردي', 'Rose', '#d4a5a5', 5),
  ('p1000000-0000-0000-0000-000000000005', 'M', 'وردي', 'Rose', '#d4a5a5', 5),
  ('p1000000-0000-0000-0000-000000000005', 'L', 'وردي', 'Rose', '#d4a5a5', 5);

-- Homepage sections
INSERT INTO homepage_sections (section_type, title_ar, title_fr, subtitle_ar, subtitle_fr, image_url, button_text_ar, button_text_fr, sort_order, is_active) VALUES
  ('hero_slide', 'مجموعة الأناقة الجديدة', 'Nouvelle Collection Élégance', 'اكتشفي أحدث تصاميم القفاطين والكاراكو', 'Découvrez les derniers designs de caftans et karakou', 'https://placehold.co/1920x800/8B1A2B/ffffff?text=Collection+Elegance', 'تسوقي الآن', 'Achetez Maintenant', 1, TRUE),
  ('hero_slide', 'بوركيني صيف 2025', 'Burkini Été 2025', 'تشكيلة جديدة من البوركيني العصري', 'Nouvelle collection de burkini moderne', 'https://placehold.co/1920x800/0d47a1/ffffff?text=Burkini+Collection', 'اكتشفي المجموعة', 'Découvrir la Collection', 2, TRUE),
  ('hero_slide', 'عروض خاصة', 'Offres Spéciales', 'خصومات تصل إلى 30% على منتجات مختارة', 'Jusqu''à 30% de réduction sur une sélection', 'https://placehold.co/1920x800/c9a96e/ffffff?text=Special+Offers', 'تصفحي العروض', 'Voir les Offres', 3, TRUE);
