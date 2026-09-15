let catalogoProductos = [];

function fetchCatalogo() {
  fetch('data/plantas.json')
    .then((response) => response.json())
    .then((data) => {
      catalogoProductos = data;
      const catalogGrid = document.getElementById('catalog-grid');

      if (catalogGrid) {
        renderProductGrid(catalogoProductos, '#catalog-grid');
        bindCategoryFilters();
      }

      const featuredContainer = document.querySelector('[data-featured-products]');
      if (featuredContainer) {
        const featured = catalogoProductos.slice(0, 3);
        renderProductGrid(featured, '[data-featured-products]');
      }
    })
    .catch((error) => {
      console.error('No se pudo cargar el catálogo:', error);
      const catalogGrid = document.getElementById('catalog-grid');
      if (catalogGrid) {
        catalogGrid.innerHTML = '<p class="empty-state">No se pudo cargar el catálogo en este momento.</p>';
      }
    });
}

function bindCategoryFilters() {
  const filterButtons = document.querySelectorAll('[data-category-filter]');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.categoryFilter;

      filterButtons.forEach((btn) => btn.classList.toggle('is-active', btn === button));

      const filtered =
        selected === 'todos'
          ? catalogoProductos
          : catalogoProductos.filter((product) => product.categoria === selected);

      renderProductGrid(filtered, '#catalog-grid');
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  fetchCatalogo();
});
