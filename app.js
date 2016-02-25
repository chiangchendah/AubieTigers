/* Standard Argon Setup */
var options = THREE.Bootstrap.createArgonOptions( Argon.immersiveContext ); 
options.renderer = { klass: THREE.WebGLRenderer }; 
var three = THREE.Bootstrap( options ); 

// Add light to the scene because there is 3D object that needs to be lighted
var light = new THREE.DirectionalLight( 0xffffff, 1);
light.position.set( 0, -4, -4 ).normalize();
three.scene.add( light );
var pointLight = new THREE.PointLight( 0xffffff, 1.5, 1000);
three.camera.add(pointLight);

// Tell Argon that we need Vuforia for image tracking
Argon.immersiveContext.setRequiredCapabilities('Vuforia');

var encryptedData = document.getElementById("license").text;

// initialize Vuforia with our license key
Argon.Vuforia.initialize({
	licenseKey: "ASkFJJX/////AAAAAT3xWARiB06zpkG0cXnuuE4b0gz+qzFs7NP0xy09i4Wu425g6MS195/uDnoGXv6uCEdTRVjo8tN/+Gl2hVOCYrZN+TtjpSMa0MeALJRjssjQ261vmGTYEpedwCTqe57a59Ar7xV+1BfqNuk38cKM3RUuOVP1L58FgIYoemD73YHPz6QFmT71k0ZbVz+k6978t58L7tgXFcndT1dliM2O2QQJqYCh1lYPG/RODGXHLxyMUDeoMjy7Rrx/+GZEZIM3gZRgKafCmox85QFEjvdIW/G3sfze5skoDShaF26h16NMYijVV4TKCwcimgr7MXoHKVEGo7rmNn+aYSClHHen4SVlGeYBzz7XYiqsMgHp8UKX",

	//encryptedLicenseData: encryptedData,
	startCamera: true,
}).
then(function(api) { 
	// load, activate, and use our dataSet 
	api.loadDataSetFromURL('dataset/AuburnMap.xml').then(function (dataSet) { 
		dataSet.activate()
		setupStreetCar(dataSet.trackables.streetcar)
	}).then(api.startObjectTracker)
	  .then(api.hintMaxSimultaneousImageTargets.bind(api, 2))
})

function setupStreetCar(mapEntity)
{ 
    // create an Object3D from the stones entity 
    var map = three.argon.objectFromEntity(mapEntity);
    // create a box 
    var box = new THREE.Mesh(new THREE.BoxGeometry(30, 6, 10), new THREE.MeshNormalMaterial());
    box.position.y = 25;

    var translate = 0;

    // add and spin the box when the stones trackable is found 
    map.addEventListener('argon:found', function() { 
        map.add(box);
        translate = 25;
    });
    // remove the box when the stones trackable is lost 
    map.addEventListener('argon:lost', function() { 
        map.remove(box);
    });

    // animate the box 
    three.on('update', function() { 
        if(box.position.x < 170)
            box.position.x += translate * three.Time.delta;
        else
        {
            box.rotation.y = 1.3;
            box.position.y -= translate * three.Time.delta;
        }

    });
}


