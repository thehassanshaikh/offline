  // Import the fluid simulation library
 import WebGLFluidEnhanced from 'webgl-fluid-enhanced';

// Get the container div
const container = document.getElementById('fluid-container');

// Initialize the fluid simulation
const simulation = new WebGLFluidEnhanced(container);
simulation.start();

// Stop the simulation when the page is about to unload
window.addEventListener('beforeunload', () => {
  simulation.stop();
});

simulation.setConfig({
   transparent: flase,
 });