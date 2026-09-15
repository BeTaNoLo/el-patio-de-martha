# El Patio de Martha

Proyecto web estático para una pequeña empresa familiar de plantas, creado con HTML5, CSS3, JavaScript vanilla y JSON como fuente de datos inicial.

## Objetivo

La web tiene una primera versión orientada a:

- presentar la marca y la historia de Martha,
- mostrar el catálogo de plantas,
- mostrar precios y stock,
- permitir pedidos online desde un formulario,
- preparar la estructura para crecer con usuarios, pagos, gestión compleja y Supabase/PostgreSQL en un futuro.

## Estructura base

```text
el-patio-de-martha/
├── index.html
├── plantas.html
├── producto.html
├── sobre-martha.html
├── contacto.html
├── pedido.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── catalogo.js
│   ├── producto.js
│   └── carrito.js
├── components/
│   ├── header.js
│   ├── footer.js
│   ├── product-card.js
│   └── product-grid.js
├── data/
│   └── plantas.json
├── images/
│   ├── logo/
│   ├── patio/
│   └── plantas/
└── README.md
```

## Cómo ejecutar localmente

Desde la raíz del proyecto:

```bash
python -m http.server 8000
```

Después abre en el navegador:

```text
http://localhost:8000/
```

## Despliegue con GitHub Pages

1. Subir el proyecto a un repositorio de GitHub.
2. Activar GitHub Pages desde la rama principal.
3. Usar la carpeta raíz del proyecto como origen del sitio estático.

## Notas

- Los datos del catálogo se leen desde `data/plantas.json`.
- El carrito persiste con `localStorage`.
- La arquitectura está pensada para crecer hacia Supabase + PostgreSQL sin forzar decisiones de backend en la V1.
