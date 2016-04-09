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
mtlLoader.setBaseUrl('src/Streetcar2/');
mtlLoader.setPath('src/Streetcar2/');
mtlLoader.load('3d-model.mtl', function(materials) {
	materials.preload();
	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.setPath('src/Streetcar2/');
	objLoader.load( '3d-model.obj', function (object) {
		object.scale.set(1, 1, 1);
		object.position.z = -300; // negative goes left, positive goes right
		object.position.x = 200; //negative is backwards, positive is forward
		object.rotation.y = Math.PI/2;

		map.add( object );
		streetcar = object;

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

function animate() {
	requestAnimationFrame(animate);
	three.renderer.render(three.scene, three.camera );
}

animate();
setInterval(moveStreetcar, 100);

/* Code to load Map without the material */
var loader = new THREE.OBJLoader( manager );
loader.load( 'src/Map/streetmap.obj', function ( object ) {
	object.scale.set(100, 100, 100);
	object.rotation.x = 3*Math.PI/2;
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
canvas.addEventListener('click', onClick);
// canvas.addEventListener("touchstart", handleStart, false);
// Raycaster
var raycaster = new THREE.Raycaster();
// helper variables
var objX = 0;
var objY = 0;
var count = 0;
var preObj = null;
var mouse = new THREE.Vector2();
var isScaled = false;

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


three.on("argon:realityChange", function(e) {
	realityInit = true;
	var cameraPosition = three.camera.getWorldPosition();

	cameraPosition.x += -800; // x is moving horizontally outward
	cameraPosition.y += 1500;
	cameraPosition.z += -400;
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


});
