import * as THREE from 'three';
import './style.css';

function createTableLeg(x, z) {
    const geometry = new THREE.BoxGeometry(0.1, 1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 'brown', });
    const leg = new THREE.Mesh(geometry, material);
    leg.position.set(x, 0.5, z);
    return leg;
}

function main() {
    const scene = new THREE.Scene();

    const base = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.1, 1.1),
        new THREE.MeshBasicMaterial({ color: 'gray',})
    );
    base.scale.x = 1.5;
    base.scale.z += 0.6;
    base.position.set(0.05, -0.2, 0.03);
    base.rotation.x = Math.PI;

    const distanceBetweenLegs = 0.5;
    const offsetX = 0.5;
    const offsetZ = 0.5;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            const x = i * distanceBetweenLegs * 2 - offsetX;
            const z = j * distanceBetweenLegs * 2 - offsetZ;
            base.add(createTableLeg(x, z));
        }
    }
    scene.add(base);

    const boxGroup = new THREE.Group();
    const figuresArray = [];
    const geometries = [
        new THREE.BoxGeometry(0.2, 0.2, 0.2),
        new THREE.ConeGeometry(0.2, 0.3, 8),
        new THREE.CylinderGeometry(0.1, 0.1, 0.2, 12)
    ];
    const material = new THREE.MeshBasicMaterial({ color: 'red',  });

    geometries.forEach((geometry) => {
        const mesh = new THREE.Mesh(geometry, material);
        figuresArray.push(mesh);
    });

    figuresArray[0].position.set(0.4, -0.14, 0);
    figuresArray[1].position.set(0, -0.14, 0);
    figuresArray[2].position.set(-0.4, -0.14, 0);

    boxGroup.add(...figuresArray);
    base.add(boxGroup);

    const sizes = { width: 1400, height: 1000 };
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    scene.add(camera);

    const canvas = document.querySelector('.canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);

    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        figuresArray.forEach((item, index) => {
            item.rotation.y = elapsedTime * (index % 2 == 0 ? 2 : -2);
        });
        base.rotation.y = elapsedTime;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    animate();
}

main();