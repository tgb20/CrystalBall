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

    const cube1 = new THREE.Mesh(geometry, materials);
    const cube2 = new THREE.Mesh(geometry, materials);
    const cube3 = new THREE.Mesh(geometry, materials);
    const cube4 = new THREE.Mesh(geometry, materials);
    const cube5 = new THREE.Mesh(geometry, materials);
    const cube6 = new THREE.Mesh(geometry, materials);
    const cube7 = new THREE.Mesh(geometry, materials);
    const cube8 = new THREE.Mesh(geometry, materials);
    const cube9 = new THREE.Mesh(geometry, materials);
    scene.add(cube1);
    cube1.position.set(0, 0, 0);
    scene.add(cube2);
    cube2.position.set(1, 0, 0);
    scene.add(cube3);
    cube3.position.set(-1, 0, 0);
    scene.add(cube4);
    cube4.position.set(0, 0, -1);
    scene.add(cube5);
    cube5.position.set(0, 0, 1);
    scene.add(cube6);
    cube6.position.set(1, 0, 1);
    scene.add(cube7);
    cube7.position.set(1, 0, -1);
    scene.add(cube8);
    cube8.position.set(-1, 0, -1);
    scene.add(cube9);
    cube9.position.set(-1, 0, 1);

    const log0 = textureLoader.load('textures/oak_log.png');
    const log1 = textureLoader.load('textures/oak_log.png');
    const log2 = textureLoader.load('textures/oak_log_top.png');
    const log3 = textureLoader.load('textures/oak_log_top.png');
    const log4 = textureLoader.load('textures/oak_log.png');
    const log5 = textureLoader.load('textures/oak_log.png');

    const logMaterials = [
        new THREE.MeshBasicMaterial({ map: log0 }), // SIDE
        new THREE.MeshBasicMaterial({ map: log1 }), // SIDE
        new THREE.MeshBasicMaterial({ map: log2 }), // TOP
        new THREE.MeshBasicMaterial({ map: log3 }), // BOTTOM
        new THREE.MeshBasicMaterial({ map: log4 }), // SIDE
        new THREE.MeshBasicMaterial({ map: log5 }) // SIDE
    ];

    const cube10 = new THREE.Mesh(geometry, logMaterials);
    scene.add(cube10);
    cube10.position.set(0, 1, 0);

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