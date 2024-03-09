import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

function App() {
  useEffect(() => {
    // Debug
    const gui = new dat.GUI({
      width: 360,
    });

    // Canvas
    const canvas = document.querySelector("canvas.webgl");

    // Scene
    const scene = new THREE.Scene();

    // Texture
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load("/textures/particles/star.png");

    /**
     * Galaxy
     */
    const parameters = {
      count: 100000,
      size: 0.01,
      radius: 2,
      branches: 3,
      spin: 5,
      randomness: 0.2,
      randomnessPower: 3,
      insideColor: "#ff6030",
      outsideColor: "#1b3984",
      sphereColor: "#000000",
      sphere: {
        has: true,
        color: "#000000",
        radius: 0.6,
        width: 30,
        height: 30,
      },
    };

    // Sphere
    let sphereGeometry = null;
    let sphereMaterial = null;
    let sphereMesh = null;

    // Stars
    let geometry = null;
    let material = null;
    let points = null;

    const generateGalaxy = () => {
      if (points !== null) {
        // Sphere
        sphereGeometry.dispose();
        sphereMaterial.dispose();
        scene.remove(sphereMesh);

        // Start
        geometry.dispose();
        material.dispose();
        scene.remove(points);
      }

      // Sphere
      if (parameters.sphere.has) {
        sphereGeometry = new THREE.SphereGeometry(
          parameters.sphere.radius,
          parameters.sphere.width,
          parameters.sphere.height
        );
        sphereMaterial = new THREE.MeshBasicMaterial({
          color: parameters.sphere.color,
        });
        sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphereMesh);
      }

      // Stars
      geometry = new THREE.BufferGeometry();

      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);

      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

        const randomX =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius;
        const randomY =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius;
        const randomZ =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * radius + randomZ;

        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Material
      material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        vertexColors: true,
        alphaMap: particleTexture,
        transparent: true,
      });

      // Points
      points = new THREE.Points(geometry, material);
      scene.add(points);
    };

    generateGalaxy();

    gui
      .add(parameters, "count")
      .min(100)
      .max(1000000)
      .step(100)
      .onFinishChange(generateGalaxy);
    gui
      .add(parameters, "size")
      .min(0.001)
      .max(0.1)
      .step(0.001)
      .onFinishChange(generateGalaxy);
    gui
      .add(parameters, "radius")
      .min(0.01)
      .max(20)
      .step(0.01)
      .onFinishChange(generateGalaxy);
    gui
      .add(parameters, "branches")
      .min(2)
      .max(20)
      .step(1)
      .onFinishChange(generateGalaxy);
    gui
      .add(parameters, "spin")
      .min(-5)
      .max(5)
      .step(0.001)
      .onFinishChange(generateGalaxy);
    gui
      .add(parameters, "randomness")
      .min(0)
      .max(2)
      .step(0.001)
      .onFinishChange(generateGalaxy);
    gui
      .add(parameters, "randomnessPower")
      .min(1)
      .max(10)
      .step(0.001)
      .onFinishChange(generateGalaxy);
    gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
    gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);
    gui.add(parameters.sphere, "has").onFinishChange(generateGalaxy);
    gui.addColor(parameters.sphere, "color").onFinishChange(generateGalaxy);
    gui
      .add(parameters.sphere, "radius")
      .min(0.02)
      .max(2)
      .step(0.01)
      .onFinishChange(generateGalaxy);

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 3;
    camera.position.y = 3;
    camera.position.z = 3;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return <canvas className="webgl"></canvas>;
}

export default App;
