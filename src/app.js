// /*
//  * Entry file for SystemJS
//  **/

// var Cesium = Argon.Cesium;

// // retrieve the immersive context and initialize Three.js rendering
// // AKA initialize Argon...

function toFixed(value, precision) {
	var power = Math.pow(10, precision || 0);
	return String(Math.round(value * power) / power);
}

var context = Argon.immersiveContext
var options = THREE.Bootstrap.createArgonOptions( context )
// options.renderer = { klass: THREE.CSS3DRenderer }
var three = THREE.Bootstrap( options )

var mapGeoObject = new THREE.Object3D();
var map = new THREE.Object3D();
var texture = new THREE.Texture();
var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
};

var onError = function ( xhr ) {
};

var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
	console.log( item, loaded, total);
}
var loader = new THREE.ImageLoader( manager );
loader.load( 'UV_Grid_Sm.jpg',  function(image) {
	texture.image = image;
	texture.needsUpdate = true;
});



// mtlLoader
var streetcar = new THREE.Object3D();

//code to load streetcar with material - but adding materials not working
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setBaseUrl( 'src/Streetcar2/' );
mtlLoader.setPath( 'src/Streetcar2/' );
mtlLoader.load( '3d-model.mtl', function( materials ) {
	materials.preload();
	console.log("material loaded");
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials( materials );
	objLoader.setPath( 'src/Streetcar2/' );
	objLoader.load( '3d-model.obj', function ( object ) {
		console.log("object loaded");

		object.scale.set(0.01, 0.01, 0.01);
		//object.position.y = -250; // negative goes down, positive goes up
		object.position.z = -300; // negative goes left, positive goes right
		object.position.x = 200; //negative is backwards, positive is forward
		object.rotation.y = Math.PI/2;

		map.add( object );
		streetcar = object;

	}, onProgress, onError );
});

/* Code to load Auburn Ave Map */
mtlLoader.load( '', function( materials ) {
	// materials.preload();
	// console.log("material loaded");
	var objLoader = new THREE.OBJLoader();
	// objLoader.setMaterials( materials );
	objLoader.setPath( 'src/Map/' );
	objLoader.load( 'streetmap.obj', function ( object ) {
		console.log("object loaded");

		object.scale.set(100, 100, 100);
		object.rotation.x = 3*Math.PI/2;
		//object.position.y = -100;


		map.add( object );

	}, onProgress, onError );
});


/* Code to load streetcar without the material */
/*var loader = new THREE.OBJLoader( manager );
loader.load( 'src/Streetcar2/3d-model.obj', function ( object ) {
	object.traverse( function ( child ) {
		if (child instanceof THREE.Mesh ) {
			child.material.map = texture;
		}
	});
	object.position.y = -95;
	streetcar = object;
	map.add(object);
}, onProgress, onError );
*/
/* END code to load streetcar w/o material */

/* Code to load Auburn Avenue map */
// var aamap_loader = new THREE.OBJLoader( manager );
// aamap_loader.load( 'src/Map/Auburn Ave Street Map.obj', function ( object ) {
// 	object.traverse( function ( child ) {
// 		if (child instanceof THREE.Mesh ) {
// 			child.material.map = texture;
// 		}
// 	});
// 	object.scale.set(0.3, 0.3, 0.3);
// 	object.rotation.x = Math.PI/4;
// 	object.position.y = -300;
// 	map.add(object);
// }, onProgress, onError );
/* End code to load Auburn Avenue map */

/* Add light */
var ambient = new THREE.AmbientLight( 0x404040 );
three.scene.add( ambient );
// var directionalLight = new THREE.DirectionalLight( 0xffeedd, 0.2 );
// directionalLight.position.set( 0, 0, 1 ).normalize();
// three.scene.add( directionalLight );


map.rotation.x = -1.57;

mapGeoObject.add(map)
three.scene.add(mapGeoObject);
var mapGeoEntity = three.argon.entityFromObject(mapGeoObject);

var realityInit = false;
var mapCartographicDeg = [0,0,0]

three.on("argon:realityChange", function(e) {
	realityInit = true;
	var cameraPosition = three.camera.getWorldPosition();
	cameraPosition.x += 100; // x is moving horizontally outward
	cameraPosition.y += 500;
	mapGeoObject.position.copy(cameraPosition);
	three.argon.updateEntityFromObject(mapGeoObject);
	mapCartographicDeg = three.argon.getCartographicDegreesFromEntity(mapGeoEntity) || [0,0,0];
});

var lastInfoText;

three.on( "update", function(e) {
	var elem = document.getElementById('location');
	var state = e.argonState;

	if (!realityInit) {
		elem.innerText = "No Reality Yet";
		return;
	}

	var gpsCartographicDeg = [0,0,0];
	if(state.position.cartographicDegrees) {
		gpsCartographicDeg = state.position.cartographicDegrees;
	}

	var cameraPos = three.camera.getWorldPosition();
	var mapPos = map.getWorldPosition();
	var distanceToMap = cameraPos.distanceTo(mapPos);

	var infoText = "Geospatial Argon example:\n";

	// infoText += "eye (" + toFixed(gpsCartographicDeg[0],6) + ", ";
    // infoText += toFixed(gpsCartographicDeg[1], 6) + ", " + toFixed(gpsCartographicDeg[2], 2) + ")\n";
    // infoText += "cube(" + toFixed(mapCartographicDeg[0], 6) + ", ";
    // infoText += toFixed(mapCartographicDeg[1], 6) + ", " + toFixed(mapCartographicDeg[2], 2) + ")\n";
    // infoText += "distance to GT (" + toFixed(distanceToMap,2) + ")";

	infoText += "x : " + streetcar.position.x + ", ";
	infoText += "y : " + streetcar.position.y + ", ";
	infoText += "z : " + streetcar.position.z + ", ";


    if (lastInfoText !== infoText) { // prevent unecessary DOM invalidations
      elem.innerText = infoText;
      lastInfoText = infoText;
    }

	var is_rotated1 = false;
	var is_rotated2 = false;


	if(streetcar.position.x < 3000 && streetcar.position.z == -300) //need more conditions
	{
		streetcar.translateZ(10);
	}
	else if (streetcar.position.z > -700 && streetcar.position.x == 3000)
	{
		streetcar.translateX(10); // original
	}
	else if (streetcar.position.z == -700 && streetcar.position.x > 0)
	//else if (streetcar.position.x == -700 && streetcar.position.z < 0)
	{
		streetcar.translateZ(-10);
		//streetcar.translateZ(10);
	}




});
