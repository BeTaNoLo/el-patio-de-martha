const footerHTML = `
  <footer class="site-footer">
    <div class="container footer__inner">
      <div>
        <h3>El Patio de Martha</h3>
        <p>Plantas cultivadas con amor.</p>
      </div>
      <div class="footer__links">
        <a href="plantas.html">Catálogo</a>
        <a href="sobre-martha.html">Nuestra historia</a>
        <a href="contacto.html">Contacto</a>
      </div>
    </div>
  </footer>
`;

const footerRoot = document.getElementById('site-footer');
if (footerRoot) {
  footerRoot.innerHTML = footerHTML;
}
