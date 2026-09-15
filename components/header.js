const headerHTML = `
  <header class="site-header">
    <div class="container header__inner">
      <a href="index.html" class="brand" aria-label="El Patio de Martha inicio">
        <span class="brand__mark">🌿</span>
        <span class="brand__text">El Patio de Martha</span>
      </a>

      <nav class="main-nav" aria-label="Menu principal">
        <a href="index.html">Inicio</a>
        <a href="plantas.html">Plantas</a>
        <a href="sobre-martha.html">Sobre Martha</a>
        <a href="contacto.html">Contacto</a>
      </nav>

      <div class="header-actions">
        <a href="pedido.html" class="cart-link" aria-label="Ver carrito">
          <span>Carrito</span>
          <span id="cart-count" class="cart-count">0</span>
        </a>
      </div>
    </div>
  </header>
`;

const headerRoot = document.getElementById('site-header');
if (headerRoot) {
  headerRoot.innerHTML = headerHTML;
}
