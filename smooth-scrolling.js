// Import required libraries
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm';
import { ScrollTrigger } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Create Lenis smooth scroll instance
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
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
lenis.on('scroll', ScrollTrigger.update);

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  });
});

// Initialize animations after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set GSAP defaults
  gsap.defaults({
    ease: 'power2.out',
    duration: 1,
    overwrite: 'auto'
  });

  // Hero section parallax
  const heroImage = document.querySelector('.hero-img-1-con img');
  if (heroImage) {
    gsap.to(heroImage, {
      scrollTrigger: {
        trigger: '.hero-con',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        invalidateOnRefresh: true
      },
      y: 100,
      ease: 'none'
    });
  }

  // About section animations
  const aboutImage = document.querySelector('.about-img-con img');
  if (aboutImage) {
    gsap.from(aboutImage, {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.5,
        invalidateOnRefresh: true
      },
      y: 50,
      opacity: 0,
      ease: 'none'
    });
  }

  // Services section parallax
  gsap.utils.toArray('.services-section img').forEach((img, i) => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img,
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: 0.5,
        invalidateOnRefresh: true
      },
      y: 30,
      opacity: 0,
      scale: 0.95,
      ease: 'none'
    });
  });

  // Initialize section-specific animations
  const sections = [
    '.hospitality-section',
    '.lifestyle-section',
    '.real-estate',
    '.media',
    '.ngo'
  ];

  sections.forEach(section => {
    const images = document.querySelectorAll(`${section} img`);
    images.forEach((img, index) => {
      gsap.from(img, {
        scrollTrigger: {
          trigger: img,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.5,
          invalidateOnRefresh: true
        },
        y: 40 * (index % 2 ? 1 : -1),
        opacity: 0,
        scale: 0.98,
        ease: 'none'
      });
    });
  });

  // Text animations
  gsap.utils.toArray('.services-text').forEach(text => {
    gsap.from(text, {
      scrollTrigger: {
        trigger: text,
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: 0.5,
        invalidateOnRefresh: true
      },
      x: -50,
      opacity: 0,
      ease: 'none'
    });
  });
});

// Handle resize with debouncing
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
