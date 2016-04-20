// /*
//  * AR Map
//  **/

// Argon Initialization
var context = Argon.immersiveContext;
var options = THREE.Bootstrap.createArgonOptions( context );
options.renderer = { klass: THREE.WebGLRenderer };
var three = THREE.Bootstrap( options );
var eyeOrigin = three.argon.objectFromEntity(Argon.immersiveContext.eyeOrigin);

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

/*****
Load Streetcar with Material
******/
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setBaseUrl('src/Streetcar2/');
mtlLoader.setPath('src/Streetcar2/');
mtlLoader.load('the_slim_streetcar.mtl', function(materials) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.setPath('src/Streetcar2/');
	objLoader.load( 'the_slim_streetcar.obj', function (object) {
		object.scale.set(1, 1, 1);
		object.position.z = -300; // negative goes left, positive goes right
		object.position.x = 200; //negative is backwards, positive is forward
		object.rotation.y = Math.PI/2;
		map.add( object );
		streetcar = object;

	}, onProgress, onError );
});

/*****
Load Map
******/
var loader = new THREE.MTLLoader();
loader.setBaseUrl('src/Map/');
loader.setPath('src/Map/');
loader.load('streetmap_bldgs_and_route.mtl', function (materials) {
	console.log("Loaded MTL");
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.load( 'src/Map/streetmap_bldgs_and_route.obj', function (object) {
		console.log("Loaded OBJ");

		object.scale.set(100, 100, 100);
		object.rotation.x = 3 * Math.PI/2;

		map.add(object);
	}, onProgress, onError );
});

// var loader = new THREE.OBJLoader(manager);
// loader.load( 'src/Map/streetmap.obj', function (object) {
// 	console.log("Map Loaded");
// 	object.scale.set(100, 100, 100);
// 	object.rotation.x = 3*Math.PI/2;
// 	map.add(object);
// }, onProgress, onError);

/*********
Load Important Buildings on Map
**********/
var imploader = new THREE.MTLLoader();
imploader.setBaseUrl('src/Map/');
imploader.setPath('src/Map/');
imploader.load('streetmap_impt_bldgs.mtl', function (materials) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.load( 'src/Map/streetmap_impt_bldgs.obj', function (object) {
		object.scale.set(100, 100, 100);
		object.rotation.x = 3 * Math.PI/2;

		map.add(object);
	}, onProgress, onError );
});

/*****
Load Map base
******/
var basemtlLoader = new THREE.MTLLoader();
basemtlLoader.setBaseUrl('src/Map/');
basemtlLoader.setPath('src/Map/');
basemtlLoader.load('streetmap_base.mtl', function (materials) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.load( 'src/Map/streetmap_base.obj', function (object) {
		object.scale.set(100, 100, 100);
		object.rotation.x = 3 * Math.PI/2;

		map.add(object);
	}, onProgress, onError );
});


/********
Create the curved track for the streetcar and enable animation.
*********/
var spline_curve = new THREE.SplineCurve3( [
	new THREE.Vector3(-160, 0, -980),
	new THREE.Vector3(30, 0, -1450),
	new THREE.Vector3(30, 0, -1680),
	new THREE.Vector3(-20, 0, -1750),
	new THREE.Vector3(-180, 0, -1750),
	new THREE.Vector3(-200, 0, -1750),
	new THREE.Vector3(-460, 0, -2150),
	new THREE.Vector3(-530, 0, -2210),
	new THREE.Vector3(-920, 0, -2220),
	new THREE.Vector3(-980, 0, -2170),
	new THREE.Vector3(-980, 0, -2000),
	new THREE.Vector3(-960, 0, -1960),
	new THREE.Vector3(-860, 0, -1930),
	new THREE.Vector3(-770, 0, -1850),
	new THREE.Vector3(-610, 0, -1600),
	new THREE.Vector3(-300, 0, -1120),
	new THREE.Vector3(-195, 0, -950),
	new THREE.Vector3(-100, 0, -800),
	new THREE.Vector3(-70, 0, -700),
	new THREE.Vector3(-165, 0, -390),
	new THREE.Vector3(-100, 0, -290),
	new THREE.Vector3(550, 0, -290),
	new THREE.Vector3(700, 0, -285),
	new THREE.Vector3(1495, 0, -280),
	new THREE.Vector3(1650, 0, -270),
	new THREE.Vector3(2800, 0, -260),
	new THREE.Vector3(3050, 0, -250),
	new THREE.Vector3(3100, 0, -320),
	new THREE.Vector3(3100, 0, -600),
	new THREE.Vector3(3050, 0, -670),
	new THREE.Vector3(3000, 0, -670),
	new THREE.Vector3(2500, 0, -680),
	new THREE.Vector3(2000, 0, -680),
	new THREE.Vector3(1500, 0, -690),
	new THREE.Vector3(90, 0, -705),
	//new THREE.Vector3(0, 0, -740),
	new THREE.Vector3(-120, 0, -900),
	new THREE.Vector3(-150, 0, -930),
	new THREE.Vector3(-160, 0, -960),
	new THREE.Vector3(-160, 0, -990),
	//new THREE.Vector3(-140, 0, -1000),
] );

