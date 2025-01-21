// Import required libraries
import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

let lenis;

// Initialize Lenis with optimized settings
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    easing: (t) => 1 - Math.pow(1 - t, 3), // Smooth cubic easing
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1.2, // Increase scroll speed
    smoothTouch: true, // Enable touch smoothing
    touchMultiplier: 2,
    infinite: false,
  });

  // Sync Lenis scroll with GSAP ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// Initialize parallax and scroll animations
function initAnimations() {
  gsap.defaults({
    ease: "power2.out",
    duration: 1,
    overwrite: "auto",
  });

  // Hero section parallax
  const heroImage = document.querySelector(".hero-img-1-con img");
  if (heroImage) {
    heroImage.style.willChange = "transform";
    gsap.to(heroImage, {
      scrollTrigger: {
        trigger: ".hero-con",
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
      y: (i, target) => {
        // Calculate parallax distance based on viewport height
        return window.innerHeight * 0.3;
      },
      ease: "none",
    });
  }

  // About section parallax and fade
  const aboutElements = gsap.utils.toArray(
    ".about-section .about-img-con, .about-text-con"
  );
  aboutElements.forEach((el, i) => {
    const direction = i % 2 === 0 ? 1 : -1;
    gsap.fromTo(
      el,
      { y: 100 * direction, opacity: 0 },
      {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
        y: 0,
        opacity: 1,
        duration: 1.5,
      }
    );
  });

  // Services section parallax with stagger
  const serviceImages = gsap.utils.toArray(".services-section img");
  serviceImages.forEach((img, i) => {
    const speed = i % 2 === 0 ? 0.8 : 1.2; // Alternate parallax speeds
    gsap.fromTo(
      img,
      { y: 80, opacity: 0 },
      {
        scrollTrigger: {
          trigger: img,
          start: "top 85%",
          end: "center center",
          scrub: true,
          invalidateOnRefresh: true,
        },
        y: 0,
        opacity: 1,
        duration: 1 * speed,
      }
    );
  });

  // Initialize section-specific parallax effects
  const sections = [
    { selector: ".hospitality-section", speed: 0.8 },
    { selector: ".lifestyle-section", speed: 1 },
    { selector: ".real-estate", speed: 1.2 },
    { selector: ".media", speed: 0.9 },
    { selector: ".ngo", speed: 1.1 },
  ];

  sections.forEach(({ selector, speed }) => {
    const images = gsap.utils.toArray(`${selector} img`);
    images.forEach((img, index) => {
      const yOffset = 100 * (index % 2 ? 1 : -1);
      const parallaxSpeed = speed * (index % 2 ? 1.2 : 0.8);

      gsap.fromTo(
        img,
        {
          y: yOffset,
          opacity: 0,
          scale: 0.98,
        },
        {
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            end: "bottom center",
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: () => (img.style.willChange = "transform, opacity"),
            onLeave: () => (img.style.willChange = "auto"),
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5 * parallaxSpeed,
          ease: "power1.out",
        }
      );
    });
  });

  // Services Text parallax effects
  gsap.utils.toArray(".services-text").forEach((text) => {
    gsap.fromTo(
      text,
      { x: -50, opacity: 0 },
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
        duration: 1.5,
        ease: "power1.out",
      }
    );
  });

  // Services Text parallax effects
  gsap.utils.toArray(".parallax-text").forEach((text) => {
    gsap.fromTo(
      text,
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power1.out",
      }
    );
  });

  // Parallax background sections
  const parallaxBgs = gsap.utils.toArray(".invert-nav-color");
  parallaxBgs.forEach((section) => {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      backgroundPosition: "50% 100%",
      ease: "none",
    });
  });
}

// Initialize smooth anchor scrolling
function initSmoothAnchors() {
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
}

// Main initialization
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initLenis();
    initAnimations();
    initSmoothAnchors();

    ScrollTrigger.refresh();
  }, 1500);
});

// Optimized resize handler
const debouncedResize = debounce(() => {
  if (lenis) lenis.resize();
  ScrollTrigger.refresh(true);
}, 250);

window.addEventListener("resize", debouncedResize);

// Cleanup function
window.addEventListener("beforeunload", () => {
  if (lenis) lenis.destroy();
  ScrollTrigger.getAll().forEach((st) => st.kill());
});
