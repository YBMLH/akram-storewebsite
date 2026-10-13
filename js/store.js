// ============================================================
// Collection By Ibtissam — Data Store (Supabase + Demo Mode)
// Provides a unified API that works with or without Supabase
// ============================================================

class DataStore {
  constructor() {
    this.supabase = null;
    this.isDemo = STORE_CONFIG.demoMode;

    if (!this.isDemo) {
      // Initialize Supabase client
      // supabase-js must be loaded via CDN before this script
      if (typeof supabase !== 'undefined' && supabase.createClient) {
        this.supabase = supabase.createClient(
          STORE_CONFIG.supabase.url,
          STORE_CONFIG.supabase.anonKey
        );
      } else {
        console.warn('Supabase client not loaded, falling back to demo mode');
        this.isDemo = true;
      }
    }
  }

  // ---- Categories ----

  async getCategories() {
    if (this.isDemo) {
      return DEMO_DATA.categories.sort((a, b) => a.sort_order - b.sort_order);
    }
    const { data, error } = await this.supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    if (error) throw error;
    return data;
  }

  async getCategoryBySlug(slug) {
    if (this.isDemo) {
      return DEMO_DATA.categories.find(c => c.slug === slug) || null;
    }
    const { data, error } = await this.supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  // ---- Products ----

  async getProducts(filters = {}) {
    if (this.isDemo) {
      let products = [...DEMO_DATA.products];
      if (filters.category_id) products = products.filter(p => p.category_id === filters.category_id);
      if (filters.is_featured) products = products.filter(p => p.is_featured);
      if (filters.is_new_arrival) products = products.filter(p => p.is_new_arrival);
      if (filters.is_best_seller) products = products.filter(p => p.is_best_seller);
      if (filters.has_sale) products = products.filter(p => p.sale_price !== null);
      if (filters.search) {
        const q = filters.search.toLowerCase();
        products = products.filter(p =>
          p.name_fr.toLowerCase().includes(q) ||
          p.name_ar.includes(q)
        );
      }

      // Sorting
      switch (filters.sort) {
        case 'price_asc': products.sort((a, b) => (a.sale_price || a.base_price) - (b.sale_price || b.base_price)); break;
        case 'price_desc': products.sort((a, b) => (b.sale_price || b.base_price) - (a.sale_price || a.base_price)); break;
        case 'popular': products.sort((a, b) => b.views_count - a.views_count); break;
        default: break; // newest first (default order)
      }

      if (filters.limit) products = products.slice(0, filters.limit);
      return products;
    }

    let query = this.supabase
      .from('products')
      .select(`
        *,
        category:categories(name_ar, name_fr, slug),
        images:product_images(id, image_url, is_primary, sort_order),
        variants:product_variants(id, size, color_name_ar, color_name_fr, color_hex, stock_quantity, price_adjustment, is_active)
      `)
      .eq('status', 'active');

    if (filters.category_id) query = query.eq('category_id', filters.category_id);
    if (filters.is_featured) query = query.eq('is_featured', true);
    if (filters.is_new_arrival) query = query.eq('is_new_arrival', true);
    if (filters.is_best_seller) query = query.eq('is_best_seller', true);
    if (filters.has_sale) query = query.not('sale_price', 'is', null);
    if (filters.search) query = query.or(`name_fr.ilike.%${filters.search}%,name_ar.ilike.%${filters.search}%`);

    switch (filters.sort) {
      case 'price_asc': query = query.order('base_price', { ascending: true }); break;
      case 'price_desc': query = query.order('base_price', { ascending: false }); break;
      case 'popular': query = query.order('views_count', { ascending: false }); break;
      default: query = query.order('created_at', { ascending: false });
    }

    if (filters.limit) query = query.limit(filters.limit);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async getProductBySlug(slug) {
    if (this.isDemo) {
      const product = DEMO_DATA.products.find(p => p.slug === slug);
      return product || null;
    }

    const { data, error } = await this.supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name_ar, name_fr, slug),
        images:product_images(id, image_url, alt_text_ar, alt_text_fr, is_primary, sort_order),
        variants:product_variants(id, size, color_name_ar, color_name_fr, color_hex, stock_quantity, price_adjustment, is_active)
      `)
      .eq('slug', slug)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async incrementViews(productId) {
    if (this.isDemo) return;
    await this.supabase.rpc('increment_views', { product_uuid: productId });
  }

  // ---- Homepage Sections ----

  async getHomepageSections() {
    if (this.isDemo) {
      return DEMO_DATA.homepage_sections.sort((a, b) => a.sort_order - b.sort_order);
    }
    const { data, error } = await this.supabase
      .from('homepage_sections')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    if (error) throw error;
    return data;
  }

  // ---- Orders ----

  async createOrder(orderData) {
    if (this.isDemo) {
      const maxNo = DEMO_DATA.orders.reduce((m, o) => Math.max(m, o.order_number || 0), 1000);
      const order = {
        id: 'demo-order-' + Date.now(),
        order_number: maxNo + 1,
        status: 'new',
        created_at: new Date().toISOString(),
        ...orderData,
      };
      DEMO_DATA.orders.unshift(order);
      return order;
    }

    // Insert order
    const { data: order, error: orderError } = await this.supabase
      .from('orders')
      .insert({
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone,
        wilaya: orderData.wilaya,
        commune: orderData.commune,
        address: orderData.address,
        notes: orderData.notes,
        subtotal: orderData.subtotal,
        shipping_cost: orderData.shipping_cost || 0,
        total_amount: orderData.total_amount,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Insert order items
    const items = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id || null,
      product_name_ar: item.product_name_ar,
      product_name_fr: item.product_name_fr,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      unit_price: item.unit_price,
      image_url: item.image_url,
    }));

    const { error: itemsError } = await this.supabase
      .from('order_items')
      .insert(items);

    if (itemsError) throw itemsError;

    return order;
  }

  // ---- Admin: Orders ----

  async getOrders(filters = {}) {
    if (this.isDemo) {
      let orders = [...DEMO_DATA.orders];
      if (filters.status) orders = orders.filter(o => o.status === filters.status);
      return orders;
    }

    let query = this.supabase
      .from('orders')
      .select('*, items:order_items(*)')
      .order('created_at', { ascending: false });

    if (filters.status) query = query.eq('status', filters.status);
    if (filters.limit) query = query.limit(filters.limit);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async updateOrderStatus(orderId, status) {
    if (this.isDemo) {
      const o = DEMO_DATA.orders.find(x => x.id === orderId);
      if (o) o.status = status;
      return o || { id: orderId, status };
    }
    const { data, error } = await this.supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateOrderNotes(orderId, notes) {
    if (this.isDemo) {
      const o = DEMO_DATA.orders.find(x => x.id === orderId);
      if (o) o.notes = notes;
      return o;
    }
    const { data, error } = await this.supabase
      .from('orders').update({ notes }).eq('id', orderId).select().single();
    if (error) throw error;
    return data;
  }

  async deleteOrder(orderId) {
    if (this.isDemo) {
      const i = DEMO_DATA.orders.findIndex(x => x.id === orderId);
      if (i >= 0) DEMO_DATA.orders.splice(i, 1);
      return true;
    }
    const { error } = await this.supabase.from('orders').delete().eq('id', orderId);
    if (error) throw error;
    return true;
  }

  // ---- Admin: Product CRUD ----

  // Split a product payload into (scalar columns, images[], variants[])
  // so we can write each to its proper table. Keeps the admin API simple.
  _splitProductPayload(payload) {
    const { images = [], variants = [], ...scalars } = payload || {};
    return { scalars, images, variants };
  }

  async _writeProductChildren(productId, images, variants) {
    // Replace images: wipe existing then insert new (if any)
    await this.supabase.from('product_images').delete().eq('product_id', productId);
    if (images.length) {
      const imgRows = images.map((im, i) => ({
        product_id: productId,
        image_url: im.image_url,
        is_primary: im.is_primary ?? (i === 0),
        sort_order: im.sort_order ?? i,
        alt_text_fr: im.alt_text_fr || null,
        alt_text_ar: im.alt_text_ar || null,
      }));
      const { error: imgErr } = await this.supabase.from('product_images').insert(imgRows);
      if (imgErr) throw imgErr;
    }

    // Replace variants: wipe existing then insert new (if any)
    await this.supabase.from('product_variants').delete().eq('product_id', productId);
    if (variants.length) {
      const varRows = variants.map(v => ({
        product_id: productId,
        size: v.size || null,
        color_name_fr: v.color_name_fr || null,
        color_name_ar: v.color_name_ar || null,
        color_hex: v.color_hex || null,
        stock_quantity: v.stock_quantity ?? 0,
        price_adjustment: v.price_adjustment ?? 0, // used as absolute price override when > 0
        sku: v.sku || null,
        is_active: v.is_active !== false,
      }));
      const { error: varErr } = await this.supabase.from('product_variants').insert(varRows);
      if (varErr) throw varErr;
    }
  }

  async createProduct(productData) {
    if (this.isDemo) {
      const p = {
        id: 'demo-' + Date.now(),
        views_count: 0,
        stock_quantity: 0,
        images: productData.images || [],
        variants: productData.variants || [],
        ...productData,
      };
      DEMO_DATA.products.unshift(p);
      return p;
    }
    const { scalars, images, variants } = this._splitProductPayload(productData);
    const { data, error } = await this.supabase
      .from('products')
      .insert(scalars)
      .select()
      .single();
    if (error) throw error;
    await this._writeProductChildren(data.id, images, variants);
    return data;
  }

  async updateProduct(id, productData) {
    if (this.isDemo) {
      const idx = DEMO_DATA.products.findIndex(p => p.id === id);
      if (idx >= 0) DEMO_DATA.products[idx] = { ...DEMO_DATA.products[idx], ...productData };
      return DEMO_DATA.products[idx];
    }
    const { scalars, images, variants } = this._splitProductPayload(productData);
    // If the caller passed images/variants arrays, replace children.
    // If they didn't pass them at all (e.g. bulk status update), skip the replace.
    const hasImagesChange = Array.isArray(productData.images);
    const hasVariantsChange = Array.isArray(productData.variants);

    const { data, error } = await this.supabase
      .from('products')
      .update(scalars)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;

    if (hasImagesChange || hasVariantsChange) {
      // Only replace the children arrays that were actually sent
      if (hasImagesChange) {
        await this.supabase.from('product_images').delete().eq('product_id', id);
        if (images.length) {
          const imgRows = images.map((im, i) => ({
            product_id: id,
            image_url: im.image_url,
            is_primary: im.is_primary ?? (i === 0),
            sort_order: im.sort_order ?? i,
          }));
          const { error: e } = await this.supabase.from('product_images').insert(imgRows);
          if (e) throw e;
        }
      }
      if (hasVariantsChange) {
        await this.supabase.from('product_variants').delete().eq('product_id', id);
        if (variants.length) {
          const varRows = variants.map(v => ({
            product_id: id,
            size: v.size || null,
            color_name_fr: v.color_name_fr || null,
            color_name_ar: v.color_name_ar || null,
            color_hex: v.color_hex || null,
            stock_quantity: v.stock_quantity ?? 0,
            price_adjustment: v.price_adjustment ?? 0,
            is_active: v.is_active !== false,
          }));
          const { error: e } = await this.supabase.from('product_variants').insert(varRows);
          if (e) throw e;
        }
      }
    }
    return data;
  }

  async deleteProduct(id) {
    if (this.isDemo) {
      DEMO_DATA.products = DEMO_DATA.products.filter(p => p.id !== id);
      return true;
    }
    const { error } = await this.supabase
      .from('products')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  // ---- Admin: Auth ----

  async signIn(email, password) {
    if (this.isDemo) {
      // Demo login: any credentials work
      return { user: { email }, session: { access_token: 'demo' } };
    }
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async signOut() {
    if (this.isDemo) return;
    await this.supabase.auth.signOut();
  }

  async getSession() {
    if (this.isDemo) {
      const isLoggedIn = sessionStorage.getItem('akram_admin_demo') === 'true';
      return isLoggedIn ? { user: { email: 'admin@demo.com' } } : null;
    }
    const { data } = await this.supabase.auth.getSession();
    return data.session;
  }

  // ---- Admin: Dashboard stats ----

  async getDashboardStats() {
    if (this.isDemo) {
      return {
        todayOrders: 3,
        monthlySales: 122500,
        totalProducts: DEMO_DATA.products.length,
        lowStockCount: 2,
      };
    }

    const today = new Date().toISOString().split('T')[0];
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

    const [ordersToday, ordersMonth, products, lowStock] = await Promise.all([
      this.supabase.from('orders').select('id', { count: 'exact' }).gte('created_at', today),
      this.supabase.from('orders').select('total_amount').gte('created_at', monthStart).not('status', 'eq', 'cancelled'),
      this.supabase.from('products').select('id', { count: 'exact' }).eq('status', 'active'),
      this.supabase.from('products').select('id', { count: 'exact' }).eq('status', 'active').lte('stock_quantity', 5),
    ]);

    return {
      todayOrders: ordersToday.count || 0,
      monthlySales: (ordersMonth.data || []).reduce((sum, o) => sum + Number(o.total_amount), 0),
      totalProducts: products.count || 0,
      lowStockCount: lowStock.count || 0,
    };
  }

  // ---- Customers ----

  async getCustomers() {
    if (this.isDemo) {
      return DEMO_DATA.orders.map(o => ({
        id: o.id,
        name: o.customer_name,
        phone: o.customer_phone,
        wilaya: o.wilaya,
        total_orders: 1,
        total_spent: o.total_amount,
      }));
    }
    const { data, error } = await this.supabase
      .from('customers')
      .select('*')
      .order('total_spent', { ascending: false });
    if (error) throw error;
    return data;
  }

  // ---- Site Settings ----

  async getSetting(key) {
    if (this.isDemo) {
      const stored = this._readLocalSettings();
      if (stored[key] !== undefined) return stored[key];
      const defaults = {
        store_name: STORE_CONFIG.store.name,
        whatsapp_number: STORE_CONFIG.whatsappNumber,
        store_phone: STORE_CONFIG.store.phone,
        store_address: STORE_CONFIG.store.address,
        currency: STORE_CONFIG.store.currency,
        instagram: STORE_CONFIG.store.instagram,
        facebook: STORE_CONFIG.store.facebook,
      };
      return defaults[key] !== undefined ? defaults[key] : null;
    }
    const { data, error } = await this.supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single();
    if (error) return null;
    return data.value;
  }

  async setSetting(key, value) {
    if (this.isDemo) {
      const stored = this._readLocalSettings();
      stored[key] = value;
      localStorage.setItem('cbi_settings', JSON.stringify(stored));
      return { key, value };
    }
    const { data, error } = await this.supabase
      .from('site_settings')
      .upsert({ key, value }, { onConflict: 'key' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  _readLocalSettings() {
    try { return JSON.parse(localStorage.getItem('cbi_settings')) || {}; }
    catch { return {}; }
  }

  // ---- Media Upload ----

  async uploadImage(file, folder = 'uploads') {
    if (!file) throw new Error('No file provided');
    if (!file.type || !file.type.startsWith('image/')) throw new Error('File is not an image');

    if (this.isDemo || !this.supabase) {
      // Demo: return a base64 data URL (works for previews but doesn't persist)
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
    }

    // Downscale + re-encode as WebP (max 1600px long edge) before upload.
    // Keeps the original for non-raster types (SVG, GIF).
    let toUpload = file;
    let finalExt = (file.name || '').split('.').pop() || 'jpg';
    let finalType = file.type;
    const skipResize = /svg|gif/i.test(file.type);
    if (!skipResize) {
      try {
        const resized = await resizeImage(file, 1600, 0.82);
        if (resized) {
          toUpload = resized;
          finalExt = 'webp';
          finalType = 'image/webp';
        }
      } catch (e) {
        console.warn('[store] image resize failed, uploading original:', e);
      }
    }

    const safeName = ((file.name || 'image').replace(/[^a-zA-Z0-9._-]/g, '_'));
    const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${finalExt}`;

    const { error: upErr } = await this.supabase.storage
      .from('media')
      .upload(path, toUpload, { cacheControl: '31536000', contentType: finalType });
    if (upErr) throw upErr;

    const { data: urlData } = this.supabase.storage.from('media').getPublicUrl(path);

    // Index in the media table (best-effort — don't fail upload if this fails)
    try {
      await this.supabase.from('media').insert({
        file_name: safeName,
        file_url: urlData.publicUrl,
        file_size: file.size,
        mime_type: file.type,
        folder,
      });
    } catch (e) {
      console.warn('[store] media index insert failed:', e);
    }

    return urlData.publicUrl;
  }

  async listMedia(folder = null) {
    if (this.isDemo || !this.supabase) return [];
    let q = this.supabase.from('media').select('*').order('created_at', { ascending: false });
    if (folder) q = q.eq('folder', folder);
    const { data, error } = await q;
    if (error) throw error;
    return data || [];
  }

  async deleteMedia(id, fileUrl) {
    if (this.isDemo || !this.supabase) return true;
    // Extract path from public URL (…/storage/v1/object/public/media/<path>)
    const match = fileUrl && fileUrl.match(/\/storage\/v1\/object\/public\/media\/(.+)$/);
    if (match) {
      await this.supabase.storage.from('media').remove([decodeURIComponent(match[1])]);
    }
    await this.supabase.from('media').delete().eq('id', id);
    return true;
  }

  // ---- Homepage Section CRUD ----

  async createHomepageSection(data) {
    if (this.isDemo) {
      const s = { id: 'hs-' + Date.now(), is_active: true, sort_order: DEMO_DATA.homepage_sections.length + 1, ...data };
      DEMO_DATA.homepage_sections.push(s);
      return s;
    }
    const { data: row, error } = await this.supabase
      .from('homepage_sections').insert(data).select().single();
    if (error) throw error;
    return row;
  }

  async updateHomepageSection(id, data) {
    if (this.isDemo) {
      const idx = DEMO_DATA.homepage_sections.findIndex(s => s.id === id);
      if (idx >= 0) DEMO_DATA.homepage_sections[idx] = { ...DEMO_DATA.homepage_sections[idx], ...data };
      return DEMO_DATA.homepage_sections[idx];
    }
    const { data: row, error } = await this.supabase
      .from('homepage_sections').update(data).eq('id', id).select().single();
    if (error) throw error;
    return row;
  }

  async deleteHomepageSection(id) {
    if (this.isDemo) {
      DEMO_DATA.homepage_sections = DEMO_DATA.homepage_sections.filter(s => s.id !== id);
      return true;
    }
    const { error } = await this.supabase.from('homepage_sections').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // ---- Admin: Category CRUD ----

  async createCategory(data) {
    if (this.isDemo) {
      const cat = { id: 'cat-' + Date.now(), sort_order: DEMO_DATA.categories.length + 1, ...data };
      DEMO_DATA.categories.push(cat);
      return cat;
    }
    const { data: row, error } = await this.supabase
      .from('categories').insert(data).select().single();
    if (error) throw error;
    return row;
  }

  async updateCategory(id, data) {
    if (this.isDemo) {
      const idx = DEMO_DATA.categories.findIndex(c => c.id === id);
      if (idx >= 0) DEMO_DATA.categories[idx] = { ...DEMO_DATA.categories[idx], ...data };
      return DEMO_DATA.categories[idx];
    }
    const { data: row, error } = await this.supabase
      .from('categories').update(data).eq('id', id).select().single();
    if (error) throw error;
    return row;
  }

  async deleteCategory(id) {
    if (this.isDemo) {
      DEMO_DATA.categories = DEMO_DATA.categories.filter(c => c.id !== id);
      return true;
    }
    const { error } = await this.supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // ---- Analytics ----

  async getAnalytics(days = 30) {
    const orders = await this.getOrders();
    const now = new Date();
    const from = new Date(now.getTime() - days * 86400000);

    const inRange = orders.filter(o => new Date(o.created_at) >= from && o.status !== 'cancelled');

    // Daily sales series
    const byDay = {};
    for (let i = 0; i < days; i++) {
      const d = new Date(now.getTime() - (days - 1 - i) * 86400000);
      const key = d.toISOString().slice(0, 10);
      byDay[key] = { date: key, sales: 0, orders: 0 };
    }
    inRange.forEach(o => {
      const key = new Date(o.created_at).toISOString().slice(0, 10);
      if (byDay[key]) {
        byDay[key].sales += Number(o.total_amount || 0);
        byDay[key].orders += 1;
      }
    });

    // Orders by wilaya
    const byWilaya = {};
    inRange.forEach(o => {
      byWilaya[o.wilaya] = (byWilaya[o.wilaya] || 0) + 1;
    });
    const wilayaList = Object.entries(byWilaya)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([wilaya, count]) => ({ wilaya, count }));

    // Orders by status
    const byStatus = {};
    orders.forEach(o => { byStatus[o.status] = (byStatus[o.status] || 0) + 1; });

    // Top products by views
    const products = await this.getProducts({ sort: 'popular', limit: 5 });

    return {
      totalSales: inRange.reduce((s, o) => s + Number(o.total_amount || 0), 0),
      totalOrders: inRange.length,
      avgOrderValue: inRange.length ? Math.round(inRange.reduce((s, o) => s + Number(o.total_amount || 0), 0) / inRange.length) : 0,
      byDay: Object.values(byDay),
      byWilaya: wilayaList,
      byStatus,
      topProducts: products,
    };
  }
}

// Downscale a File/Blob to a max edge (long side) and encode as WebP.
// Returns a Blob or null if resize wasn't possible.
async function resizeImage(file, maxEdge = 1600, quality = 0.82) {
  if (!window.createImageBitmap && !window.Image) return null;
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = reject;
    i.src = URL.createObjectURL(file);
  });

  let { naturalWidth: w, naturalHeight: h } = img;
  if (!w || !h) { URL.revokeObjectURL(img.src); return null; }

  const scale = Math.min(1, maxEdge / Math.max(w, h));
  const outW = Math.round(w * scale);
  const outH = Math.round(h * scale);

  const canvas = document.createElement('canvas');
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, outW, outH);
  URL.revokeObjectURL(img.src);

  // Prefer WebP; fall back to JPEG if WebP encoder is unavailable.
  const blob = await new Promise(res => canvas.toBlob(res, 'image/webp', quality));
  if (blob && blob.size > 0) return blob;
  return await new Promise(res => canvas.toBlob(res, 'image/jpeg', quality));
}

// Global store instance
const store = new DataStore();
