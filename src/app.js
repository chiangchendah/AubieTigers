// /*
//  * AR Map
//  **/

// Argon Initialization
var context = Argon.immersiveContext;
var options = THREE.Bootstrap.createArgonOptions( context );
options.renderer = { klass: THREE.WebGLRenderer };
var three = THREE.Bootstrap( options );

var mapGeoObject = new THREE.Object3D();
var map = new THREE.Object3D();
var streetcar = new THREE.Object3D();

// Helpers
function toFixed(value, precision) {
	var power = Math.pow(10, precision || 0);
	return String(Math.round(value * power) / power);
}

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

// mtlLoader
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
// mtlLoader.load( '', function( materials ) {
// 	// materials.preload();
// 	// console.log("material loaded");
// 	var objLoader = new THREE.OBJLoader();
// 	// objLoader.setMaterials( materials );
// 	objLoader.setPath( 'src/Map/' );
// 	objLoader.load( 'streetmap.obj', function ( object ) {
// 		console.log("object loaded");

// 		object.scale.set(100, 100, 100);
// 		object.rotation.x = 3*Math.PI/2;
// 		//object.position.y = -100;


// 		map.add( object );

// 	}, onProgress, onError );
// });

/* Code to load Map without the material */
var loader = new THREE.OBJLoader( manager );
loader.load( 'src/Map/streetmap.obj', function ( object ) {
	object.scale.set(100, 100, 100);
	object.rotation.x = 3*Math.PI/2;
	streetcar = object;
	map.add(object);
}, onProgress, onError );
/* END code to load map w/o material */

/* Add light */
var ambient = new THREE.AmbientLight( 0x404040 );
three.scene.add( ambient );
// var directionalLight = new THREE.DirectionalLight( 0xffeedd, 0.2 );
// directionalLight.position.set( 0, 0, 1 ).normalize();
// three.scene.add( directionalLight );

// Setup scene
map.rotation.x = - Math.PI / 2;
mapGeoObject.add(map);
three.scene.add(mapGeoObject);

var mapGeoEntity = three.argon.entityFromObject(mapGeoObject);
var realityInit = false;
var mapCartographicDeg = [0,0,0];

/* ************
* Enable interactions with objects in Argon
***************/
var canvas = document.getElementsByTagName("canvas")[0];

// Variables for touch events
var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2};
var state = STATE.NONE,
	prevState = STATE.NONE;

var zoomSpeed = 1.2,
	panSpeed = 0.3,
	noRotate = true,
	noZoom = false,
	noPan = false;

var zoomStart = new THREE.Vector2(),
	zoomEnd = new THREE.Vector2(),
	panStart = new THREE.Vector2(),
	panEnd = new THREE.Vector2();

var touchZoomDistanceStart = 0,
	touchZoomDistanceEnd = 0;

var staticMoving = false,
	dynamicDampingFactor = 0.2;

 var eyeDir = new THREE.Vector3();

// canvas.addEventListener('click', onClick);
canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchmove", handleMove, false);
canvas.addEventListener("touchend", handleEnd, false);

// Raycaster
var raycaster = new THREE.Raycaster();
// helper variables
var objX = 0;
var objY = 0;
var count = 0;
var preObj = null;
var mouse = new THREE.Vector2();
var preMouse = new THREE.Vector2();
var isScaled = false;

/************************
* Helpers Functions
************************/
// Normalize touch (x,y) to the screen size
function getMouseOnScreen(pageX, pageY) {
	var vector = new THREE.Vector2();
	vector.set(
		pageX / window.innerWidth,
		pageY / window.innerHeight);
	return vector;
}

// function to zoom camera
function zoomCamera() {
	var factor;

	if ( state === STATE.ZOOM ) {
		factor = touchZoomDistanceEnd / touchZoomDistanceStart;
		touchZoomDistanceStart = touchZoomDistanceEnd;
		map.scale.x *= factor;
		map.scale.y *= factor;
		map.scale.z *= factor;

	} else {
		factor = 1.0 + (zoomEnd.y - zoomStart.y) * zoomSpeed;

		if ( factor !== 1.0 && factor > 0.0 ) {
			// eye.multiplyScalar( factor );
			map.scale.x *=factor;
			map.scale.y *= factor;
			map.scale.z *= factor;
			if ( staticMoving ) {
				zoomStart.copy( zoomEnd );
			} else {
				zoomStart.y += ( zoomEnd.y - zoomStart.y ) * this.dynamicDampingFactor;
			}
		}
	}
}
// function to pan camera
var pan = new THREE.Vector3();
var mouseChange = new THREE.Vector2();
function panCamera() {
	// var mouseChange = new THREE.Vector2();
	var	objectUp = new THREE.Vector3();
		// pan = new THREE.Vector3();

	mouseChange.copy( panEnd ).sub( panStart );
	
	if ( state === STATE.PAN ) {
		mouseChange.multiplyScalar( eyeDir.length() * panSpeed );

		pan.copy( eyeDir ).cross( three.camera.up ).setLength( mouseChange.x );
		pan.add( objectUp.copy( three.camera.up ).setLength( mouseChange.y ) );

		var rx = new THREE.Vector3(1,0,0);
		var ry = new THREE.Vector3(0,1,0);
		var rz = new THREE.Vector3(0,0,1);
		pan.applyAxisAngle(rx, -Math.PI/2);
		// pan.applyAxisAngle(ry, Math.PI);
		map.position.add(pan);

		panStart.add( mouseChange.subVectors( panEnd, panStart ).multiplyScalar( dynamicDampingFactor ) );

	}
}

