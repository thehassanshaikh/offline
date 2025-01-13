 // Simulate page load
 window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');

    // Fade out the loading screen
    loadingScreen.style.transition = 'opacity 0.5s ease';
    loadingScreen.style.opacity = '0';

    // Remove loading screen after fade out
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      content.style.display = 'block';
    }, 2000);
  });

  // close the menu when a menu item is clicked
// Select the checkbox controlling the menu
const checkbox = document.getElementById("luxbar-checkbox");

// Select all menu items
const menuItems = document.querySelectorAll(".luxbar-item a");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Uncheck the checkbox to close the menu
    checkbox.checked = false;
  });
});


// Navbar colour change on overlapping the image
// Select all sections to observe
const sections = document.querySelectorAll('.invert-nav-color');

// Select all navbar links
const navbarLinks = document.querySelectorAll('nav ul li a');

// Function to toggle navbar text color
function toggleNavbarTextColor(isOverImage) {
  navbarLinks.forEach(link => {
    if (isOverImage) {
      link.style.color = '#fff'; // Change text to white
    } else {
      link.style.color = '#000'; // Default text color (black)
    }
  });
}

// IntersectionObserver setup
const observer = new IntersectionObserver(
  entries => {
    let isOverImage = false;
    let maxVisibility = 0;

    // Determine the most visible section
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
    root: null, // Observe within the viewport
    threshold: [0.1, 0.5, 1.0], // Trigger at different visibility levels
  }
);

// Observe each section
sections.forEach(section => {
  observer.observe(section);
});
