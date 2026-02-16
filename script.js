const products = [
  { id: 1, name: 'Farm Fresh Tomato', category: 'Vegetables', weight: '500g', price: 38, oldPrice: 52, rating: 4.5, pop: 9, nutrition: 'Rich in Vitamin C & Lycopene', images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800', 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800', 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800'] },
  { id: 2, name: 'Alphonso Mango', category: 'Fruits', weight: '1kg', price: 149, oldPrice: 199, rating: 4.8, pop: 10, nutrition: 'Vitamin A & antioxidants', images: ['https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=800', 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800', 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800'] },
  { id: 3, name: 'Organic Milk', category: 'Dairy', weight: '1L', price: 64, oldPrice: 72, rating: 4.3, pop: 7, nutrition: 'Calcium and protein', images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800', 'https://images.unsplash.com/photo-1576186726580-a136ec6abfa0?w=800'] },
  { id: 4, name: 'Masala Chips', category: 'Snacks', weight: '200g', price: 45, oldPrice: 60, rating: 4.1, pop: 8, nutrition: 'Energy-rich potato snack', images: ['https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800', 'https://images.unsplash.com/photo-1510762470935-1f6ec5f4f9a4?w=800', 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800'] },
  { id: 5, name: 'Cold Coffee', category: 'Beverages', weight: '300ml', price: 70, oldPrice: 89, rating: 4.4, pop: 6, nutrition: 'Caffeine and calcium', images: ['https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800'] },
  { id: 6, name: 'Dishwash Liquid', category: 'Household', weight: '500ml', price: 99, oldPrice: 135, rating: 4.2, pop: 5, nutrition: 'Household cleaner', images: ['https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=800', 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800', 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800'] },
  { id: 7, name: 'Spinach Bunch', category: 'Vegetables', weight: '250g', price: 30, oldPrice: 38, rating: 4.1, pop: 7, nutrition: 'Iron and folate', images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800', 'https://images.unsplash.com/photo-1557844352-761f2565b576?w=800', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800'] },
  { id: 8, name: 'Banana Robusta', category: 'Fruits', weight: '6 pcs', price: 45, oldPrice: 55, rating: 4.0, pop: 8, nutrition: 'Potassium and fiber', images: ['https://images.unsplash.com/photo-1574226516831-e1dff420e37f?w=800', 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800', 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800'] }
];

const rupee = n => `₹${n.toFixed(0)}`;
const getCart = () => JSON.parse(localStorage.getItem('freshkart-cart') || '{}');
const setCart = c => localStorage.setItem('freshkart-cart', JSON.stringify(c));
const getQty = () => Object.values(getCart()).reduce((a, b) => a + b, 0);
const byId = id => products.find(p => p.id === id);

function showToast(text) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => t.classList.remove('show'), 1800);
}

function updateCartCount() {
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = getQty());
}

function addToCart(id, qty = 1) {
  const c = getCart();
  c[id] = (c[id] || 0) + qty;
  setCart(c);
  updateCartCount();
  showToast('Added to cart');
}

function productCard(p) {
  const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
  return `<article class="product-card" aria-label="${p.name}">
    <span class="badge">${discount}% OFF</span>
    <a href="product-details.html?id=${p.id}"><img loading="lazy" src="${p.images[0]}" alt="${p.name}"/></a>
    <div class="product-content">
      <strong>${p.name}</strong>
      <span class="muted">${p.weight} • ${p.rating}★</span>
      <div class="price-row"><strong>${rupee(p.price)}</strong><small class="muted"><s>${rupee(p.oldPrice)}</s></small></div>
      <button class="btn btn-primary add-btn" data-id="${p.id}">Add to Cart</button>
    </div>
  </article>`;
}

function bindAddButtons(scope = document) {
  scope.querySelectorAll('.add-btn').forEach(btn => {
    btn.onclick = () => addToCart(Number(btn.dataset.id));
  });
}

function renderHome() {
  const wrap = document.getElementById('featuredProducts');
  if (!wrap) return;
  wrap.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';
  setTimeout(() => {
    wrap.classList.remove('skeleton-grid');
    wrap.innerHTML = products.slice(0, 4).map(productCard).join('');
    bindAddButtons(wrap);
  }, 650);
}

function renderListing() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  const cat = document.getElementById('categoryFilter');
  const price = document.getElementById('priceFilter');
  const priceValue = document.getElementById('priceValue');
  const rating = document.getElementById('ratingFilter');
  const sort = document.getElementById('sortSelect');

  function draw() {
    priceValue.textContent = price.value;
    let list = products.filter(p =>
      (cat.value === 'all' || p.category === cat.value) &&
      p.price <= Number(price.value) &&
      p.rating >= Number(rating.value)
    );
    if (sort.value === 'low') list.sort((a, b) => a.price - b.price);
    if (sort.value === 'high') list.sort((a, b) => b.price - a.price);
    if (sort.value === 'popular') list.sort((a, b) => b.pop - a.pop);

    grid.innerHTML = list.map(productCard).join('') || '<p>No products match the filter.</p>';
    bindAddButtons(grid);
  }

  [cat, price, rating, sort].forEach(i => i.addEventListener('input', draw));
  draw();
}

function renderProductDetails() {
  const wrap = document.getElementById('productDetailWrap');
  if (!wrap) return;
  const id = Number(new URLSearchParams(location.search).get('id') || 1);
  const p = byId(id) || products[0];

  wrap.innerHTML = `<section class="product-details">
    <div class="gallery-main">
      <img id="mainImg" src="${p.images[0]}" alt="${p.name}">
      <div class="thumb-row">${p.images.map((img, i) => `<img class="${i === 0 ? 'active' : ''}" src="${img}" data-img="${img}" alt="thumb ${i+1}">`).join('')}</div>
    </div>
    <article class="card">
      <p class="eyebrow">${p.category}</p>
      <h1>${p.name}</h1>
      <p class="muted">${p.weight} • ${p.rating}★</p>
      <h2>${rupee(p.price)} <small class="muted"><s>${rupee(p.oldPrice)}</s></small></h2>
      <p>${p.name} is sourced directly from trusted farms and quality-checked for freshness.</p>
      <p><strong>Nutrition:</strong> ${p.nutrition}</p>
      <div class="hero-actions">
        <div class="qty-wrap"><button id="decQty">-</button><input id="qtyInput" value="1" /><button id="incQty">+</button></div>
        <button id="detailAdd" class="btn btn-primary">Add to Cart</button>
      </div>
    </article>
  </section>`;

  const mainImg = document.getElementById('mainImg');
  wrap.querySelectorAll('.thumb-row img').forEach(img => img.onclick = () => {
    wrap.querySelectorAll('.thumb-row img').forEach(i => i.classList.remove('active'));
    img.classList.add('active');
    mainImg.src = img.dataset.img;
  });

  const qtyInput = document.getElementById('qtyInput');
  document.getElementById('incQty').onclick = () => qtyInput.value = Number(qtyInput.value || 1) + 1;
  document.getElementById('decQty').onclick = () => qtyInput.value = Math.max(1, Number(qtyInput.value || 1) - 1);
  document.getElementById('detailAdd').onclick = () => addToCart(p.id, Math.max(1, Number(qtyInput.value || 1)));

  const related = document.getElementById('relatedProducts');
  related.innerHTML = products.filter(x => x.id !== p.id).slice(0, 4).map(productCard).join('');
  bindAddButtons(related);
}

function renderCart() {
  const itemsWrap = document.getElementById('cartItems');
  const breakdown = document.getElementById('priceBreakdown');
  if (!itemsWrap || !breakdown) return;
  const cart = getCart();
  const lines = Object.entries(cart).map(([id, qty]) => ({ product: byId(Number(id)), qty })).filter(x => x.product);
  if (!lines.length) {
    itemsWrap.innerHTML = '<p>Your cart is empty. <a href="products.html">Start shopping</a>.</p>';
    breakdown.innerHTML = 'Subtotal: ₹0';
    return;
  }

  itemsWrap.innerHTML = lines.map(({ product, qty }) => `<article class="cart-item">
      <img src="${product.images[0]}" alt="${product.name}">
      <div><strong>${product.name}</strong><p class="muted">${product.weight}</p><strong>${rupee(product.price)}</strong></div>
      <div>
        <div class="qty-wrap"><button class="qty-btn" data-id="${product.id}" data-delta="-1">-</button><input value="${qty}" readonly><button class="qty-btn" data-id="${product.id}" data-delta="1">+</button></div>
        <button class="link-btn remove-btn" data-id="${product.id}">Remove</button>
      </div>
    </article>`).join('');

  itemsWrap.querySelectorAll('.qty-btn').forEach(btn => btn.onclick = () => {
    const id = btn.dataset.id, delta = Number(btn.dataset.delta);
    cart[id] = Math.max(0, (cart[id] || 0) + delta);
    if (cart[id] === 0) delete cart[id];
    setCart(cart); renderCart(); updateCartCount();
  });
  itemsWrap.querySelectorAll('.remove-btn').forEach(btn => btn.onclick = () => {
    delete cart[btn.dataset.id]; setCart(cart); renderCart(); updateCartCount();
  });

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const delivery = subtotal > 499 ? 0 : 39;
  const discount = subtotal > 999 ? 150 : 0;
  const total = subtotal + delivery - discount;
  breakdown.innerHTML = `
    <p>Subtotal: <strong>${rupee(subtotal)}</strong></p>
    <p>Delivery: <strong>${delivery ? rupee(delivery) : 'FREE'}</strong></p>
    <p>Discount: <strong>- ${rupee(discount)}</strong></p>
    <hr><p>Total: <strong>${rupee(total)}</strong></p>
  `;
}

function renderCheckout() {
  const summary = document.getElementById('checkoutSummary');
  if (!summary) return;
  const cart = getCart();
  const lines = Object.entries(cart).map(([id, qty]) => ({ product: byId(Number(id)), qty })).filter(x => x.product);
  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  summary.innerHTML = lines.map(l => `<p>${l.product.name} x ${l.qty} <strong>${rupee(l.product.price * l.qty)}</strong></p>`).join('') || '<p>No items in cart.</p>';
  summary.innerHTML += `<hr><p>Total: <strong>${rupee(subtotal)}</strong></p>`;

  const form = document.getElementById('checkoutForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Order placed successfully!');
    localStorage.removeItem('freshkart-cart');
    setTimeout(() => (location.href = 'index.html'), 900);
  });
}

function setupTheme() {
  const saved = localStorage.getItem('freshkart-theme');
  if (saved === 'dark') document.body.classList.add('dark');
  const t = document.getElementById('themeToggle');
  t?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('freshkart-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
}

function setupAuthModal() {
  const modal = document.getElementById('authModal');
  document.getElementById('authOpen')?.addEventListener('click', () => modal?.showModal());
  document.getElementById('authClose')?.addEventListener('click', () => modal?.close());
}

updateCartCount();
setupTheme();
setupAuthModal();
renderHome();
renderListing();
renderProductDetails();
renderCart();
renderCheckout();