// function to update
function update() {
	
	// eyeDir = map.position.sub(three.camera.position);

	if ( ! noZoom ) {
		zoomCamera();
	}

	if ( ! noPan ) {
		panCamera();
	}

}

function handleStart(e) {
	e.preventDefault();

 	switch (e.touches.length) {
 		case 1: 
 			state = STATE.PAN;
 			panStart.copy(getMouseOnScreen(e.touches[0].pageX, e.touches[0].pageY));
 			panEnd.copy(panStart);
 			break;
 		default:
 			state = STATE.ZOOM;
 			var dx = e.touches[0].pageX - e.touches[1].pageX;
 			var dy = e.touches[0].pageY - e.touches[1].pageY;
 			touchZoomDistanceEnd = touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);

 			// var x = ( e.touches[0].pageX + e.touches[1].pageX ) / 2;
 			// var y = ( e.touches[0].pageY + e.touches[1].pageY ) / 2;
 			// panStart.copy(getMouseOnScreen(x, y));
 			// panEnd.copy(panStart);
 			break;
 	}
}

function handleMove(e) {
	e.preventDefault();

 	switch (e.touches.length) {
 		case 1: 
 			panEnd.copy(getMouseOnScreen(e.touches[0].pageX, e.touches[0].pageY));
 			break;
 		default:
 			var dx = e.touches[0].pageX - e.touches[1].pageX;
 			var dy = e.touches[0].pageY - e.touches[1].pageY;
 			touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);

 			// var x = ( e.touches[0].pageX + e.touches[1].pageX ) / 2;
 			// var y = ( e.touches[0].pageY + e.touches[1].pageY ) / 2;
 			// panEnd.copy(getMouseOnScreen(x, y));
 			break;
 	}
}

function handleEnd(e) {
	e.preventDefault();
	
 	switch (e.touches.length) {
 		case 0: 
 			state = STATE.NONE;
 			break;
 	}
}

var realityChanged = 0;
three.on("argon:realityChange", function(e) {
	realityChanged++;
	realityInit = true;
	var cameraPosition = three.camera.getWorldPosition();

	// Adjust the position of the map object, not the camera
	cameraPosition.x -= 1000; // x is moving horizontally outward
	cameraPosition.y += 1500;
	cameraPosition.z -= 500;
	// cameraPosition.z -= 1000;
	mapGeoObject.position.copy(cameraPosition);
	eyeDir = mapGeoObject.position.sub(three.camera.position);
	three.argon.updateEntityFromObject(mapGeoObject);
	mapCartographicDeg = three.argon.getCartographicDegreesFromEntity(mapGeoEntity) || [0,0,0];

	update();
});

var lastInfoText;

three.on( "update", function(e) {
	update();
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

   
	// infoText += "x : " + mapGeoObject.position.x + ", ";
	infoText += "Pan x: " + pan.x + ", ";
	infoText += "Pan y: " + pan.y + ", ";
	infoText += "Pan z: " + pan.z + ", ";
	// infoText += "y : " + mapGeoObject.position.y + ", ";
	// infoText += "x : " + mouseChange.x + ", ";
	// infoText += "y : " + mouseChange.y + ", ";
	// infoText += "EyeL : " + eyeDir.length() + ", ";


    if (lastInfoText !== infoText) { // prevent unecessary DOM invalidations
      elem.innerText = infoText;
      lastInfoText = infoText;
    }

	var is_rotated1 = false;
	var is_rotated2 = false;

	// update();
	// Hardcoded streetcar route
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


function onClick(e) {
	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
	console.log("x: "+mouse.x+" y: "+mouse.y);
	raycaster.setFromCamera(mouse, three.camera);
    var intersects = raycaster.intersectObjects(mapGeoObject.children, true);
    
    if ((intersects.length > 0) && !isScaled) {
        preObj = intersects;
        isScaled = true;
        for (var i = 0; i < intersects.length; i++ ) {
            var obj = intersects[i].object;
            console.log("Object"+ i+":"+obj);

            obj.scale.x = 0.5;
            obj.scale.y = 0.5;
            obj.scale.z = 0.5;
        }
    } else if (isScaled) {
        isScaled = false;
        for (var i = 0; i < preObj.length; i++) {
            var obj = preObj[i].object;
            obj.scale.x = 1;
            obj.scale.y = 1;
            obj.scale.z = 1;
        }
    }
}
