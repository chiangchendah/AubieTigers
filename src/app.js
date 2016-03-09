/*
 * Entry file for SystemJS
 **/

// var Cesium = Argon.Cesium;

// // retrieve the immersive context and initialize Three.js rendering
// // AKA initialize Argon...
// var context = Argon.immersiveContext
// var options = THREE.Bootstrap.createArgonOptions( context )
// options.renderer = { klass: THREE.CSS3DRenderer }
// var three = THREE.Bootstrap( options )

var options = THREE.Bootstrap.createArgonOptions( Argon.immersiveContext )
options.renderer = { klass: THREE.WebGLRenderer }
var three = THREE.Bootstrap( options )

var eyeOrigin = three.argon.objectFromEntity(Argon.immersiveContext.eyeOrigin)

// // This table gives information to be displayed and also the position and rotation vectors
// var table = [
//     // [ "N", "North", "(Negative Z)", 0, 0, -100, 0, 0, 0],
//     // [ "S", "South", "(Positive Z)", 0, 0, 100, 0, Math.PI, 0  ],
//     // [ "E", "East", "(Positive X)", 100, 0, 0, 0, -Math.PI/2, 0 ],
//     // [ "W", "West", "(Negative X)", -100, 0, 0, 0, Math.PI/2, 0 ],
//     // [ "U", "Up", "(Positive Y)", 0, 100, 0, Math.PI/2, 0, 0 ],
//     [ "D", "Down", "(Negative Y)", 0, -100, 0, Math.PI/2,  Math.PI, Math.PI]
//   ];

  var objects = []

  var root = new THREE.Object3D()

  // for ( var i = 0; i < table.length; i ++ ) {

    // var item = table[ i ];

    var element = document.createElement( 'div' );
    element.id = 'map';
    // element.style.backgroundColor = 'rgba(200,120,200,1)';

    // var symbol = document.createElement( 'div' );
    // symbol.className = 'symbol';
    // symbol.textContent = item[ 0 ];
    // element.appendChild( symbol );

    // var details = document.createElement( 'div' );
    // details.className = 'details';
    // details.innerHTML = item[ 1 ] + '<br>' + item[ 2 ];
    // element.appendChild( details );

    var object = new THREE.Object3D( element );
    object.matrixAutoUpdate = false;
    // objects.push( object );

    // Add each object our root node
    root.add(object);
  // }

//   // Add the root node to our eyeOrigin
  eyeOrigin.add(root);

//   // Now we just have to position the six elements at the compass points

//   for ( var i = 0; i < objects.length; i ++ ) {

//     var item = table[ i ];
//     var target = new THREE.Object3D();
//     // three position values
//     //     [ "D", "Down", "(Negative Y)", 0, -100, 0, Math.PI/2,  Math.PI, Math.PI]

//     target.position.x = item[ 3 ];
//     target.position.y = item[ 4 ];
//     target.position.z = item[ 5 ];
//     //the three axes of rotation
//     target.rotation.x = item[ 6 ];
//     target.rotation.y = item[ 7 ];
//     target.rotation.z = item[ 8 ];

//   object = objects[ i ];
//     object.position.copy(target.position)
//     object.rotation.copy(target.rotation)
//   object.updateMatrix()
//   }
