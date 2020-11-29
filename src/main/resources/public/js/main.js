let scene, camera, renderer;

window.onload = (() => {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    const controls = new THREE.OrbitControls(camera);

    const geometry = new THREE.BoxGeometry(1, 1, 1);


    const textureLoader = new THREE.TextureLoader();

    const texture0 = textureLoader.load('textures/grass_side.png');
    const texture1 = textureLoader.load('textures/grass_side.png');
    const texture2 = textureLoader.load('textures/grass_top.png');
    const texture3 = textureLoader.load('textures/dirt.png');
    const texture4 = textureLoader.load('textures/grass_side.png');
    const texture5 = textureLoader.load('textures/grass_side.png');

    const materials = [
        new THREE.MeshBasicMaterial({ map: texture0 }), // SIDE
        new THREE.MeshBasicMaterial({ map: texture1 }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: texture2 }), // TOP
        new THREE.MeshBasicMaterial({ map: texture3 }), // BOTTOM
        new THREE.MeshBasicMaterial({ map: texture4 }), // SIDE
        new THREE.MeshBasicMaterial({ map: texture5 }) // SIDE
    ];

    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(0, 0, 0);
    scene.add(cube);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    function animate() {

        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);

    };

    animate();
});

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}