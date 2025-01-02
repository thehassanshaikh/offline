import Lenis from "https://cdn.skypack.dev/@studio-freight/lenis@0.1.12";

const lenis = new Lenis({
  lerp: 0.1,
  smooth: true,
  direction: "vertical",
});
window.lenis = lenis;

//get scroll value
lenis.on("scroll", ({ scroll, limit }) => {
  console.log({ scroll, limit });
});

function raf() {
  lenis.raf();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    lenis.scrollTo(this.getAttribute("href"));
  });
});

// Smooth scrolling for navigation links
const links = document.querySelectorAll("nav a");
links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior

    const targetID = link.getAttribute("href").substring(1); // Get target section ID
    const targetSection = document.getElementById(targetID);

    if (targetSection) {
      // Scroll smoothly to the target section
      lenis.scrollTo(targetSection);
    } else {
      console.error(`Target section with ID '${targetID}' not found.`);
    }
  });
});
