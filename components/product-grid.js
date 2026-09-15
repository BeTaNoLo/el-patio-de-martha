function renderProductGrid(plantas, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = plantas.map(buildProductCard).join('');

  const addButtons = container.querySelectorAll('.add-to-cart');
  addButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productId = Number(button.dataset.productId);
      addToCart(productId);
    });
  });
}
