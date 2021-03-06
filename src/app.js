/**

The Aubie Tigers

Group Members:

Samuel Cheng (samlcheng@gatech.edu)
Chen Dah Chiang (David) (chiang.c@gatech.edu)
Yiming Pu (Amy) (amyyimingpu@gatech.edu)
Xiaoxuan Wang (Cheryl) (wangxx@gatech.edu)

Project Idea:

AR Map

The AR map is an interactive map that will be given to Auburn Avenue visitors. It functions as an ordinary map but when viewed via the Argon browser, it reveals an AR version of the Atlanta Streetcar as it travels its route. As it travels around the points, the user will be able to tap on various pop-up information displays and learn about the history of sites at that location.

Edit:

We are trying to support tourists in the Auburn Avenue area who are interested in learning more about points of interest. When the user has the phone tilted downwards, they see a virtual map with 3D buildings and places of interest. When they rotate the phone up, it becomes a camera which will display either navigation related information or just a regular camera.

The map is always visible when the user points the camera downward. It functions kind of like page mode for Argon.

**/

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
mtlLoader.load('streetcar.mtl', function(materials) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.setPath('src/Streetcar2/');
	objLoader.load( 'streetcar_y.obj', function (object) {
		object.scale.set(100, 100, 100);
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
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.load( 'src/Map/streetmap_bldgs_and_route.obj', function (object) {
		object.scale.set(100, 100, 100);
		map.add(object);
	}, onProgress, onError );
});

/*****
Load Important Buildings on Map
******/
var imploader = new THREE.MTLLoader();
imploader.setBaseUrl('src/Map/');
imploader.setPath('src/Map/');
imploader.load('streetmap_impt_bldgs.mtl', function (materials) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.load( 'src/Map/streetmap_impt_bldgs.obj', function (object) {
		object.scale.set(100, 100, 100);
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
		map.add(object);
	}, onProgress, onError );
});

/*****
Create the curved track for the streetcar and enable animation.
******/
// x becomes y, z becomes -x, y becomes -z
var spline_curve = new THREE.SplineCurve3( [
	new THREE.Vector3(-160, 980, 0),
	new THREE.Vector3(30, 1450, 0),
	new THREE.Vector3(30, 1680, 0),
	new THREE.Vector3(-20, 1750, 0),
	new THREE.Vector3(-180, 1750, 0),
	new THREE.Vector3(-200, 1750, 0),
	new THREE.Vector3(-460, 2150, 0),
	new THREE.Vector3(-530, 2210, 0),
	new THREE.Vector3(-920, 2220, 0),
	new THREE.Vector3(-980, 2170, 0),
	new THREE.Vector3(-980, 2000, 0),
	new THREE.Vector3(-960, 1960, 0),
	new THREE.Vector3(-860, 1930, 0),
	new THREE.Vector3(-770, 1850, 0),
	new THREE.Vector3(-610, 1600, 0),
	new THREE.Vector3(-300, 1120, 0),
	new THREE.Vector3(-195, 950, 0),
	new THREE.Vector3(-100, 800, 0),
	new THREE.Vector3(-70, 700, 0),
	new THREE.Vector3(-165, 390, 0),
	new THREE.Vector3(-100, 290, 0),
	new THREE.Vector3(550, 290, 0),
	new THREE.Vector3(700, 285, 0),
	new THREE.Vector3(1495, 280, 0),
	new THREE.Vector3(1650, 270, 0),
	new THREE.Vector3(2800, 260, 0),
	new THREE.Vector3(3050, 250, 0),
	new THREE.Vector3(3100, 320, 0),
	new THREE.Vector3(3100, 600, 0),
	new THREE.Vector3(3050, 670, 0),
	new THREE.Vector3(3000, 670, 0),
	new THREE.Vector3(2500, 680, 0),
	new THREE.Vector3(2000, 680, 0),
	new THREE.Vector3(1500, 690, 0),
	new THREE.Vector3(90, 705, 0),
	new THREE.Vector3(-120, 900, 0),
	new THREE.Vector3(-150, 930, 0),
	new THREE.Vector3(-160, 960, 0),
	new THREE.Vector3(-160, 990, 0)]);

var spline_geom = new THREE.Geometry();
var spline_points = spline_curve.getPoints(1000); //get 1000 points on the spline
var spline_material = new THREE.LineBasicMaterial({ opacity: 0, transparent: true});

for( var i = 0; i < spline_points.length; i++ ) {
	spline_geom.vertices.push(spline_points[i]);
}

// Create the final Object3d to add to the scene
var spline_object = new THREE.Line(spline_geom, spline_material);
map.add(spline_object);

