const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function setMenuOpen(isOpen) {
  if (!menuToggle || !navLinks) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  navLinks.classList.toggle("is-open", isOpen);
  navLinks.inert = !isOpen && window.innerWidth <= 700;
  document.body.classList.toggle("menu-open", isOpen);
}

setMenuOpen(false);

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 700) setMenuOpen(false);
});

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const isVisible = selectedFilter === "all" || categories.includes(selectedFilter);
      card.hidden = !isVisible;
    });
  });
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const formFields = [
  {
    input: document.querySelector("#name"),
    error: document.querySelector("#name-error"),
    message: "Indiquez votre nom (au moins 2 caractères).",
  },
  {
    input: document.querySelector("#email"),
    error: document.querySelector("#email-error"),
    message: "Indiquez une adresse e-mail valide.",
  },
  {
    input: document.querySelector("#message"),
    error: document.querySelector("#message-error"),
    message: "Votre message doit contenir au moins 10 caractères.",
  },
];

function validateField(field) {
  const { input, error, message } = field;
  let isValid = input.checkValidity();

  if (input.type === "text") {
    isValid = input.value.trim().length >= 2;
  } else if (input.tagName === "TEXTAREA") {
    isValid = input.value.trim().length >= 10;
  }

  input.setAttribute("aria-invalid", String(!isValid));
  error.textContent = isValid ? "" : message;
  return isValid;
}

formFields.forEach((field) => {
  field.input.addEventListener("input", () => {
    if (field.input.getAttribute("aria-invalid") === "true") {
      validateField(field);
    }
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  formStatus.classList.remove("is-error");

  const invalidField = formFields.find((field) => !validateField(field));
  if (invalidField) {
    formStatus.textContent = "Vérifiez les champs indiqués avant de continuer.";
    formStatus.classList.add("is-error");
    invalidField.input.focus();
    return;
  }

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();
  const subject = encodeURIComponent(`Prise de contact — ${name}`);
  const body = encodeURIComponent(`Bonjour,\n\n${message}\n\n${name}\n${email}`);
  const mailto = `mailto:bonjour@ateliernebuleuse.fr?subject=${subject}&body=${body}`;

  formStatus.textContent = "Votre application e-mail va s’ouvrir avec votre message prêt à envoyer.";
  window.location.href = mailto;
});

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());