var spline_geom = new THREE.Geometry();
var spline_points = spline_curve.getPoints(1000); //get X points on the spline
var spline_material = new THREE.LineBasicMaterial({ opacity: 0, transparent: true});

for( var i = 0; i < spline_points.length; i++ ) {
	spline_geom.vertices.push(spline_points[i]);
}

//Create the final Object3d to add to the scene
var spline_object = new THREE.Line(spline_geom, spline_material);
map.add(spline_object);

/***********
* For Streetcar animation
************/
/* The following four variables are used in the moveStreetcar function */
var counter = 0;
var tangent = new THREE.Vector3();
var axis = new THREE.Vector3();
var up = new THREE.Vector3(0, 0, 1);

//Functions to animate the streetcar along the spline
function moveStreetcar() {
	if ( counter <= 1 ) {
		streetcar.position.copy(spline_curve.getPointAt(counter));
        tangent = spline_curve.getTangentAt(counter).normalize();
        axis.crossVectors(up, tangent).normalize();
        var radians = Math.acos(up.dot(tangent));
        streetcar.quaternion.setFromAxisAngle(axis, radians);
        counter += 0.002;
	} else {
		counter = 0;
	}
}

// function animate() {
// 	requestAnimationFrame(animate);
// 	three.renderer.render(three.scene, three.camera );
// }
//
// animate();
// setInterval(moveStreetcar, 100);

/***********
* Lighting work
************/
var ambient = new THREE.AmbientLight( 0x404040 );
three.scene.add( ambient );
var directionalLight = new THREE.DirectionalLight( 0xffeedd, 0.2 );
directionalLight.position.set( 0, 0, 1 ).normalize();
three.scene.add( directionalLight );

/***********
* Sam trying to get buzzbox to be relative to world
************/
//var buzz = new THREE.Object3D();
var geometry = new THREE.BoxGeometry(20, 20, 20);
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var buzz = new THREE.Mesh(geometry, material);
//buzz.position.y = 0;
buzz.scale.set(20, 20, 20);
three.scene.add(buzz);
/*var buzzloader = new THREE.TextureLoader();
buzzloader.load( 'src/left_arrow.png', function ( texture ) {
	var geometry = new THREE.BoxGeometry(20, 20, 20);
	var material = new THREE.MeshBasicMaterial( { map: texture } );
	var mesh = new THREE.Mesh( geometry, material );
	mesh.scale.set(20,20,20);
	buzz.add( mesh );
	buzz.position.y = 500; //negative is backwards, positive is forward

});
*/
// var gatechGeo = new Argon.Cesium.Entity({
// 	name: "Georgia Tech",
// 	position: Argon.Cesium.Cartesian3.fromDegrees(-84.39, 33.777222)
// });
//
// var gatechGeoTarget = three.argon.objectFromEntity(gatechGeo);
// gatechGeoTarget.add(buzz);
// three.scene.add(gatechGeoTarget);


