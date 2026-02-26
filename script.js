// Mobile Navigation Toggle - Updated
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const header = document.getElementById("header");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInside = hamburger.contains(e.target) || navLinks.contains(e.target);
    if (!isClickInside && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Typed.js initialization with protection
let typedInitialized = false;

function initializeTyped() {
  if (typedInitialized) return;

  if (document.querySelector(".auto-typer")) {
    new Typed(".auto-typer", {
      strings: [
        "Programmer.",
        "Web Dev.",
        "AI Explorer.",
        "Web3 Whiz.",
        "Cyber Adept.",
        "Software Dev.",
      ],
      typeSpeed: 150,
      backSpeed: 150,
    });
  }

  if (document.querySelector(".auto-type")) {
    new Typed(".auto-type", {
      strings: ["నమస్కారం", "नमस्कार", "Hello"],
      typeSpeed: 150,
      backSpeed: 150,
    });
  }

  typedInitialized = true;
}

// Sliding functionality
function initializeSliders() {
  const sliders = document.querySelectorAll(".slider-container");

  sliders.forEach((slider) => {
    const grid = slider.querySelector(
      ".skills-grid, .timeline, .projects-grid, .blog-grid"
    );
    const items = grid.querySelectorAll(
      ".skill-card, .timeline-item, .project-card, .blog-card"
    );
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    const dotsContainer = slider.querySelector(".dots-container");

    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + 25;

    // Create dots for mobile
    if (window.innerWidth <= 768) {
      dotsContainer.innerHTML = "";
      items.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => slideTo(index));
        dotsContainer.appendChild(dot);
      });
    }

    // Slide to specific index
    function slideTo(index) {
      currentIndex = Math.max(0, Math.min(index, items.length - 1));
      grid.scrollTo({
        left: currentIndex * itemWidth,
        behavior: "smooth",
      });
      updateDots();
    }

    // Update dot indicators
    function updateDots() {
      if (window.innerWidth > 768) return;
      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    // Navigation arrows
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => slideTo(currentIndex - 1));
      nextBtn.addEventListener("click", () => slideTo(currentIndex + 1));
    }

    // Update on scroll
    grid.addEventListener("scroll", () => {
      currentIndex = Math.round(grid.scrollLeft / itemWidth);
      updateDots();
    });
  });
}

// Initialize everything
function initAll() {
  initializeTyped();
  initializeSliders();
}

// Event listeners
document.addEventListener("DOMContentLoaded", initAll);
window.addEventListener("resize", initializeSliders);

// Manual initialization check
if (document.readyState === "complete") {
  initAll();
}

window.addEventListener("load", () => {
  const isMobile = window.innerWidth <= 768;
  const snackbar = document.getElementById("mobileSnackbar");

  if (isMobile && snackbar) {
    setTimeout(() => {
      snackbar.classList.add("show");
      setTimeout(() => {
        snackbar.classList.remove("show");
      }, 10000); // hide after 10s
    }, 1000); // show after 1s delay
  }
});