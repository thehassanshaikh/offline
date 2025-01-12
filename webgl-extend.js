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
  colorPalette: ['#cc211b', '#f1c593', '#e87e54', '#f193a7', '#ec6fa9'],
  backgroundColor: '#020202',
  densityDissipation: 3,
  colorUpdateSpeed: 5,
  hover: false,
  brightness: 0.6,
  velocityDissipation: 0.5,
  bloom: false,
});