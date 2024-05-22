import * as THREE from 'three';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });
    const objects = []
    const planetXObj = []
    const scene = new THREE.Scene()


    // ... ... ... ... ... ... ... 
    // Построение трехмерной сцены 
    // ... ... ... ... ... ... ... 
    const fov = 75;
    const aspect = canvas.width / canvas.height; // Соответствует размеру Canvas: 600x400 пикселов
    const near = 20;
    const far = 50;
    const radius = 1
    const wSegments = 6
    const hSegments = 6

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // camera.position.z = 5;

    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);

    camera.position.set(0, 30, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);



    const sphereGeometry = new THREE.SphereGeometry(radius, wSegments, hSegments)

    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push({
        item: solarSystem,
        speed: 0.8,
    });

    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 8;
    solarSystem.add(earthOrbit);
    objects.push({
        item: earthOrbit,
        speed: 5,
    });

    //sun init
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    scene.add(sunMesh);
    solarSystem.add(sunMesh);
    objects.push({
        item: sunMesh,
        speed:0.8,
    });

    //earth init
    const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x2233FF,
        emissive: 0x112244
    });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthMesh.position.x = 8;
    solarSystem.add(earthMesh);
    objects.push({
        item: earthMesh,
        speed:1,
    });

    //moon init
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);
    objects.push({
        item:moonOrbit,
        speed:-10
    })

    const moonMaterial = new THREE.MeshPhongMaterial({
        color: 0x888888,
        emissive: 0x222222
    });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.5, 0.5, 0.5);
    moonOrbit.add(moonMesh);
    objects.push({
        item:moonMesh,
        speed:-0.1,
    });
    const planetXMaterial = new THREE.MeshPhongMaterial({
        color:  0x888888,
        emissive: 0xFFA500
    });
    
    const planetXOrbit = new THREE.Object3D();
    planetXOrbit.position.y = 5;
    planetXOrbit.position.x = 15;
    solarSystem.add(planetXOrbit);
    planetXObj.push({
        item: planetXOrbit,
        speed: 3,
    })

    const planetXDiffrentOrbit = new THREE.Object3D();
    planetXDiffrentOrbit.position.y = 5;
    planetXDiffrentOrbit.position.x = 15;
    solarSystem.add(planetXDiffrentOrbit);
    planetXObj.push({
        item:planetXDiffrentOrbit,
        speed:-5,
    })
    
    //2 task

    const planetXMesh = new THREE.Mesh(sphereGeometry, planetXMaterial);
    planetXMesh.scale.set(1.5,1.5,1.5);
    planetXMesh.position.y = 5;
    planetXMesh.position.x = 15;
    solarSystem.add(planetXMesh);
    planetXObj.push({
        item:planetXMesh,
        speed: 1.5,
    })

    
    const planetXFirstSputnikMaterial = new THREE.MeshPhongMaterial({
        color:  0x888888,
        emissive: 0xfaeedd,
    })
    const planetXFirstSputnikMesh = new THREE.Mesh(sphereGeometry, planetXFirstSputnikMaterial);
    planetXFirstSputnikMesh.scale.set(.3,.3,.3);
    planetXFirstSputnikMesh.position.x = 3;
    planetXOrbit.add(planetXFirstSputnikMesh);
    planetXObj.push({
        item:planetXFirstSputnikMesh,
        speed:2,
    });
    
    const planetXSecondSputnikMaterial = new THREE.MeshPhongMaterial({
        color:  0x888888,
        emissive: 0x3caa3c,
    })
    const planetXSecondSputnikMesh = new THREE.Mesh(sphereGeometry, planetXSecondSputnikMaterial);
    planetXSecondSputnikMesh.scale.set(.5,.5,.5);
    planetXSecondSputnikMesh.position.x = 4
    planetXDiffrentOrbit.add(planetXSecondSputnikMesh);
    planetXObj.push({
        item:planetXSecondSputnikMesh,
        speed:-10,
    });    

    function render(time) {
        time *= 0.001;
        objects.forEach((obj) => {
            obj.item.rotation.y = (obj.speed * time);
        });
        planetXObj.forEach((obj) => {
            obj.item.rotation.z = (obj.speed * time);
        })
        renderer.render(scene, camera)
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render)

}

main()