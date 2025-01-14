// Loading screen logic
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  
  // Fade out the loading screen after a short delay
  setTimeout(() => {
    loadingScreen.style.transition = 'opacity 0.5s ease';
    loadingScreen.style.opacity = '0';
    
    // Remove loading screen from DOM after fade out
    setTimeout(() => {
      loadingScreen.style.display = 'none';
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
const sections = document.querySelectorAll('.invert-nav-color');
const navbarLinks = document.querySelectorAll('nav ul li a');

function toggleNavbarTextColor(isOverImage) {
  navbarLinks.forEach(link => {
    if (isOverImage) {
      link.style.color = '#fff';
    } else {
      link.style.color = '#000';
    }
  });
}

const observer = new IntersectionObserver(
  entries => {
    let isOverImage = false;
    let maxVisibility = 0;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const visibility = entry.intersectionRect.height;
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          isOverImage = entry.target.classList.contains('invert-nav-color');
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

sections.forEach(section => {
  observer.observe(section);
});