// Import required libraries
// import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
// import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js";

// gsap.registerPlugin(ScrollTrigger);

// let lenis;

// // Initialize Lenis with optimized settings
// function initLenis() {
//   lenis = new Lenis({
//     duration: 1.2,
//     // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//     easing: (t) => 1 - Math.pow(1 - t, 3), // Smooth cubic easing
//     orientation: "vertical",
//     gestureOrientation: "vertical",
//     smoothWheel: true,
//     wheelMultiplier: 1.2, // Increase scroll speed
//     smoothTouch: true, // Enable touch smoothing
//     touchMultiplier: 2,
//     infinite: false,
//   });

//   // Sync Lenis scroll with GSAP ScrollTrigger
//   lenis.on("scroll", ScrollTrigger.update);

//   function raf(time) {
//     lenis.raf(time);
//     ScrollTrigger.update();
//     requestAnimationFrame(raf);
//   }

//   requestAnimationFrame(raf);
// }

// // Initialize parallax and scroll animations
// function initAnimations() {
//   gsap.defaults({
//     ease: "power2.out",
//     duration: 1,
//     overwrite: "auto",
//   });

//   // Hero section parallax
//   const heroImage = document.querySelector(".hero-img-1-con img");
//   if (heroImage) {
//     heroImage.style.willChange = "transform";
//     gsap.to(heroImage, {
//       scrollTrigger: {
//         trigger: ".hero-con",
//         start: "top top",
//         end: "bottom top",
//         scrub: true,
//         invalidateOnRefresh: true,
//       },
//       y: (i, target) => {
//         // Calculate parallax distance based on viewport height
//         return window.innerHeight * 0.3;
//       },
//       ease: "none",
//     });
//   }

//   // About section parallax and fade
//   const aboutElements = gsap.utils.toArray(
//     ".about-section .about-img-con, .about-text-con"
//   );
//   aboutElements.forEach((el, i) => {
//     const direction = i % 2 === 0 ? 1 : -1;
//     gsap.fromTo(
//       el,
//       { y: 100 * direction, opacity: 0 },
//       {
//         scrollTrigger: {
//           trigger: el,
//           start: "top 80%",
//           end: "center center",
//           scrub: 1,
//           invalidateOnRefresh: true,
//         },
//         y: 0,
//         opacity: 1,
//         duration: 1.5,
//       }
//     );
//   });

//   // Services section parallax with stagger
//   const serviceImages = gsap.utils.toArray(".services-section img");
//   serviceImages.forEach((img, i) => {
//     const speed = i % 2 === 0 ? 0.8 : 1.2; // Alternate parallax speeds
//     gsap.fromTo(
//       img,
//       { y: 80, opacity: 0 },
//       {
//         scrollTrigger: {
//           trigger: img,
//           start: "top 85%",
//           end: "center center",
//           scrub: true,
//           invalidateOnRefresh: true,
//         },
//         y: 0,
//         opacity: 1,
//         duration: 1 * speed,
//       }
//     );
//   });

//   // Initialize section-specific parallax effects
//   const sections = [
//     { selector: ".hospitality-section", speed: 0.8 },
//     { selector: ".lifestyle-section", speed: 1 },
//     { selector: ".real-estate", speed: 1.2 },
//     { selector: ".media", speed: 0.9 },
//     { selector: ".ngo", speed: 1.1 },
//     { selector: ".parallaxOne", speed: 0.8 },
//     { selector: ".parallaxTwo", speed: 0.9 },
//     // { selector: ".parallaxThree", speed: 1.1 },
//   ];

//   document.querySelectorAll(".parallaxThree img").forEach((img, index) => {
//     img.style.willChange = "transform, opacity, scale";

//     // Correct animation directions based on the image's position
//     const animationConfig = {
//       0: { x: -200, y: 0 }, // Left image comes from the left
//       1: { x: 0, y: 200 }, // Middle image comes from the bottom
//       2: { x: 200, y: 0 }, // Right image comes from the right
//     };

//     const { x, y } = animationConfig[index % 3];

