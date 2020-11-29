let scene, camera, renderer;
var stats = new Stats();
window.onload = (() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    document.body.appendChild(stats.dom);

    const controls = new THREE.OrbitControls(camera);

    const geometry = new THREE.BoxGeometry(1, 1, 1);


    const textureLoader = new THREE.TextureLoader();

    const grassSide = textureLoader.load('textures/grass_side.png');
    const grassTop = textureLoader.load('textures/grass_top.png');
    const dirt = textureLoader.load('textures/dirt.png');
    const missing = textureLoader.load('textures/missing.png');
    const oakLogTop = textureLoader.load('textures/oak_log_top.png');
    const oakLogSide = textureLoader.load('textures/oak_log.png');
    const birchLeaves = textureLoader.load('textures/birch_leaves.png');
    const oakLeaves = textureLoader.load('textures/oak_leaves.png');
    const birchLogTop = textureLoader.load('textures/birch_log_top.png');
    const birchLogSide = textureLoader.load('textures/birch_log.png');
    const stone = textureLoader.load('textures/stone.png');
    const water = textureLoader.load('textures/water.png');

    const missingMaterial = [
        new THREE.MeshBasicMaterial({ map: missing }), // SIDE
        new THREE.MeshBasicMaterial({ map: missing }), // SIDE
        new THREE.MeshBasicMaterial({ map: missing }), // TOP
        new THREE.MeshBasicMaterial({ map: missing }), // BOTTOM
        new THREE.MeshBasicMaterial({ map: missing }), // SIDE
        new THREE.MeshBasicMaterial({ map: missing }) // SIDE
    ];

    const grassMaterial = [
        new THREE.MeshBasicMaterial({ map: grassSide }), // SIDE
        new THREE.MeshBasicMaterial({ map: grassSide }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: grassTop }), // TOP
        new THREE.MeshBasicMaterial({ map: dirt }), // BOTTOM
        new THREE.MeshBasicMaterial({ map: grassSide }), // SIDE
        new THREE.MeshBasicMaterial({ map: grassSide }) // SIDE
    ];

    const dirtMaterial = [
        new THREE.MeshBasicMaterial({ map: dirt }), // SIDE
        new THREE.MeshBasicMaterial({ map: dirt }), // SIDE
        new THREE.MeshBasicMaterial({ map: dirt }), // TOP
        new THREE.MeshBasicMaterial({ map: dirt }), // BOTTOM
        new THREE.MeshBasicMaterial({ map: dirt }), // SIDE
        new THREE.MeshBasicMaterial({ map: dirt }) // SIDE
    ];

    const oakLogMaterial = [
        new THREE.MeshBasicMaterial({ map: oakLogSide }), // SIDE
        new THREE.MeshBasicMaterial({ map: oakLogSide }), // SIDE
        new THREE.MeshBasicMaterial({ map: oakLogTop }), // TOP
        new THREE.MeshBasicMaterial({ map: oakLogTop }), // BOTTOM
        new THREE.MeshBasicMaterial({ map: oakLogSide }), // SIDE
        new THREE.MeshBasicMaterial({ map: oakLogSide }) // SIDE
    ];

    const birchLeavesMaterial = [
        new THREE.MeshBasicMaterial({ color: 0x80a755, map: birchLeaves }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x80a755, map: birchLeaves }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x80a755, map: birchLeaves }), // TOP
        new THREE.MeshBasicMaterial({ color: 0x80a755, map: birchLeaves }), // BOTTOM
        new THREE.MeshBasicMaterial({ color: 0x80a755, map: birchLeaves }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x80a755, map: birchLeaves }) // SIDE
    ];

    const oakLeavesMaterial = [
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: oakLeaves }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: oakLeaves }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: oakLeaves }), // TOP
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: oakLeaves }), // BOTTOM
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: oakLeaves }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: oakLeaves }) // SIDE
    ];

    const birchLogMaterial = [
        new THREE.MeshBasicMaterial({ map: birchLogSide }), // SIDE
        new THREE.MeshBasicMaterial({ map: birchLogSide }), // SIDE
        new THREE.MeshBasicMaterial({ map: birchLogTop }), // TOP
        new THREE.MeshBasicMaterial({ map: birchLogTop }), // BOTTOM
        new THREE.MeshBasicMaterial({ map: birchLogSide }), // SIDE
        new THREE.MeshBasicMaterial({ map: birchLogSide }) // SIDE
    ];

    const stoneMaterial = [
        new THREE.MeshBasicMaterial({ map: stone }), // SIDE
        new THREE.MeshBasicMaterial({ map: stone }), // SIDE
        new THREE.MeshBasicMaterial({ map: stone }), // TOP
        new THREE.MeshBasicMaterial({ map: stone }), // BOTTOM
        new THREE.MeshBasicMaterial({ map: stone }), // SIDE
        new THREE.MeshBasicMaterial({ map: stone }) // SIDE
    ];

    const waterMaterial = [
        new THREE.MeshBasicMaterial({ color: 0x5555FF, map: water }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x5555FF, map: water }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x5555FF, map: water }), // TOP
        new THREE.MeshBasicMaterial({ color: 0x5555FF, map: water }), // BOTTOM
        new THREE.MeshBasicMaterial({ color: 0x5555FF, map: water }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x5555FF, map: water }) // SIDE
    ];

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    setInterval(function () {
        fetch('http://192.168.86.36:25599/blocks')
            .then(response => response.json())
            .then(json => {
                while (scene.children.length > 0) {
                    scene.remove(scene.children[0]);
                }

                const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
                const player = new THREE.Mesh(playerGeometry, new THREE.MeshBasicMaterial({ color: 0xFFFFFF}));
                player.position.set(0, 0.5, 0);
                scene.add(player);

                json.blocks.forEach(block => {

                    let cube;

                    switch (block.type) {
                        case 'GRASS_BLOCK':
                            cube = new THREE.Mesh(geometry, grassMaterial);
                            break;
                        case 'DIRT':
                            cube = new THREE.Mesh(geometry, dirtMaterial);
                            break;
                        case 'OAK_LOG':
                            cube = new THREE.Mesh(geometry, oakLogMaterial);
                            break;
                        case 'BIRCH_LEAVES':
                            cube = new THREE.Mesh(geometry, birchLeavesMaterial);
                            break;
                        case 'OAK_LEAVES':
                            cube = new THREE.Mesh(geometry, oakLeavesMaterial);
                            break;
                        case 'BIRCH_LOG':
                            cube = new THREE.Mesh(geometry, birchLogMaterial);
                            break;
                        case 'STONE':
                            cube = new THREE.Mesh(geometry, stoneMaterial);
                            break;
                        case 'WATER':
                            cube = new THREE.Mesh(geometry, waterMaterial);
                            break;
                        default:
                            cube = new THREE.Mesh(geometry, missingMaterial);
                            break;
                    }
                    cube.position.set(-block.x, -block.y, -block.z);
                    scene.add(cube);
                });
            });

    }, 10);

    function animate() {

        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        stats.update();

    };

    animate();
});

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}