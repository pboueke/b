//jslint config
/*global THREE, scene, window, document, requestAnimationFrame, console*/
/*jslint continue:true white:true, sloppy:true, browser:true*/

//global
var container, camera, controls, scene, renderer, light;
var objects = [], plane;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
offset = new THREE.Vector3(),
INTERSECTED, SELECTED, ROTATING;
var ROTATION = false;
var rotationmsg;

//main
start();
animate();

function start() {
    //initializes most variables
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

    light = new THREE.SpotLight( 0xffffff, 1.0 );
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

    //TODO: skybox
    /*
    var urlPrefix = "clouds/";
    var urls = [ urlPrefix + "Skybox-Right.bmp", urlPrefix + "Skybox-Left.bmp",
        urlPrefix + "Skybox-Top.bmp", urlPrefix + "Skybox-Bottom.bmp",
        urlPrefix + "Skybox-Front.bmp", urlPrefix + "Skybox-Back.bmp" ];
    THREE.ImageUtils.crossOrigin = 'Anonymous';
    var textureCube = THREE.ImageUtils.loadTextureCube( urls );
    var shader = THREE.ShaderLib["cube"];
    var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
    uniforms['tCube'].value = textureCube;
    var material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: uniforms,
    depthWrite: false,
    side: THREE.DoubleSide
    }),
    skyboxMesh = new THREE.Mesh( new THREE.BoxGeometry( 100000, 100000, 100000, 1, 1, 1, null, true ), material );
    scene.add( skyboxMesh );
    */

    // add event listeners
    renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
    renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
    renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
    window.addEventListener( 'keydown', onDocumentKeyPressed, false );
    window.addEventListener( 'resize', onWindowResize, false );

}

var random_color = function () {
    // returns random color in hex code
    "use strict";
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

function onWindowResize() {
    // takes careof aspect ratioon resize
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

    event.preventDefault();

    // clears the scene from any sphere used for the vizualization of the trackballcontroll
    var aux_object = scene.getObjectByName("rotSphere");
    while (aux_object !== undefined) {
        aux_object = scene.getObjectByName("rotSphere");
        scene.remove(aux_object);
    }

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;  //normalize mouse coordinates
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera ); //cast ray from camera based on the position of the mouse
    if ( SELECTED && !ROTATION) { //gets intersections with the plane 
        var intersects = raycaster.intersectObject( plane );
        if ( intersects.length > 0 ) {
            SELECTED.position.copy( intersects[0].point);
        }
        return;
    }
    var intersects = raycaster.intersectObjects( objects ); //gets cubes intersected with the ray
    if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[0].object ) {
            INTERSECTED = intersects[0].object;
            }
            container.style.cursor = 'pointer';
        } else {
            INTERSECTED = null;
            container.style.cursor = 'auto';
        }
        if ( ROTATION && ROTATING && SELECTED) { //rotate
            //create vizualization sphere
            var intersection = raycaster.intersectObject( plane );
            var geometry = new THREE.SphereGeometry(SELECTED.geometry.parameters.height * 0.875, 16, 16);
            var sphere = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: true, transparent: true, opacity: 0.25, color: 0xffffff } ) );
            sphere.position.x = SELECTED.position.x;
            sphere.position.y = SELECTED.position.y;
            sphere.position.z = SELECTED.position.z;
            sphere.castShadow = false;
            sphere.receiveShadow = false;
            sphere.name = "rotSphere";
            scene.add( sphere );

            //process rotation
            deltaX = event.clientX - startPoint.x;
            deltaY = event.clientY - startPoint.y;
            handleRotation();
            startPoint.x = event.clientX;
            startPoint.y = event.clientY;


        }
}

function onDocumentMouseDown( event ) {
    // changes global variables and handles interaction on click
    event.preventDefault();
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( objects );

    if ( intersects.length > 0 ) {
        controls.enabled = false;
        SELECTED = intersects[0].object;
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
    // changes global variables
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
    //handles all the keydown events
    if(event.which == 32){ //toggles between rotation and translationwith the space bar
        if (ROTATION == false) { //toggle rotate mode
            ROTATION = true;
            //container.children[2].innerHTML = 'ROTATE MODE'  
            return;
        } else {
            ROTATION = false;
            //container.children[2].innerHTML = 'MOVE MODE'; 
            return;
        }
    } else if ( event.which == 67) {  //  handles creation of new cubes with c
        var min = 30,
            max = 90,
            radius = Math.floor(Math.random() * (max - min + 1)) + min,
            color = random_color();
        //create cube
        raycaster.setFromCamera( mouse, camera );
        var intersection = raycaster.intersectObject( plane );
        var geometry = new THREE.BoxGeometry( radius, radius, radius );
        var cube = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: color } ) );
        cube.position.x = intersection[0].point.x;
        cube.position.y = intersection[0].point.y;
        cube.position.z = intersection[0].point.z;
        cube.castShadow = true;
        cube.receiveShadow = true;
        scene.add( cube );
        objects.push( cube );
    } else if ( event.which == 88) { // handles deletation of cubeswith x
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
    light.position.set(camera.position.x,camera.position.y,camera.position.z);
    renderer.render( scene, camera );
}