//     gsap.fromTo(
//       img,
//       {
//         x: x, // Start with directional offset
//         y: y, // Start with vertical offset
//         opacity: 0, // Initially invisible
//         scale: 1.2, // Slightly zoomed in
//       },
//       {
//         x: 0, // Return to original position horizontally
//         y: 0, // Return to original position vertically
//         opacity: 1, // Fully visible
//         scale: 1, // Reset to original size
//         scrollTrigger: {
//           trigger: img.closest(".parallaxThree"),
//           start: "top bottom", // Start animation when section enters viewport
//           end: "bottom top", // End animation when section leaves viewport
//           scrub: true, // Smooth scroll-driven animation
//           invalidateOnRefresh: true, // Recalculate on resize
//         },
//         duration: 1.5, // Duration of the animation
//         ease: "power2.out", // Smooth easing effect
//       }
//     );
//   });

//   sections.forEach(({ selector, speed }) => {
//     const images = gsap.utils.toArray(`${selector} img`);
//     images.forEach((img, index) => {
//       const yOffset = 100 * (index % 2 ? 1 : -1);
//       const parallaxSpeed = speed * (index % 2 ? 1.2 : 0.8);

//       gsap.fromTo(
//         img,
//         {
//           y: yOffset,
//           opacity: 0,
//           scale: 0.98,
//         },
//         {
//           scrollTrigger: {
//             trigger: img,
//             start: "top 85%",
//             end: "bottom center",
//             scrub: true,
//             invalidateOnRefresh: true,
//             onEnter: () => (img.style.willChange = "transform, opacity"),
//             onLeave: () => (img.style.willChange = "auto"),
//           },
//           y: 0,
//           opacity: 1,
//           scale: 1,
//           duration: 1.5 * parallaxSpeed,
//           ease: "power1.out",
//         }
//       );
//     });
//   });

//   // Services Text parallax effects
//   gsap.utils.toArray(".services-text").forEach((text) => {
//     gsap.fromTo(
//       text,
//       { x: -50, opacity: 0 },
//       {
//         scrollTrigger: {
//           trigger: text,
//           start: "top 85%",
//           end: "center center",
//           scrub: 1,
//           invalidateOnRefresh: true,
//         },
//         x: 0,
//         opacity: 1,
//         duration: 1.5,
//         ease: "power1.out",
//       }
//     );
//   });

//   // Lifestyle section parallax with stagger

//   gsap.utils.toArray(".lifestyle-7 img").forEach((img, index) => {
//     const speed = index % 2 === 0 ? 1 : 1.2; // Alternate parallax speeds

//     gsap.fromTo(
//       img,
//       {
//         y: 100 * (index % 2 === 0 ? 1 : -1), // Starting Y offset
//         opacity: 0,
//         scale: 1,
//       },
//       {
//         scrollTrigger: {
//           trigger: img,
//           start: "top 85%",
//           end: "center center",
//           scrub: true,
//           invalidateOnRefresh: true,
//         },
//         y: 0, // Ending position (no offset)
//         opacity: 1, // Fade in
//         scale: 1,
//         duration: 1.5 * speed, // Adjust speed based on index
//         ease: "power1.out",
//       }
//     );
//   });

//   //  Text parallax effects
//   gsap.utils.toArray(".parallax-text").forEach((text) => {
//     gsap.fromTo(
//       text,
//       { y: 50, opacity: 0 },
//       {
//         scrollTrigger: {
//           trigger: text,
//           start: "top 85%",
//           end: "center center",
//           scrub: 1,
//           invalidateOnRefresh: true,
//         },
//         y: 0,
//         opacity: 1,
//         duration: 1.5,
//         ease: "power1.out",
//       }
//     );
//   });

//   // Parallax background sections
//   const parallaxBgs = gsap.utils.toArray(".invert-nav-color");
//   parallaxBgs.forEach((section) => {
//     gsap.to(section, {
//       scrollTrigger: {
//         trigger: section,
//         start: "top bottom",
//         end: "bottom top",
//         scrub: true,
//       },
//       backgroundPosition: "50% 100%",
//       ease: "none",
//     });
//   });
// }

// // Initialize smooth anchor scrolling
// function initSmoothAnchors() {
//   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//     anchor.addEventListener("click", (e) => {
//       e.preventDefault();
//       const target = document.querySelector(anchor.getAttribute("href"));
//       if (target) {
//         lenis.scrollTo(target, {
//           offset: 0,
//           duration: 1.2,
//           easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         });
//       }
//     });
//   });
// }

// // Main initialization
// document.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => {
//     initLenis();
//     initAnimations();
//     initSmoothAnchors();

//     ScrollTrigger.refresh();
//   }, 1500);
// });

// // Optimized resize handler
// const debouncedResize = debounce(() => {
//   if (lenis) lenis.resize();
//   ScrollTrigger.refresh(true);
// }, 250);

