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
