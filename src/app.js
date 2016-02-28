/*
 * Entry file for SystemJS
 **/

var Cesium = Argon.Cesium;

// retrieve the immersive context and initialize Three.js rendering
// AKA initialize Argon...
var context = Argon.immersiveContext
var options = THREE.Bootstrap.createArgonOptions( context )
options.renderer = { klass: THREE.CSS3DRenderer }
var three = THREE.Bootstrap( options )
