const formatPrice = (price) => `$${price.toLocaleString("es-ES")}`;

let apiMovieData = [];


const loadCart = () => {
  try {
    const serializedCart = localStorage.getItem("shoppingCart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.error("Error al cargar el carrito desde localStorage:", e);
    return [];
  }
};


const saveCart = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("shoppingCart", serializedCart);
  } catch (e) {
    console.error("Error al guardar el carrito en localStorage:", e);
  }
};

let cart = loadCart();


const updateCartCount = () => {
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    // Suma la propiedad 'quantity' de todos los ítems
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
  }
};


window.addToCart = (movieId) => {
  const movie = apiMovieData.find((m) => m.id === movieId);
  if (!movie) {
    console.error(`Película con ID ${movieId} no encontrada.`);
    return;
  }

  const cartItem = cart.find((item) => item.movieId === movieId);

  if (cartItem) {
    // Si ya está en el carrito, solo incrementa la cantidad
    cartItem.quantity += 1;
  } else {
    // Si no está, lo añade como un nuevo objeto de ítem
    cart.push({
      movieId: movie.id,
      title: movie.title,
      price: movie.price,
      quantity: 1,
    });
  }

  saveCart(cart);
  updateCartCount();
  console.log(`Película añadida/cantidad incrementada: ${movie.title}`);
  alert(`¡"${movie.title}" ha sido añadido/incrementado en el carrito!`);
};


window.removeItemFromCart = (index) => {
  if (index > -1 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
    updateCartCount();
    renderCartPage(); // Volver a renderizar la lista
  }
};

window.increaseQuantity = (index) => {
  if (index > -1 && index < cart.length) {
    cart[index].quantity += 1;
    saveCart(cart);
    updateCartCount();
    renderCartPage();
  }
};

window.decreaseQuantity = (index) => {
  if (index > -1 && index < cart.length) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      saveCart(cart);
      updateCartCount();
      renderCartPage();
    }
    // Si llega a 1, no hace nada (solo se elimina con el botón 'X')
  }
};

window.removeItemFromCart = (index) => {
  if (index > -1 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
    updateCartCount();
    renderCartPage(); // Volver a renderizar la lista
  }
};

const ensureDataLoaded = async (container) => {
  if (apiMovieData.length === 0) {
    if (container) {
      container.innerHTML =
        '<p style="text-align: center;">Cargando películas...</p>';
    }
    try {
      
      const isPagesFolder = window.location.pathname.includes("/pages/");
      const basePath = isPagesFolder ? "../js/movies.js" : "./js/movies.js";

      const response = await fetch(basePath);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      apiMovieData = await response.json();

      
      if (container) container.innerHTML = "";
    } catch (error) {
      console.error("Error al obtener los datos de la API simulada:", error);
      if (container) {
        container.innerHTML =
          '<p style="text-align: center; color: red;">Error al cargar las películas. Inténtalo de nuevo más tarde.</p>';
      }
      return false;
    }
  }
   console.log(apiMovieData); 
  return apiMovieData.length > 0;
};

export const renderMovieCards = async () => {
  const container = document.getElementById("movie-grid-container");
  if (!container) return;

 
  if (!(await ensureDataLoaded(container))) return;

  const cardsHTML = apiMovieData
    .map(
      (movie) => `
        <div class="card">
            <div class="card-image-container">
                <img class="card-image" src="${movie.image}" alt="${
        movie.title
      }">
            </div>
            <h2>${movie.title}</h2>
            <p class="genre">${movie.genre} | ${movie.yearOfRelease}</p>
            <div class="actions">
                <button class="btn buy" onclick="addToCart(${movie.id})">
                    Añadir al Carrito (${formatPrice(movie.price)})
                </button>
                <a href="pages/reviews.html?id=${
                  movie.id
                }" class="btn review">Reseña</a>
            </div>
        </div>
    `
    )
    .join("");

  container.innerHTML = cardsHTML;
};

export const renderCartPage = () => {
  const listContainer = document.getElementById("cart-items-list");
  const totalElement = document.getElementById("cart-total-price");

  if (!listContainer || !totalElement) return;

  if (cart.length === 0) {
    listContainer.innerHTML =
      '<p style="text-align: center; color: #777;">Tu carrito está vacío.</p>';
    totalElement.textContent = formatPrice(0);
    return;
  }

  let total = 0;
  const itemsHTML = cart
    .map((item, index) => {
      
      const subtotal = item.price * item.quantity;
      total += subtotal;

      return `
            <div class="cart-item">
                <span class="cart-item-info">${item.title}</span>
                <div class="cart-item-quantity-controls">
                    <!-- Botón para disminuir la cantidad -->
                    <button class="quantity-btn minus" onclick="window.decreaseQuantity(${index})">-</button>
                    <!-- Muestra la cantidad actual -->
                    <span class="quantity-display">${item.quantity}</span>
                    <!-- Botón para aumentar la cantidad -->
                    <button class="quantity-btn plus" onclick="window.increaseQuantity(${index})">+</button>
                </div>
                <span class="cart-item-price">${formatPrice(subtotal)}</span>
                <button class="remove-btn" onclick="window.removeItemFromCart(${index})">
                    &times;
                </button>
            </div>
        `;
    })
    .join("");

  listContainer.innerHTML = itemsHTML;
  totalElement.textContent = formatPrice(total);
};

const getMovieIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  
  return parseInt(params.get("id"));
};

export const renderReviewsPage = async () => {
  const container = document.getElementById("reviews-content");
  const mainTitle = document.getElementById("main-title");
  const movieId = getMovieIdFromUrl();

  if (!container || !mainTitle) return;

  if (!(await ensureDataLoaded(container))) return;


  if (!isNaN(movieId) && movieId > 0) {
    const movie = apiMovieData.find((m) => m.id === movieId);

    if (movie) {
      mainTitle.textContent = `Reseña: ${movie.title}`;
      container.innerHTML = `
                <div class="single-review-detail">
                    <div class="review-img">
                        <img  class="card-image" src="../${movie.image}" alt="Poster de ${movie.title}">
                    </div>
                    <div class="review-info">
                        <h2>${movie.title}</h2>
                        <p class="review-meta">Género: ${movie.genre} | Año: ${movie.yearOfRelease}</p>
                        <div class="review-content">
                            <p>${movie.review}</p>
                        </div>
                        <a href="reviews.html" class="btn back-to-list">← Volver a la Lista</a>
                    </div>
                </div>
            `;
    } else {
      mainTitle.textContent = "Error";
      container.innerHTML =
        '<p style="text-align: center;">Lo sentimos, no encontramos esa reseña.</p>';
    }
  } else {
    mainTitle.textContent = "Todas las Reseñas";
    const reviewsHTML = apiMovieData
      .map(
        (movie) => `
            <div class="review-box">
            
                <img  class="card-image" src="../${movie.image}" alt="${
          movie.title
        }">
        
                <p class="review-meta">Género: ${movie.genre} | Año: ${
          movie.yearOfRelease
        }</p>
                <div class="review-content">
                    <p>${movie.review.substring(0, 150)}... 
                    <a href="reviews.html?id=${
                      movie.id
                    }">Ver Reseña Completa</a></p>
                </div>
            </div>
        `
      )
      .join("");

    container.innerHTML = `<section id="reviews-list-container">${reviewsHTML}</section>`;
  }
};

document.addEventListener("DOMContentLoaded", updateCartCount);
