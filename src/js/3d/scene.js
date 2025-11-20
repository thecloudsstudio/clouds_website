import * as THREE from 'three';

export function initScene() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xffffff); // Keep transparent or match body background if needed, but transparent allows CSS background to show if any.
    // Actually, let's make it white to match the site, or maybe a very subtle gray fog.
    scene.fog = new THREE.FogExp2(0xffffff, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry - Floating Cubes/Shapes
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x333333, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });

    const shapes = [];
    for (let i = 0; i < 20; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 20;
        mesh.position.z = (Math.random() - 0.5) * 20;
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        // Custom properties for animation
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: (Math.random() * 0.005) + 0.002,
            floatOffset: Math.random() * Math.PI * 2
        };

        scene.add(mesh);
        shapes.push(mesh);
    }

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        // Smooth camera movement
        camera.rotation.y += 0.05 * (targetX - camera.rotation.y);
        camera.rotation.x += 0.05 * (targetY - camera.rotation.x);

        // Animate shapes
        shapes.forEach((mesh) => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            
            // Floating effect
            mesh.position.y += Math.sin(elapsedTime * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.01;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
