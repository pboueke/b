var container;
var camera, controls, scene, renderer;
var objects = [], plane;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
INTERSECTED, SELECTED, ROTATING;
var ROTATION = false;
var rotationmsg;

start();
animate();

function start() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    //THREE js initialparameters
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 10;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = true;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.2;

    scene = new THREE.Scene();
    scene.add( new THREE.AmbientLight( 0x505050 ) );

    var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, 500, 2000 );
    light.castShadow = true;
    light.shadowCameraNear = 200;
    light.shadowCameraFar = camera.far;
    light.shadowCameraFov = 50;
    light.shadowBias = -0.00022;
    light.shadowMapWidth = 2048;
    light.shadowMapHeight = 2048;
    scene.add( light );

    // reference plane 
    plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 10000, 10000, 8, 8 ),
        new THREE.MeshBasicMaterial( { visible: false } )
        );
    scene.add( plane );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0x232226 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.sortObjects = false;
    container.appendChild( renderer.domElement );

    //skybox
    var urlPrefix = "clouds/";
    var urls = [ urlPrefix + "Skybox-Right.bmp", urlPrefix + "Skybox-Left.bmp",
        urlPrefix + "Skybox-Top.bmp", urlPrefix + "Skybox-Bottom.bmp",
        urlPrefix + "Skybox-Front.bmp", urlPrefix + "Skybox-Back.bmp" ];
    THREE.ImageUtils.crossOrigin = 'Anonymous';
    var textureCube = THREE.ImageUtils.loadTextureCube( urls );
    var shader = THREE.ShaderLib["cube"];
    var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
    uniforms['tCube'].value = textureCube;   // textureCube has been init before
    var material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: uniforms,
    depthWrite: false,
    side: THREE.DoubleSide
    }),
    // build the skybox Mesh 
// build the skybox Mesh 
    skyboxMesh = new THREE.Mesh( new THREE.BoxGeometry( 100000, 100000, 100000, 1, 1, 1, null, true ), material );
    // add it to the scene
    scene.add( skyboxMesh );


    renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
    renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
    renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
    window.addEventListener( 'keydown', onDocumentKeyPressed, false );
    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;  //normalize mouse coordinates
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera ); //cast ray from 'camera'
    if ( SELECTED && !ROTATION) { // if translading put plane in the middle of cube to orient translation
        var intersects = raycaster.intersectObject( plane );
        if ( intersects.length > 0 ) {
            SELECTED.position.copy( intersects[ 0 ].point);
    }
    return;
}

var intersects = raycaster.intersectObjects( objects ); //check which cubes are intersected by raycast

if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
        INTERSECTED = intersects[ 0 ].object;
        }
        container.style.cursor = 'pointer';
    } else {
        INTERSECTED = null;
        container.style.cursor = 'auto';
    }
    if ( ROTATION && ROTATING && SELECTED) { //rotate using arcball mechanics
        deltaX = event.clientX - startPoint.x;
        deltaY = event.clientY - startPoint.y;
        handleRotation();
        startPoint.x = event.clientX;
        startPoint.y = event.clientY;
    }
}

function onDocumentMouseDown( event ) {

    event.preventDefault();
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {
        controls.enabled = false;
        SELECTED = intersects[ 0 ].object;
        plane.position.copy( SELECTED.position );
        var intersects = raycaster.intersectObject( plane );
        container.style.cursor = 'move';
        startPoint = {
            x: event.clientX,
            y: event.clientY
        };
        rotateStartPoint = rotateEndPoint = projectOnTrackball(0, 0);
    }
    if ( ROTATION ){
        ROTATING = true;
    }
}

function onDocumentMouseUp( event ) {

    event.preventDefault();
    controls.enabled = true;
    plane.lookAt( camera.position ); 
    container.style.cursor = 'auto';
    SELECTED = null;

    if ( ROTATION ){
        ROTATING = false;
    }
}

function onDocumentKeyPressed( event ) {

    if(event.which == 82 /*r*/ && ROTATION == false) { //toggle rotate mode
        ROTATION = true;
        //container.children[2].innerHTML = 'ROTATE MODE'  
        return;
    }
    else if ( event.which == 82 /*r*/ && ROTATION == true) { //toggle move mode
        ROTATION = false;
        //container.children[2].innerHTML = 'MOVE MODE'; 
        return;
    }
    else if ( event.which == 67 /*c*/) { //create cube
        raycaster.setFromCamera( mouse, camera );
        var intersection = raycaster.intersectObject( plane );
        var geometry = new THREE.BoxGeometry( 40, 40, 40 );
        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
        object.position.x = intersection[0].point.x;
        object.position.y = intersection[0].point.y;
        object.position.z = intersection[0].point.z;
        object.castShadow = true;
        object.receiveShadow = true;
        scene.add( object );
        objects.push( object );
    }
    else if ( event.which == 68 /*d*/) { //delete cube
        raycaster.setFromCamera( mouse, camera );
        var intersection = raycaster.intersectObjects( objects );
        if (intersection.length > 0){
            scene.remove(scene.getObjectById(intersection[0].object.id));
        }
    }
}

function projectOnTrackball(touchX, touchY) {
    var mouseOnBall = new THREE.Vector3();
    mouseOnBall.set(
        clamp(touchX / (window.innerWidth/2), -1, 1), clamp(-touchY / (window.innerHeight/2), -1, 1),
        0.0
    );
    var length = mouseOnBall.length();
    if (length > 1.0) {
        mouseOnBall.normalize();
    }
    else {
        mouseOnBall.z = Math.sqrt(1.0 - length * length);
    }
    return mouseOnBall;
}

var handleRotation = function() {
        rotateEndPoint = projectOnTrackball(deltaX, deltaY);
        var rotateQuaternion = rotateMatrix(rotateStartPoint, rotateEndPoint);
        curQuaternion = SELECTED.quaternion;
        curQuaternion.multiplyQuaternions(rotateQuaternion, curQuaternion);
        curQuaternion.normalize();
        SELECTED.setRotationFromQuaternion(curQuaternion);
        rotateEndPoint = rotateStartPoint;
    };

function rotateMatrix(rotateStart, rotateEnd) {
        var axis = new THREE.Vector3(),
            quaternion = new THREE.Quaternion();
        var angle = Math.acos(rotateStart.dot(rotateEnd) / rotateStart.length() / rotateEnd.length());

        if (angle) {
            axis.crossVectors(rotateStart, rotateEnd).normalize();
            angle *= 2;
            quaternion.setFromAxisAngle(axis, angle);
        }
        return quaternion;
    }

    function clamp(value, min, max)
    {
        return Math.min(Math.max(value, min), max);
    }

function animate() {

    requestAnimationFrame( animate );
    render();

}

function render() {

    controls.update();
    renderer.render( scene, camera );

}

