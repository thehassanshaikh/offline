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

// Chnages backgourd images dymicly

window.onload = function () {
  // Array of image URLs
  const images = [
    "https://elements-resized.envatousercontent.com/envato-shoebox/c0d7/7502-4a6d-4622-a053-af805840f098/63d197084735983a1ff732ae_withmeta.jpg?w=1600&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=70357a975a9edeb75c6cb79d08189ad6f3e9bc663fe13fb0b6811929ae5abea0",
    "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/54/f7/1d/62/1c/v1_E10/E1055ERF.JPG?w=1600&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=2be0c0ec05a2fcfd822b5731ab8e9e2b0f5a05fbe517fe2b04a6d4a4f48a9a30",
    "https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/3b/69/40/1e/ce/v1_E10/E10C7EN.jpg?w=1600&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=da49568da8c65d6d2d8ef5546e270f66ae767937580326c477e8cf510a2cc66b",
    "https://i.pinimg.com/originals/f3/a7/a7/f3a7a779e0837cb9e873d7a77c12896c.jpg",
    "https://sun9-47.userapi.com/impg/6BlM_csiTruRD7-RaO9Mbdciiyd5xQLmhrxpvQ/u0AKrRdflZY.jpg?size=900x450&quality=96&sign=d1c47dcb545fa0d7e28197668404fd58&c_uniq_tag=8lf7w3d3taZEMfnLyMey4VTiSBkcsJzCYsQeaaC62ko&type=album",
  ];

  // Select a random image
  const randomImage = images[Math.floor(Math.random() * images.length)];

  // Select the ripples section correctly
  const ripplesSection = document.getElementById("ripples");

  if (ripplesSection) {
    ripplesSection.style.backgroundImage = `url('${randomImage}')`;
  } else {
    console.error("Element with ID 'ripples' not found!");
  }
};

// Ripple effect

// $("#ripples").ripples({
//   resolution: 800,
// });

setTimeout(() => {
  $("#ripples").ripples("destroy"); // Destroy the old instance
  $("#ripples").ripples({
    resolution: 256,
    dropRadius: 20,
    perturbance: 0.08,
  });
}, 100); // Small delay ensures the new background is fully applied
