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
// var texture = new THREE.Texture();
var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
};

var onError = function ( xhr ) {
};
// var manager = new THREE.LoadingManager();
// manager.onProgress = function ( item, loaded, total ) {
// 	console.log( item, loaded, total);
// }
// var loader = new THREE.ImageLoader( manager );
// loader.load( 'UV_Grid_Sm.jpg',  function(image) {
// 	texture.image = image;
// 	texture.needsUpdate = true;
// });

// mtlLoader
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setBaseUrl( 'src/cs_italy/' );
mtlLoader.setPath( 'src/cs_italy/' );
// mtlLoader.setBaseUrl('src/muhammer/');
// mtlLoader.setPath('src/muhammer/');
mtlLoader.load( 'cs_italy.mtl', function( materials ) {

	materials.preload();
    materials.minFilter = THREE.LinearFilter
    console.log("material loaded");
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials( materials );
	objLoader.setPath( 'src/cs_italy/' );
	objLoader.load( 'cs_italy.obj', function ( object ) {

		console.log("cs cs_italy object loaded");
		object.position.y = - 50;
        object.scale.set(0.015, 0.015, 0.015);
		map.add( object );

	}, onProgress, onError );
    console.log(objLoader);

});

var ambient = new THREE.AmbientLight( 0x444444 );
three.scene.add( ambient );

var directionalLight = new THREE.DirectionalLight( 0xffeedd );
directionalLight.position.set( 0, 0, 1 ).normalize();
three.scene.add( directionalLight );

map.rotation.x = -1.57;
// map.rotation.y = 0.52;


// var loader = new THREE.OBJLoader( manager );
// loader.load( 'src/Muhammer.obj', function ( object ) {
// 	// object.traverse( function ( child ) {
// 	// 	// if (child instanceof THREE.Mesh ) {
// 	// 	// 	// child.material.map = texture;
// 	// 	// }
// 	// });
// 	// object.position.y = -95;
// 	map.add(object);
// }, onProgress, onError );


mapGeoObject.add(map)
three.scene.add(mapGeoObject);
var mapGeoEntity = three.argon.entityFromObject(mapGeoObject);

var realityInit = false;
var mapCartographicDeg = [0,0,0]

var originPos = null;

three.on("argon:realityChange", function(e) {
	realityInit = true;

	var cameraPosition = three.camera.getWorldPosition();
	cameraPosition.x += 5;
    // if (originPos === null) {
        originPos = cameraPosition;
    // }
	mapGeoObject.position.copy(originPos);
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

	infoText += "eye (" + toFixed(gpsCartographicDeg[0],6) + ", ";
    infoText += toFixed(gpsCartographicDeg[1], 6) + ", " + toFixed(gpsCartographicDeg[2], 2) + ")\n";
    infoText += "cube(" + toFixed(mapCartographicDeg[0], 6) + ", ";
    infoText += toFixed(mapCartographicDeg[1], 6) + ", " + toFixed(mapCartographicDeg[2], 2) + ")\n";
    infoText += "distance to GT (" + toFixed(distanceToMap,2) + ")";

    if (lastInfoText !== infoText) { // prevent unecessary DOM invalidations
      elem.innerText = infoText;
      lastInfoText = infoText;
    }

});


