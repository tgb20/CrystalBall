let scene, camera, renderer;
var stats = new Stats();
window.onload = (() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    document.body.appendChild(stats.dom);

    const controls = new THREE.OrbitControls(camera);

    const textureLoader = new THREE.TextureLoader();

    const grassSide = textureLoader.load('textures/grass_side.png');
    grassSide.minFilter = THREE.NearestFilter;
    grassSide.magFilter = THREE.NearestFilter;
    const grassTop = textureLoader.load('textures/grass_top.png');
    grassTop.minFilter = THREE.NearestFilter;
    grassTop.magFilter = THREE.NearestFilter;
    const dirt = textureLoader.load('textures/dirt.png');
    dirt.minFilter = THREE.NearestFilter;
    dirt.magFilter = THREE.NearestFilter;
    const missing = textureLoader.load('textures/missing.png');
    missing.minFilter = THREE.NearestFilter;
    missing.magFilter = THREE.NearestFilter;
    const oakLogTop = textureLoader.load('textures/oak_log_top.png');
    oakLogTop.minFilter = THREE.NearestFilter;
    oakLogTop.magFilter = THREE.NearestFilter;
    const oakLogSide = textureLoader.load('textures/oak_log.png');
    oakLogSide.minFilter = THREE.NearestFilter;
    oakLogSide.magFilter = THREE.NearestFilter;
    const birchLeaves = textureLoader.load('textures/birch_leaves.png');
    birchLeaves.minFilter = THREE.NearestFilter;
    birchLeaves.magFilter = THREE.NearestFilter;
    const oakLeaves = textureLoader.load('textures/oak_leaves.png');
    oakLeaves.minFilter = THREE.NearestFilter;
    oakLeaves.magFilter = THREE.NearestFilter;
    const birchLogTop = textureLoader.load('textures/birch_log_top.png');
    birchLogTop.minFilter = THREE.NearestFilter;
    birchLogTop.magFilter = THREE.NearestFilter;
    const birchLogSide = textureLoader.load('textures/birch_log.png');
    birchLogSide.minFilter = THREE.NearestFilter;
    birchLogSide.magFilter = THREE.NearestFilter;
    const stone = textureLoader.load('textures/stone.png');
    stone.minFilter = THREE.NearestFilter;
    stone.magFilter = THREE.NearestFilter;
    const water = textureLoader.load('textures/water.png');
    water.minFilter = THREE.NearestFilter;
    water.magFilter = THREE.NearestFilter;

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
        new THREE.MeshBasicMaterial({ color: 0x80a755, map: birchLeaves, transparent: true }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x80a755, map: birchLeaves, transparent: true }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x80a755, map: birchLeaves, transparent: true }), // TOP
        new THREE.MeshBasicMaterial({ color: 0x80a755, map: birchLeaves, transparent: true }), // BOTTOM
        new THREE.MeshBasicMaterial({ color: 0x80a755, map: birchLeaves, transparent: true }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x80a755, map: birchLeaves, transparent: true }) // SIDE
    ];

    const oakLeavesMaterial = [
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: oakLeaves, transparent: true }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: oakLeaves, transparent: true }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: oakLeaves, transparent: true }), // TOP
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: oakLeaves, transparent: true }), // BOTTOM
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: oakLeaves, transparent: true }), // SIDE
        new THREE.MeshBasicMaterial({ color: 0x55C93F, map: oakLeaves, transparent: true }) // SIDE
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
    renderer.setClearColor(0x36c7f2, 1);
    document.body.appendChild(renderer.domElement);

    let webSocket = new WebSocket("ws://" + location.host + "/ws/");

    webSocket.onopen = ((event) => {

        console.log('Connected to WebSocket!');

        webSocket.onclose = ((event) => {
            console.log('Disconnected from WebSocket!');
        });

        webSocket.onmessage = ((message) => {
            let json = JSON.parse(message.data);

            while (scene.children.length > 0) {
                let child = scene.children[0];
                scene.remove(child);
            }

            const blocks = json.blocks;

            const playerGeometry = new THREE.BoxBufferGeometry(1, 2, 1);
            const baseGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
            const player = new THREE.Mesh(playerGeometry, new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
            player.position.set(0, 0.5, -1);
            scene.add(player);

            Object.keys(blocks).forEach(blockType => {

                let blocksOfType = blocks[blockType];

                let mat = new THREE.MeshBasicMaterial();
                switch (blockType) {
                    case 'GRASS_BLOCK':
                        mat = grassMaterial;
                        break;
                    case 'DIRT':
                        mat = dirtMaterial;
                        break;
                    case 'OAK_LOG':
                        mat = oakLogMaterial;
                        break;
                    case 'BIRCH_LEAVES':
                        mat = birchLeavesMaterial;
                        break;
                    case 'OAK_LEAVES':
                        mat = oakLeavesMaterial;
                        break;
                    case 'BIRCH_LOG':
                        mat = birchLogMaterial;
                        break;
                    case 'STONE':
                        mat = stoneMaterial;
                        break;
                    case 'WATER':
                        mat = waterMaterial;
                        break;
                    default:
                        mat = missingMaterial;
                        break;
                }

                let instanceBlock = new THREE.InstancedMesh(baseGeometry, mat, blocksOfType.length);
                const matrix = new THREE.Matrix4();

                for (let i = 0; i < blocksOfType.length; i++) {
                    matrix.setPosition(-blocksOfType[i].x, -blocksOfType[i].y, -blocksOfType[i].z);
                    instanceBlock.setMatrixAt(i, matrix);
                }

                scene.add(instanceBlock);
            });
        });
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        stats.update();
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