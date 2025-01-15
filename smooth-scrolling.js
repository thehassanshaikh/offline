// Import required libraries
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Create Lenis smooth scroll instance
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Create RAF loop for smooth animations
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

// Start the animation loop
requestAnimationFrame(raf);

// Update ScrollTrigger on Lenis scroll
lenis.on("scroll", ScrollTrigger.update);

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  });
});

// Initialize animations after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set GSAP defaults
  gsap.defaults({
    ease: "power2.out",
    duration: 1,
    overwrite: true,
  });

  // Hero section parallax
  const heroImage = document.querySelector(".hero-img-1-con img");
  if (heroImage) {
    gsap.to(heroImage, {
      scrollTrigger: {
        trigger: ".hero-con",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
      y: 200,
      ease: "none",
    });
  }

  // About section animations
  const aboutImage = document.querySelector(".about-img-con img");
  if (aboutImage) {
    gsap.fromTo(
      aboutImage,
      { y: 100, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
        y: 0,
        opacity: 1,
        ease: "none",
      }
    );
  }

  // Services section parallax
  gsap.utils.toArray(".services-section img").forEach((img, i) => {
    gsap.fromTo(
      img,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "none",
      }
    );
  });

  // Initialize section-specific animations
  const sections = [
    ".hospitality-section",
    ".lifestyle-section",
    ".real-estate",
    ".media",
    ".ngo",
  ];

  sections.forEach((section) => {
    const images = document.querySelectorAll(`${section} img`);
    images.forEach((img, index) => {
      const yOffset = 80 * (index % 2 ? 1 : -1);

      gsap.fromTo(
        img,
        { y: yOffset, opacity: 0, scale: 0.98 },
        {
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power1.out",
        }
      );
    });
  });

  // Text animations
  gsap.utils.toArray(".services-text").forEach((text) => {
    gsap.fromTo(
      text,
      { x: -100, opacity: 0 },
      {
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
        x: 0,
        opacity: 1,
        ease: "power1.out",
      }
    );
  });

  // Special handling for footer elements
  const footerElements = document.querySelectorAll(
    "footer p, footer a, footer img"
  );
  footerElements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: element,
          start: "top 90%", // Start animation when element is 90% from top of viewport
          end: "top 70%", // End animation when element is 70% from top of viewport
          scrub: false, // Disable scrub for footer elements
          toggleActions: "play none none none", // Play animation once when triggered
        },
        duration: 0.8,
      }
    );
  });

  // Apply fade-in effect for all other elements
  const elements = document.querySelectorAll(
    "img:not(.hero-img-1-con img):not(footer img), .services-text, p:not(footer p), h1, h2, h3, h4, h5, h6"
  );

  elements.forEach((element) => {
    // Skip elements that already have ScrollTrigger animations
    if (!ScrollTrigger.getAll().some((st) => st.vars.trigger === element)) {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    }
  });
});

// Debounced resize handler
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Handle resize with improved debouncing
const handleResize = debounce(() => {
  ScrollTrigger.refresh();
}, 250);

window.addEventListener("resize", handleResize);

const footerElements = document.querySelectorAll(
  "footer p, footer a, footer img"
);
footerElements.forEach((element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: element,
        start: "top bottom-=50", // Trigger earlier when the element is near the bottom of the viewport
        end: "top center", // End the animation earlier
        scrub: false,
        toggleActions: "play none none none",
      },
      duration: 0.8,
    }
  );
});