/*****
Streetcar Animation
******/
// The following four variables are used in the moveStreetcar function
var counter = 0;
var tangent = new THREE.Vector3();
var axis = new THREE.Vector3();
var up = new THREE.Vector3(0, 1, 0);

// Functions to animate the streetcar along the spline
function moveStreetcar() {
	if ( counter <= 1 ) {
		streetcar.position.copy(spline_curve.getPointAt(counter));
		tangent = spline_curve.getTangentAt(counter).normalize();
		axis.crossVectors(up, tangent).normalize();
		var radians = Math.acos(up.dot(tangent));
		streetcar.quaternion.setFromAxisAngle(axis, radians);
        counter += 0.002;
	}
	else {
		counter = 0;
	}
}

function animate() {
	requestAnimationFrame(animate);
	three.renderer.render(three.scene, three.camera );
}

animate();
setInterval(moveStreetcar, 100);

/*****
Lighting Work
******/
var ambient = new THREE.AmbientLight( 0x404040 );
three.scene.add( ambient );
var directionalLight = new THREE.DirectionalLight( 0xffeedd, 0.2 );
directionalLight.position.set( 0, 0, 1 ).normalize();
three.scene.add( directionalLight );

/*****
For Argon Rendering
******/
// Setup scene
mapGeoObject.add(map);
three.scene.add(mapGeoObject);

var mapGeoEntity = three.argon.entityFromObject(mapGeoObject);
var realityInit = false;
var mapCartographicDeg = [0,0,0];

/*****
Enable interactions with Objects in Argon
******/
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
// Helper variables
var objX = 0;
var objY = 0;
var count = 0;
var preObj = null;
var mouse = new THREE.Vector2();
var preMouse = new THREE.Vector2();
var isScaled = false;
var infoText = "Welcome to Auburn Avenue";

/*****
Helpers Functions
******/
// Normalize touch (x,y) to the screen size
function getMouseOnScreen(pageX, pageY) {
	var vector = new THREE.Vector2();
	vector.set(
		pageX / window.innerWidth,
		pageY / window.innerHeight);
	return vector;
}

// Function to zoom camera
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

// Function to pan camera
var pan = new THREE.Vector3();
var mouseChange = new THREE.Vector2();
function panCamera() {
	var	objectUp = new THREE.Vector3();
	mouseChange.copy( panEnd ).sub( panStart );

	if ( state === STATE.PAN ) {
		mouseChange.multiplyScalar( eyeDir.length() * panSpeed );
		pan.copy( eyeDir ).cross( three.camera.up ).setLength( mouseChange.x );
		pan.add( objectUp.copy( three.camera.up ).setLength( mouseChange.y ) );
		var rx = new THREE.Vector3(1,0,0);
		var ry = new THREE.Vector3(0,1,0);
		var rz = new THREE.Vector3(0,0,1);
		pan.applyAxisAngle(rx, -Math.PI/2);
		map.position.add(pan);
		panStart.add( mouseChange.subVectors( panEnd, panStart ).multiplyScalar( dynamicDampingFactor ) );
	}
}

// Function to update
function update() {
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
	cameraPosition.y += 4000;
	cameraPosition.z += 400;

	mapGeoObject.position.copy(cameraPosition);
	eyeDir = mapGeoObject.position.sub(three.camera.position);
	three.argon.updateEntityFromObject(mapGeoObject);
	mapCartographicDeg = three.argon.getCartographicDegreesFromEntity(mapGeoEntity) || [0,0,0];
	update();
});

var lastInfoText;

/*****
Argon's Update Loop
******/
three.on( "update", function(e) {
	update();
	var elem = document.getElementById('location');

	if (!realityInit) {
		elem.innerText = "No Reality Yet";
		return;
	}

	var cameraPos = three.camera.getWorldPosition();
	var mapPos = map.getWorldPosition();
	var distanceToMap = cameraPos.distanceTo(mapPos);

	elem.innerText = infoText;
    if (lastInfoText !== infoText) { // prevent unecessary DOM invalidations
      elem.innerText = infoText;
      lastInfoText = infoText;
  	}
});

function onClick(e) {
	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
	console.log("x: "+mouse.x+" y: "+mouse.y);
	raycaster.setFromCamera(mouse, three.camera);
    var intersects = raycaster.intersectObjects(mapGeoObject.children, true);
    console.log(intersects);
    infoText = "Odd Fellows Building and Auditorium";
    if (intersects.length > 0) {

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

    }
}

var tenthandhome = "251 10th St NW, Atlanta, GA 30318";
var startLocation = tenthandhome;
var endLocation = tenthandhome;
var directionsService;
// Google Map Direction Services
function initMap() {
	directionsService = new google.maps.DirectionsService;

	var onChangeHandler = function() {
	  calculateAndDisplayRoute(directionsService);
	};

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
	    // browser doesn't support Geolocation
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
