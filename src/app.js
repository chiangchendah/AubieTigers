function toFixed(value, precision) {
var power = Math.pow(10, precision || 0);
return String(Math.round(value * power) / power);
}
var texture = new THREE.Texture();
var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
};

var onError = function ( xhr ) {
};
function applyVertexColors( g, c ) {

	g.faces.forEach( function( f ) {

		var n = ( f instanceof THREE.Face3 ) ? 3 : 4;

		for( var j = 0; j < n; j ++ ) {

			f.vertexColors[ j ] = c;

		}

	} );

}
var context = Argon.immersiveContext
var options = THREE.Bootstrap.createArgonOptions( context )
options.renderer = { klass: THREE.WebGLRenderer }
var three = THREE.Bootstrap( options )

var mapGeoObject = new THREE.Object3D();
var map = new THREE.Object3D();

var geometry = new THREE.Geometry(),
	pickingGeometry = new THREE.Geometry(),
	pickingMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } ),
	defaultMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, shininess: 0	} );
var pickingData = [];
// Define object geometry data
var geom = new THREE.BoxGeometry( 100, 100, 100 );
var color = new THREE.Color();

var matrix = new THREE.Matrix4();
var quaternion = new THREE.Quaternion();

var position = new THREE.Vector3();
position.x = 50;
position.y = 50;
position.z = 50;

var rotation = new THREE.Euler();
rotation.x = Math.random() * 2 * Math.PI;
rotation.y = Math.random() * 2 * Math.PI;
rotation.z = Math.random() * 2 * Math.PI;

var scale = new THREE.Vector3();
scale.set(1,1,1);

quaternion.setFromEuler( rotation, false );
matrix.compose( position, quaternion, scale );

// give the geom's vertices a random color, to be displayed

applyVertexColors( geom, color.setHex( Math.random() * 0xffffff ) );

geometry.merge( geom, matrix );

// give the geom's vertices a color corresponding to the "id"

applyVertexColors( geom, color.setHex( 0 ) );

pickingGeometry.merge( geom, matrix );

pickingData[ 0 ] = {

	position: position,
	rotation: rotation,
	scale: scale

};
var mapMesh = new THREE.Mesh(geometry, defaultMaterial);
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
		object.position.y = - 100;
        object.scale.set(0.015, 0.015, 0.015);
		map.add( object );

	}, onProgress, onError );
    console.log(objLoader);

});
mapGeoObject.add(map);
three.scene.add(mapGeoObject);
map.rotation.x = - Math.PI / 2;

var ambient = new THREE.AmbientLight( 0x444444 );
three.scene.add( ambient );

var directionalLight = new THREE.DirectionalLight( 0xffeedd );
directionalLight.position.set( 0, 0, 1 ).normalize();
three.scene.add( directionalLight );

var canvas = document.getElementsByTagName("canvas")[0];
console.log(canvas);
canvas.addEventListener('click', onClick);
canvas.addEventListener("touchstart", handleStart, false);

var mapGeoEntity = three.argon.entityFromObject(mapGeoObject);
var realityInit = false;
var mapCartographicDeg = [0,0,0]

three.on("argon:realityChange", function(e) {
	realityInit = true;

	var cameraPosition = three.camera.getWorldPosition();
	cameraPosition.x += 5;
    originPos = cameraPosition;
	mapGeoObject.position.copy(originPos);
	three.argon.updateEntityFromObject(mapGeoObject);

	mapCartographicDeg = three.argon.getCartographicDegreesFromEntity(mapGeoEntity) || [0,0,0];
});
var raycaster = new THREE.Raycaster();

var objX = 0;
var objY = 0;
var count = 0;
var touchX = 0, touchY = 0;

var preObj = null;
function onClick(e) {
	console.log("Clicked!");
	count++;
	mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;	
	console.log("x: "+mouse.x+" y: "+mouse.y);
	console.log("camera: "+three.camera);
	raycaster.setFromCamera(mouse, three.camera);
	console.log("Passed raycaster");
    var intersects = raycaster.intersectObjects(map.children, true);
    // console.log(intersects);
   
    if (intersects.length > 0) {
    	var obj = intersects[0].object;
    	// objX = obj.position.x;
    	// objY = obj.position.y;
    	// obj.scale.set(0.5,0.5,0.5);
    	var m = obj.material;
    	obj.scale.x = 0.5;
    	obj.scale.y = 0.5;
    	obj.scale.z = 0.5;
    	m.opacity = 0.5;
    	console.log(obj);
    	preObj = obj;
    } else if (preObj !== null) {
    	console.log("preObj");
    	var m = preObj.material;
    	preObj.scale.x = 1;
    	preObj.scale.y = 1;
    	preObj.scale.z = 1;
    	m.opacity = 1;
    }
}

var lastInfoText;
three.on( "update", function(e) {
    
	var elem = document.getElementById('location');
	var infoText = "Current Count:\n";
	infoText += count;
	infoText += "\nTouch X:\n";
	infoText += mouse.x;
	infoText += "\nTouch Y:\n";
	infoText += mouse.y;

	if (lastInfoText !== infoText) { // prevent unecessary DOM invalidations
      elem.innerText = infoText;
      lastInfoText = infoText;
    }


});
var mouse = new THREE.Vector2();
var ongoingTouches = new Array();
function handleStart(e) {
	// e.preventDefault();
	// console.log('Touch Starts');
	// var el = document.getElementsByTagName("canvas")[0];
	// var touches = e.changedTouches;
	// var ctx = el.getContext("2d");
	// var touches = evt.changedTouches;
	    
	// for (var i = 0; i < touches.length; i++) {
	// console.log("touchstart:" + i + "...");
	// ongoingTouches.push(copyTouch(touches[i]));
	// var color = colorForTouch(touches[i]);
	// ctx.beginPath();
	// ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
	// ctx.fillStyle = color;
	// ctx.fill();
	// console.log("touchstart:" + i + ".");
	// }
	console.log(e);
	touchX = e.changedTouches[0].pageX;
	touchY = e.changedTouches[0].pageY;
	mouse.x = ( touchX / window.innerWidth ) * 2 - 1;
	mouse.y = ( touchY / window.innerHeight ) * 2 + 1;
	count++;
}

function toScreenPosition(obj, camera)
{
    var vector = new THREE.Vector3();

    var widthHalf = 0.5*canvas.width;
    var heightHalf = 0.5*canvas.height;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    return { 
        x: vector.x,
        y: vector.y
    };

};