// window.addEventListener("resize", debouncedResize);

// // Cleanup function
// window.addEventListener("beforeunload", () => {
//   if (lenis) lenis.destroy();
//   ScrollTrigger.getAll().forEach((st) => st.kill());
// });

// ================= new animation =====================

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scrolling
// const lenis = new Lenis({
//   duration: 1.5, // Smooth scrolling duration
//   easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic easing for a natural feel
//   smoothWheel: true,
//   smoothTouch: true,
//   touchMultiplier: 2,
//   infinite: false,
// });

// // Sync Lenis scroll with GSAP ScrollTrigger
// lenis.on("scroll", ScrollTrigger.update);

// function raf(time) {
//   lenis.raf(time);
//   ScrollTrigger.update();
//   requestAnimationFrame(raf);
// }
// requestAnimationFrame(raf);

const heroLogo = document.querySelector(".hero-img-1-con img");
const aboutLogoCon = document.querySelector(".about-logo-con");

const aboutLogoRect = aboutLogoCon.getBoundingClientRect();
const heroLogoRect = heroLogo.getBoundingClientRect();

gsap.to(heroLogo, {
  x: aboutLogoRect.left - heroLogoRect.left,
  y: aboutLogoRect.top - heroLogoRect.top,
  scale: 0.5,
  duration: 2,
  ease: "power3.inOut",
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 90%",
    end: "top 30%",
    scrub: 2, // Increased scrub value for smoother animation
    pin: false,
    toggleClass: {
      targets: heroLogo,
      className: "animating",
    },
    onEnterBack: () => {
      // Keeps the class when scrolling up until the trigger point
      heroLogo.classList.add("animating");
    },
    onLeave: () => {
      // Ensures class stays active when scrolling down past the end point
      heroLogo.classList.add("animating");
    },
  },
});

// document.querySelectorAll(".section-style").forEach((section) => {
//   const images = section.querySelectorAll("img");

//   if (images.length === 1) {
//     // Vertical parallax effect
//     gsap.fromTo(
//       images[0],
//       { y: 100, opacity: 0.8 },
//       {
//         y: -100,
//         opacity: 1,
//         scrollTrigger: {
//           trigger: section,
//           start: "top 90%",
//           end: "bottom top",
//           scrub: true,
//         },
//       }
//     );
//   } else if (images.length === 2) {
//     // Horizontal parallax effect (left & right)
//     gsap.fromTo(
//       images[0],
//       { x: -100, opacity: 0.8 },
//       {
//         x: 0,
//         opacity: 1,
//         scrollTrigger: {
//           trigger: section,
//           start: "top 90%",
//           end: "bottom top",
//           scrub: true,
//         },
//       }
//     );

//     gsap.fromTo(
//       images[1],
//       { x: 100, opacity: 0.8 },
//       {
//         x: 0,
//         opacity: 1,
//         scrollTrigger: {
//           trigger: section,
//           start: "top 90%",
//           end: "bottom top",
//           scrub: true,
//         },
//       }
//     );
//   } else if (images.length === 3) {
//     // Left, right, and zoom effect
//     gsap.fromTo(
//       images[0],
//       { x: -100, opacity: 0.8 },
//       {
//         x: 0,
//         opacity: 1,
//         scrollTrigger: {
//           trigger: section,
//           start: "top 90%",
//           end: "bottom top",
//           scrub: true,
//         },
//       }
//     );

//     gsap.fromTo(
//       images[1],
//       { scale: 1.2, opacity: 0.8 },
//       {
//         scale: 1,
//         opacity: 1,
//         scrollTrigger: {
//           trigger: section,
//           start: "top 90%",
//           end: "bottom top",
//           scrub: true,
//         },
//       }
//     );

//     gsap.fromTo(
//       images[2],
//       { x: 100, opacity: 0.8 },
//       {
//         x: 0,
//         opacity: 1,
//         scrollTrigger: {
//           trigger: section,
//           start: "top 90%",
//           end: "bottom top",
//           scrub: true,
//         },
//       }
//     );
//   }
// });

// // Smooth scrolling for anchor links
// document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//   anchor.addEventListener("click", (e) => {
//     e.preventDefault();
//     const target = document.querySelector(anchor.getAttribute("href"));
//     if (target) {
//       lenis.scrollTo(target, { offset: 0, duration: 1.5 });
//     }
//   });
// });
