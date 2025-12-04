/**
 Verificacion de que el formulario funcione y se complete correctamente
 */

/**
 * Función para mostrar un mensaje de error bajo un campo de formulario.
 * @param {string} fieldId - ID del campo (ej. 'name', 'email').
 * @param {string} message - Mensaje de error a mostrar.
 */

const displayError = (fieldId, message) => {
  const errorElement = document.getElementById(`error-${fieldId}`);
  if (errorElement) {
    errorElement.textContent = message;
  }
};

/**
 * Función para limpiar todos los mensajes de error.
 */

const clearErrors = () => {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((el) => (el.textContent = ""));

  const statusMessage = document.getElementById("form-status-message");
  if (statusMessage) {
    statusMessage.textContent = "";
  }
};

/**
 * Validamos todos los campos del formulario y muestramos los errores correspondientes .
 * @param {HTMLFormElement} form - El elemento del formulario.
 * @returns {boolean} True si el formulario es válido, False si no lo es.
 */
const validateForm = (form) => {
  clearErrors();
  let isValid = true;

  const name = form.name.value.trim();
  if (name.length < 2) {
    displayError("name", "El nombre debe tener al menos 2 caracteres.");
    isValid = false;
  }

  const email = form.email.value.trim();
  // Expresión regular simple para formato de email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    displayError("email", "Por favor, introduce un email válido.");
    isValid = false;
  }

  const subject = form.subject.value.trim();
  if (subject.length < 5) {
    displayError(
      "subject",
      "El asunto es demasiado corto. Mínimo 5 caracteres."
    );
    isValid = false;
  }

  const messageText = form.message.value.trim();
  if (messageText.length < 10) {
    displayError(
      "message-text",
      "El mensaje debe tener al menos 10 caracteres."
    );
    isValid = false;
  }

  return isValid;
};

const setupContactForm = () => {
  const form = document.getElementById("contact-form");
  const statusMessage = document.getElementById("form-status-message");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm(form)) {
      console.log("Formulario enviado correctamente:", {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
      });

      statusMessage.textContent =
        "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.";
      statusMessage.style.color = "#28a745";
      form.reset();
    } else {
      statusMessage.textContent =
        "Por favor, corrige los errores en el formulario.";
      statusMessage.style.color = "#dc3545";
    }
  });
};

document.addEventListener("DOMContentLoaded", setupContactForm);
