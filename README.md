🎬 Plataforma de Compra y Reseñas de Películas

Este proyecto es una aplicación web SPA (Single Page Application) modular que simula una plataforma de E-commerce y reseñas de películas. El objetivo principal es demostrar la aplicación de buenas prácticas de desarrollo web, incluyendo la estructuración semántica de HTML, estilos responsivos con CSS, y la lógica avanzada de JavaScript para el manejo de datos, el carrito de compras persistente (localStorage) y la carga asíncrona de datos (Fetch API).

⚙️ Estructura del Proyecto

La aplicación sigue una arquitectura modular clara, separando las responsabilidades de datos, lógica y presentación:

tu-proyecto/
├── css/
│   └── styles.css      # Estilos globales y responsivos.
├── js/
│   ├── movies.js       # Módulo asíncrono que simula la llamada a la API (Fetch).
│   ├── script.js       # Lógica principal (Carrito, Renderizado de Index/Reseñas).
│   └── contact.js      # Lógica exclusiva de validación del formulario de Contacto.
├── pages/
│   ├── cart.html       # Vista dedicada para el carrito de compras.
│   ├── contact.html    # Formulario de contacto y validación.
│   └── reviews.html    # Lista de reseñas y vista individual.
├── img/                # Contenedor para imágenes de posters y logo.
└── index.html          # Página principal y listado de productos.


✨ Funcionalidades Clave

1. Sistema de Datos Dinámico (Fetch API)

Implementación: La aplicación cumple con el requisito de usar Fetch API. El archivo js/movies.js ahora funciona como un módulo asíncrono que simula la obtención de datos de una API REST.

Asincronía: Tanto index.html como pages/reviews.html esperan de manera asíncrona a que los datos se carguen antes de inyectar el contenido, evitando errores de renderizado.

2. Carrito de Compras Persistente

Almacenamiento: El estado del carrito se mantiene persistente en el navegador utilizando localStorage, lo que garantiza que los productos no se pierdan al actualizar o cerrar la página.

Contador Dinámico: El número total de ítems en el carrito (🛒 Carrito (X)) se actualiza en tiempo real en todas las páginas.

Edición Avanzada:

Adición: Al hacer clic en "Añadir al Carrito" en index.html, si el producto ya existe, se incrementa la cantidad en lugar de duplicar la entrada.

Visualización: En pages/cart.html, los usuarios pueden editar la cantidad con botones + y - y eliminar el producto completo con el botón X.

Total Dinámico: El total de la compra se recalcula y actualiza automáticamente con cada modificación de cantidad o eliminación.

3. Navegación y Reseñas Duales

Rutas Dinámicas: La página pages/reviews.html tiene doble funcionalidad controlada por la URL:

Ruta simple (/reviews.html): Muestra la lista completa de todas las reseñas en cascada.

Ruta con ID (/reviews.html?id=X): Muestra solo la reseña individual de la película seleccionada desde la tarjeta en index.html.

4. Formulario de Contacto y Validación

Separación de Lógica: La validación se maneja en un módulo separado, js/contact.js, para mantener script.js enfocado en el E-commerce.

Verificación: El formulario realiza verificaciones obligatorias en el lado del cliente (client-side validation) para:

Campos no vacíos (Nombre, Asunto, Mensaje).

Formato de correo electrónico válido.

Longitud mínima en campos de texto.

UX: Muestra mensajes de error específicos debajo de cada campo que fallen la validación.

🎨 Diseño y Responsividad

HTML Semántico: Uso estricto de etiquetas semánticas (<header>, <nav>, <main>, <section>, <footer>) en todas las páginas.

Estilos Centralizados: Todos los estilos se gestionan en css/styles.css (sin estilos <style> en línea en el HTML).

Tipografía: Uso de Google Fonts (Poppins) para un diseño limpio y moderno.

Responsividad:

Layout Principal: Uso de CSS Grid y Flexbox para el listado de tarjetas (index.html).

Contacto: La página pages/contact.html es completamente responsiva gracias al uso de Media Queries, adaptando el ancho, el relleno y el tamaño de los elementos para una óptima visualización en dispositivos móviles (máx. 768px).

Navbar Sticky: La barra de navegación permanece fija en la parte superior de la ventana al hacer scroll.

🛠️ Requisitos Faltantes (Para un Despliegue Completo)

Aunque el proyecto cumple con todos los requisitos funcionales de programación, los siguientes puntos necesitan una implementación externa o física para ser considerados 100% terminados:

Imágenes Reales (Consigna 5/10): Reemplazar los placeholders [Poster de X] por imágenes reales y asegurarse de que el atributo alt sea descriptivo para mejorar la accesibilidad (SEO/Accesibilidad).

Conexión Real con FormsPree (Consigna 2): Integrar el endpoint real de FormsPree en la función de envío de js/contact.js para que los mensajes lleguen a un correo electrónico real.

Subida (Consigna 6): El proyecto debe ser subido a un hosting gratuito (GitHub Pages / Netlify) para obtener la URL funcional.