/***********
* For Argon rendering
************/
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

canvas.addEventListener('click', onClick);
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
var infoText = "Welcome to Auburn Avenue";

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
function update(state) {
	// eyeDir = map.position.sub(three.camera.position);

	if ( ! noZoom ) {
		zoomCamera();
	}

	if ( ! noPan ) {
		panCamera();
	}

	var elem = document.getElementById('location');
	
	if (!realityInit) {
		elem.innerText = "No Reality Yet";
		return;
	}

	var cameraPos = three.camera.getWorldPosition();
	var mapPos = map.getWorldPosition();
	var distanceToMap = cameraPos.distanceTo(mapPos);

	// var infoText = "Geospatial Argon example:\n";

	// infoText += "Pan x: " + pan.x + ", ";
	// infoText += "Pan y: " + pan.y + ", ";
	// infoText += "Pan z: " + pan.z + ", ";
	
    if (lastInfoText !== infoText) { // prevent unecessary DOM invalidations
      elem.innerText = infoText;
      lastInfoText = infoText;
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

	cameraPosition.x += -800; // x is moving horizontally outward
	cameraPosition.y += 2000;
	cameraPosition.z += -400;
	mapGeoObject.position.copy(cameraPosition);
	eyeDir = mapGeoObject.position.sub(three.camera.position);
	three.argon.updateEntityFromObject(mapGeoObject);
	mapCartographicDeg = three.argon.getCartographicDegreesFromEntity(mapGeoEntity) || [0,0,0];
	update();
});

var lastInfoText;

/***********
* Argon's Update Loop
************/
three.on( "update", function(e) {
	var state = e.argonState;
	update(state);
});

function onClick(e) {
	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
	console.log("x: "+mouse.x+" y: "+mouse.y);
	raycaster.setFromCamera(mouse, three.camera);
    var intersects = raycaster.intersectObjects(mapGeoObject.children, true);
    console.log(intersects);

    if ((intersects.length > 0) && !isScaled) {

        preObj = intersects;
        isScaled = true;
        for (var i = 0; i < intersects.length; i++ ) {
            var obj = intersects[i].object;
            console.log("Object"+ i+":"+obj.name);
            var building_name = obj.name;
            if (building_name.includes('b_')) {
            	infoText = "Odd Fellows Building and Auditorium";
            }
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

var tenthandhome = "251 10th St NW, Atlanta, GA 30318";
var startLocation = tenthandhome;
var endLocation = tenthandhome;
var directionsService;
// Google Map Direction Services
function initMap() {
	directionsService = new google.maps.DirectionsService;
	// var directionsDisplay = new google.maps.DirectionsRenderer;
	// var map = new google.maps.Map(document.getElementById('map'), {
	//   zoom: 7,
	//   center: {lat: 41.85, lng: -87.65}
	// });
	// directionsDisplay.setMap(map);

	var onChangeHandler = function() {
	  calculateAndDisplayRoute(directionsService);
	};
	// document.getElementById('start').addEventListener('change', onChangeHandler);
	// document.getElementById('end').addEventListener('change', onChangeHandler);

	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      var pos = {
	        lat: position.coords.latitude,
	        lng: position.coords.longitude
	      };
	      startLocation = pos;
	      console.log(pos);
	      console.log("Current location loaded!");
	    }, function() {
	      handleLocationError(true, pos);
	    });
	  } else {
	    // Browser doesn't support Geolocation
	    console.log("Browser doesn't support geolocation");
	  }
}

function calculateAndDisplayRoute(directionsService) {
	directionsService.route({
	  origin: startLocation,
	  destination: endLocation,
	  travelMode: google.maps.TravelMode.WALKING
	}, function(response, status) {
	  if (status === google.maps.DirectionsStatus.OK) {
	    // directionsDisplay.setDirections(response);
	    console.log(response.routes[0].legs[0].steps);
	  } else {
	    console.log('Directions request failed due to ' + status);
	  }
	});
}

function handleLocationError(browserHasGeolocation, pos) {
  console.log(pos);
  console.log(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
