import * as THREE from 'three';

function createLeg(x, z) {
    const geometry = new THREE.BoxGeometry(0.1, 1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xc8a696, });
    const leg = new THREE.Mesh(geometry, material);
    leg.position.set(x, 0.5, z);
    return leg;
}

function main() {
    const scene = new THREE.Scene();

    const base = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.1, 1.1),
        new THREE.MeshBasicMaterial({ color: 0xc8a696,})
    );
    base.scale.x = 1.5;
    base.scale.z += 0.6;
    base.position.set(0.05, -0.2, 0.05);
    base.rotation.x = Math.PI;

    const distanceBetweenLegs = 0.5;
    const offsetX = 0.5;
    const offsetZ = 0.5;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            const x = i * distanceBetweenLegs * 2 - offsetX;
            const z = j * distanceBetweenLegs * 2 - offsetZ;
            base.add(createLeg(x, z));
        }
    }
    scene.add(base);    
    const sizes = { width: 1400, height: 1000 };
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 5;
    scene.add(camera);

    const canvas = document.querySelector('.canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setClearColor(0x231a24,1)

    const clock = new THREE.Clock();

    function render(){
        const elapsedTime = clock.getElapsedTime();
        base.rotation.y = elapsedTime;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    render();
}

main();