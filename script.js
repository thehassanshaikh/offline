const LOADING_DURATION = 1500; // Match this with the setTimeout in smooth-scrolling.js

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.transition = "opacity 0.5s ease";
    loadingScreen.style.opacity = "0";
    setTimeout(() => (loadingScreen.style.display = "none"), 500);
  }, LOADING_DURATION);
});

// Loading screen logic
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");

  // Fade out the loading screen after a short delay
  setTimeout(() => {
    loadingScreen.style.transition = "opacity 0.5s ease";
    loadingScreen.style.opacity = "0";

    // Remove loading screen from DOM after fade out
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1000);
});

// close the menu when a menu item is clicked
const checkbox = document.getElementById("luxbar-checkbox");
const menuItems = document.querySelectorAll(".luxbar-item a");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    checkbox.checked = false;
  });
});

// Navbar colour change on overlapping the image
const sections = document.querySelectorAll(".invert-nav-color");
const navbarLinks = document.querySelectorAll("nav ul li a");

function toggleNavbarTextColor(isOverImage) {
  navbarLinks.forEach((link) => {
    if (isOverImage) {
      link.style.color = "#fff";
    } else {
      link.style.color = "#000";
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    let isOverImage = false;
    let maxVisibility = 0;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const visibility = entry.intersectionRect.height;
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          isOverImage = entry.target.classList.contains("invert-nav-color");
        }
      }
    });

    toggleNavbarTextColor(isOverImage);
  },
  {
    root: null,
    threshold: [0.1, 0.5, 1.0],
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// Ripple effect

$("#ripples").ripples({
  resolution: 400,
});

$("#ripples-2").ripples({
  resolution: 400,
});
$("#ripples-3").ripples({
  resolution: 400,
});

$(document).ready(function () {
  $("#ripples-4").ripples({
    resolution: 512, // Higher resolution for smoother ripples
    dropRadius: 30, // Adjust the size of ripples
    perturbance: 0.03, // Lower value for a smoother effect
    interactive: true, // Keep interactivity enabled
  });

  // Automatically add ripples at random positions when there's no interaction
  setInterval(function () {
    let $el = $("#ripples-4");
    let x = Math.random() * $el.width();
    let y = Math.random() * $el.height();
    let radius = 15 + Math.random() * 15; // Random size
    let strength = 0.02 + Math.random() * 0.02; // Random intensity

    $el.ripples("drop", x, y, radius, strength);
  }, 4000); // Drops every 4 seconds
});
