const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const smoothScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const navLinks = document.querySelector(".nav__links");

const tabs = document.querySelectorAll(".operations__tab");
const tabContents = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

const img = document.querySelectorAll("img[data-src]");

const lazyImg = document.querySelectorAll(".lazy-img");

// Lazy-loading high-resolution images with a delay
function loadHighResImage(img) {
  // revalue  the "data-src" attribute value
  const dataSrc = img.getAttribute("data-src");

  // Check if the "data-src" attribute has a value
  if (dataSrc) {
    // Set a timeout to load the high-resolution image after 1 second
    setTimeout(() => {
      // Assign the value of "data-src" to the "src" attribute
      img.src = dataSrc;
      // Remove the "lazy-img" class to show the high-resolution image
      img.classList.remove("lazy-img");
    }, 1000);
  }
}

// Set up an Intersection Observer to detect lazy-loaded images in the viewport
const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Check if the lazy-loaded image is in the viewport
    if (entry.intersectionRatio > 0) {
      // Call the loadHighResImage function for the visible image
      const lazyImgTarget = entry.target;
      loadHighResImage(lazyImgTarget);
    }
  });
});

// Observe each lazy-loaded image for intersection with the viewport
lazyImg.forEach((img) => {
  intersectionObserver.observe(img);
});

// Set up hover effects on navigation links
nav.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("nav__link")) {
    // Set opacity to 0.5 for non-hovered and non-selected links
    const link = e.target;
    const elementsExceptSelected = Array.from(
      nav.querySelectorAll(".nav__link:not(:hover):not(.nav__link--selected)")
    );
    elementsExceptSelected.forEach((el) => {
      el.style.opacity = 0.5;
    });
    // Reset opacity for the currently hovered link
    link.style.opacity = 1;
  }
});

// Reset opacity for all navigation links when the mouse leaves the navigation area
nav.addEventListener("mouseout", () => {
  const allLink = Array.from(nav.querySelectorAll(".nav__link"));
  allLink.forEach((el) => {
    el.style.opacity = 1;
  });
});

// Activate a specific tab and its content in a tabbed interface
function activateTab(tabIndex) {
  tabs.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
  });
  tabContents.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  tabs[tabIndex].classList.add("operations__tab--active");
  tabContents[tabIndex].classList.add("operations__content--active");
}

// Add click event listeners to each tab for activation
tabs.forEach((tab, index) => {
  tab.addEventListener("click", function () {
    activateTab(index);
  });
});

// Enable smooth scrolling to the first section when a button is clicked
smoothScroll.addEventListener("click", () => {
  section1.scrollIntoView({
    behavior: "smooth",
  });
});

// Enable smooth scrolling when clicking on navigation links
navLinks.addEventListener("click", (e) => {
  e.preventDefault();
  const id = e.target.getAttribute("href");
  if (id && id.startsWith("#")) {
    const targetElement = document.querySelector(id);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  }
});

// Functions to open, close, and handle modal interactions
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Event listeners for modal interactions
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  // Close the modal when the 'Escape' key is pressed
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
