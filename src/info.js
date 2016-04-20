
//This example is a simplified version of the three.js periodic table example adapted to Argon.
// For the full version, see http://threejs.org/examples/#css3d_periodictable
//

var options = THREE.Bootstrap.createArgonOptions( Argon.immersiveContext )
options.renderer = { klass: THREE.CSS3DRenderer }
var three = THREE.Bootstrap( options )

var eyeOrigin = three.argon.objectFromEntity(Argon.immersiveContext.eyeOrigin)

// This table gives information to be displayed and also the position and rotation vectors
var table = [
    [ "p1.jpg" ],
    [ "p2.jpg" ],
    [ "p3.jpg" ],
    [ "p4.jpg" ],
    [ "p5.jpg" ],
    [ "p6.jpg" ],
    [ "p7.jpg" ],
    [ "p8.jpg" ],
    [ "p9.jpg" ]
  ];

  var objects = []

  var root = new THREE.Object3D()

  for ( var i = 0; i < table.length; i ++ ) {

    var item = table[ i ];

    var element = document.createElement( 'div' );
    console.log(item[0]);
    element.className = 'picture';
    element.innerHTML = '<img src="src/images/b7/' + item[0] + '">';

    var object = new THREE.CSS3DObject( element );
	object.matrixAutoUpdate = false;
    objects.push( object );

    // Add each object our root node
    root.add(object);
  }

 	var desc = new THREE.CSS3DObject(document.getElementById("description"));
	objects.push(desc);
	root.add(desc);


	// Add the root node to our eyeOrigin
	eyeOrigin.add(root)

	// Now we just have to position the six elements at the compass points
var vector = new THREE.Vector3(0, 0, 0);
for ( var i = 0; i < objects.length; i ++ ) {

	var item = objects[ i ];
	var target = new THREE.Object3D();
	var phi = Math.acos( -1 + ( 2 * i ) / objects.length );
    var theta = Math.sqrt( objects.length * Math.PI ) * phi;
    var target = new THREE.Object3D();

    target.position.x = 800 * Math.cos( theta ) * Math.sin( phi );
    target.position.y = 800 * Math.sin( theta ) * Math.sin( phi );
    target.position.z = 800 * Math.cos( phi );

    target.lookAt( vector );

    item.position.copy(target.position);
	item.rotation.copy(target.rotation);
	item.updateMatrix();

}
