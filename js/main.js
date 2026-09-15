document.addEventListener('DOMContentLoaded', () => {
  if (typeof updateCartBadge === 'function') {
    updateCartBadge();
  }

  if (typeof renderCart === 'function') {
    renderCart();
  }

  if (typeof renderCheckoutSummary === 'function') {
    renderCheckoutSummary();
  }

  const checkoutForm = document.getElementById('checkout-form');
  if (!checkoutForm) return;

  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const cart = getCart ? getCart() : [];
    if (!cart.length) {
      alert('Añade al menos una planta antes de confirmar el pedido.');
      return;
    }

    const formData = new FormData(checkoutForm);
    const orderData = Object.fromEntries(formData.entries());
    const orderPayload = {
      ...orderData,
      items: cart,
      total: getCartSubtotal ? getCartSubtotal() : 0,
    };

    localStorage.setItem('el-patio-de-martha-last-order', JSON.stringify(orderPayload));
    localStorage.removeItem('el-patio-de-martha-cart');

    alert('Pedido preparado para enviar. En la próxima etapa se conectará con la API/backend.');
    checkoutForm.reset();

    if (typeof updateCartBadge === 'function') {
      updateCartBadge();
    }

    if (typeof renderCart === 'function') {
      renderCart();
    }

    if (typeof renderCheckoutSummary === 'function') {
      renderCheckoutSummary();
    }
  });
});
