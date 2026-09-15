const CART_STORAGE_KEY = 'el-patio-de-martha-cart';

function getCart() {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Error leyendo carrito desde localStorage:', error);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function getCartCount() {
  return getCart().reduce((total, item) => total + item.cantidad, 0);
}

function updateCartBadge() {
  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) {
    cartCountEl.textContent = String(getCartCount());
  }
}

function addToCart(productId) {
  const product = catalogoProductos.find((item) => item.id === Number(productId));
  if (!product) return;

  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    const nextQuantity = existingItem.cantidad + 1;
    if (nextQuantity > product.stock) {
      alert(`Solo quedan ${product.stock} unidades disponibles de ${product.nombre}.`);
      return;
    }
    existingItem.cantidad = nextQuantity;
  } else {
    if (product.stock <= 0 || !product.disponible) {
      alert(`${product.nombre} está agotada en este momento.`);
      return;
    }

    cart.push({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      cantidad: 1,
      stock: product.stock,
    });
  }

  saveCart(cart);
  updateCartBadge();
  alert(`${product.nombre} añadido al carrito.`);
}

function updateCartItem(productId, quantity) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;

  const product = catalogoProductos.find((entry) => entry.id === productId);
  const maxAllowed = product ? product.stock : item.stock;

  const nextQty = Math.max(0, Number(quantity) || 0);
  if (nextQty > maxAllowed) {
    alert(`No puedes comprar más de ${maxAllowed} unidades de ${item.nombre}.`);
    return;
  }

  if (nextQty === 0) {
    const filtered = cart.filter((entry) => entry.id !== productId);
    saveCart(filtered);
    renderCart();
    updateCartBadge();
    return;
  }

  item.cantidad = nextQty;
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

function removeCartItem(productId) {
  const filtered = getCart().filter((item) => item.id !== productId);
  saveCart(filtered);
  renderCart();
  updateCartBadge();
}

function getCartSubtotal() {
  return getCart().reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('cart-subtotal');

  if (!cartContainer) return;

  const cart = getCart();
  if (!cart.length) {
    cartContainer.innerHTML = '<p class="empty-state">Tu carrito está vacío.</p>';
    if (subtotalEl) subtotalEl.textContent = '0 €';
    return;
  }

  const subtotal = getCartSubtotal();
  cartContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div class="cart-item__image">
            <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='https://placehold.co/250x250/edf2e9/5f7d5b?text=Planta';" />
          </div>
          <div class="cart-item__details">
            <h4>${item.nombre}</h4>
            <p>${item.precio} €</p>
            <div class="cart-item__controls">
              <input type="number" min="1" value="${item.cantidad}" data-cart-quantity="${item.id}" aria-label="Cantidad de ${item.nombre}" />
              <button type="button" class="link-button" data-remove-item="${item.id}">Eliminar</button>
            </div>
          </div>
        </div>
      `
    )
    .join('');

  if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)} €`;

  cartContainer.querySelectorAll('[data-cart-quantity]').forEach((input) => {
    input.addEventListener('change', (event) => {
      const productId = Number(event.target.dataset.cartQuantity);
      updateCartItem(productId, event.target.value);
    });
  });

  cartContainer.querySelectorAll('[data-remove-item]').forEach((button) => {
    button.addEventListener('click', () => {
      removeCartItem(Number(button.dataset.removeItem));
    });
  });
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items');
  const totalEl = document.getElementById('checkout-total');

  if (!container) return;

  const cart = getCart();
  if (!cart.length) {
    container.innerHTML = '<p class="empty-state">No hay productos en tu pedido.</p>';
    if (totalEl) totalEl.textContent = '0 €';
    return;
  }

  const subtotal = getCartSubtotal();
  container.innerHTML = cart
    .map(
      (item) => `
        <div class="checkout-item">
          <span>${item.nombre} x ${item.cantidad}</span>
          <strong>${(item.precio * item.cantidad).toFixed(2)} €</strong>
        </div>
      `
    )
    .join('');

  if (totalEl) totalEl.textContent = `${subtotal.toFixed(2)} €`;
}

window.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCart();
  renderCheckoutSummary();
});
