import * as THREE from "three";

import { useScene } from "./useScene";

export const useGalaxyBuilder = () => {
  const { buildScene } = useScene();

  const galaxyBuilder = (parameters) => {
    // Init scene
    const { textureLoader, scene, updateScene, renderer } =
      buildScene(parameters);

    const particleTexture = textureLoader.load("/textures/particles/star.png");

    // Sphere
    let sphereGeometry = null;
    let sphereMaterial = null;
    let sphereMesh = null;

    // Stars
    let geometry = null;
    let material = null;
    let points = null;

    const updateGalaxy = () => {
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

      // Rotation
      points.rotation.x = parameters.rotation.x;
      points.rotation.y = parameters.rotation.y;
      points.rotation.z = parameters.rotation.z;

      scene.add(points);
    };

    updateGalaxy();

    return { updateGalaxy, updateScene, renderer };
  };

  return { galaxyBuilder };
};
