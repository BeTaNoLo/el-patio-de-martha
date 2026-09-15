function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get('id'));
}

function renderProductoDetalle() {
  const productId = getProductIdFromUrl();
  const container = document.getElementById('producto-detalle');
  if (!container) return;

  fetch('data/plantas.json')
    .then((response) => response.json())
    .then((data) => {
      const product = data.find((item) => item.id === productId);
      if (!product) {
        container.innerHTML = '<p class="empty-state">No se encontró la planta solicitada.</p>';
        return;
      }

      const estado = !product.disponible || product.stock === 0 ? 'Agotada' : product.stock <= 3 ? 'Pocas unidades' : 'Disponible';
      const botonTexto = !product.disponible || product.stock === 0 ? 'Agotada' : 'Añadir al pedido';
      const botonDisabled = !product.disponible || product.stock === 0 ? 'disabled' : '';

      container.innerHTML = `
        <article class="product-detail__layout">
          <div class="product-detail__image-box">
            <img src="${product.imagen}" alt="${product.nombre}" onerror="this.src='https://placehold.co/900x1100/edf2e9/5f7d5b?text=Planta';" />
          </div>

          <div class="product-detail__content">
            <p class="eyebrow">${product.categoria}</p>
            <h1>${product.nombre}</h1>
            <p class="product-detail__price">${product.precio} €</p>
            <div class="product-detail__status-row">
              <span class="status ${product.stock === 0 ? 'status--out' : product.stock <= 3 ? 'status--low' : 'status--available'}">${estado}</span>
              <span>Stock: ${product.stock}</span>
            </div>
            <p>${product.descripcion}</p>

            <div class="product-detail__info">
              <div>
                <h3>Cuidados</h3>
                <ul>
                  ${product.cuidados.map((cuidad) => `<li>${cuidad}</li>`).join('')}
                </ul>
              </div>
            </div>

            <button
              type="button"
              class="btn btn--primary"
              data-product-id="${product.id}"
              ${botonDisabled}
            >
              ${botonTexto}
            </button>
          </div>
        </article>
      `;

      const button = container.querySelector('[data-product-id]');
      if (button) {
        button.addEventListener('click', () => {
          addToCart(Number(button.dataset.productId));
        });
      }
    })
    .catch((error) => {
      console.error('No se pudo cargar el producto:', error);
      container.innerHTML = '<p class="empty-state">No se pudo cargar la información del producto.</p>';
    });
}

window.addEventListener('DOMContentLoaded', () => {
  renderProductoDetalle();
});
