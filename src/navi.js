
//This example is a simplified version of the three.js periodic table example adapted to Argon.
// For the full version, see http://threejs.org/examples/#css3d_periodictable
//

var options = THREE.Bootstrap.createArgonOptions( Argon.immersiveContext )
options.renderer = { klass: THREE.CSS3DRenderer }
var three = THREE.Bootstrap( options )

var eyeOrigin = three.argon.objectFromEntity(Argon.immersiveContext.eyeOrigin)

var sign = new THREE.CSS3DObject(document.getElementById("sign"));
    sign.position.set(0, 0, -600);
    sign.rotation.x = 0;
    sign.rotation.y = 0;
    sign.rotation.z = 0;
    sign.updateMatrix();


var root = new THREE.Object3D()
root.add(sign);

// Add the root node to our eyeOrigin
eyeOrigin.add(root)

