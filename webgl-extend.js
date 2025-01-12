 // Import the fluid simulation library
 import WebGLFluidEnhanced from 'webgl-fluid-enhanced';

 // Get the container div
 const container = document.getElementById('fluid-container');

 // Initialize the fluid simulation
 const simulation = new WebGLFluidEnhanced(container);
 simulation.start();

 
  // Trigger a random splat every 3 seconds
setInterval(() => {
  simulation.multipleSplats(10); // 1 random splat
}, 3000);



 // Stop the simulation when the page is about to unload
 window.addEventListener('beforeunload', () => {
   simulation.stop();
 });

 simulation.setConfig({
  colorPalette: ['#120F02', '#91760D', '#BC9E22', '#D3BC60', '#E1D18F','#F0E7C4','#241E03'],
  backgroundColor: '#B59410',
  transparent: false,

});