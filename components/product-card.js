function getAvailabilityState(plant) {
  if (!plant.disponible || plant.stock === 0) {
    return {
      label: 'Agotada',
      className: 'status status--out',
      available: false,
    };
  }

  if (plant.stock <= 3) {
    return {
      label: 'Pocas unidades',
      className: 'status status--low',
      available: true,
    };
  }

  return {
    label: 'Disponible',
    className: 'status status--available',
    available: true,
  };
}

function buildProductCard(plant) {
  const availability = getAvailabilityState(plant);

  return `
    <article class="product-card">
      <a href="producto.html?id=${plant.id}" class="product-card__image-link" aria-label="Ver detalles de ${plant.nombre}">
        <img src="${plant.imagen}" alt="${plant.nombre}" loading="lazy" onerror="this.src='https://placehold.co/600x700/edf2e9/5f7d5b?text=Planta';" />
      </a>
      <div class="product-card__body">
        <div class="product-card__meta">
          <span class="product-card__category">${plant.categoria}</span>
          <span class="${availability.className}">${availability.label}</span>
        </div>
        <h3>${plant.nombre}</h3>
        <div class="product-card__price-row">
          <strong>${plant.precio} €</strong>
          <span>Stock: ${plant.stock}</span>
        </div>
        <div class="product-card__actions">
          <a href="producto.html?id=${plant.id}" class="btn btn--secondary btn--small">Ver detalles</a>
          <button
            type="button"
            class="btn btn--primary btn--small add-to-cart"
            data-product-id="${plant.id}"
            ${!availability.available ? 'disabled' : ''}
          >
            ${availability.available ? 'Añadir' : 'Agotada'}
          </button>
        </div>
      </div>
    </article>
  `;
}
