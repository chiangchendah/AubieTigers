
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
eyeOrigin.add(root);

var instruction = document.getElementById('instruction');
var arrow = document.getElementById('arrow');
var minutes = document.getElementById('minutes');

var tenthandhome = "251 10th St NW, Atlanta, GA 30318";
var startLocation = tenthandhome;
var endLocation = "250 Auburn Ave NE, Atlanta, GA 30303";
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
	  calculateAndDisplayRoute(directionsService);
}
var step;
var mins;
function calculateAndDisplayRoute(directionsService) {
	directionsService.route({
	  origin: startLocation,
	  destination: endLocation,
	  travelMode: google.maps.TravelMode.WALKING
	}, function(response, status) {
	  if (status === google.maps.DirectionsStatus.OK) {
	    // directionsDisplay.setDirections(response);
	    step = response.routes[0].legs[0].steps[0];
	    console.log(response.routes[0].legs[0]);
	    mins = response.routes[0].legs[0].duration.text;
	    var mins_result = mins.split(' ');
	    instruction.innerHTML = step.instructions;
	    if (step.instructions.includes('Head')) {
	    	arrow.innerHTML = '<img src="src/images/arrow-head.svg">';
	    } else if (step.instructions.includes('right')){
	    	arrow.innerHTML = '<img src="src/images/arrow-right.svg">';
	    } else {
	    	arrow.innerHTML = '<img src="src/images/arrow-left.svg">';
	    }
	    minutes.innerHTML = '<p>'+mins_result[0]+'<span>'+mins_result[1]+'</span></p>';
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

