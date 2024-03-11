import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const useScene = () => {
  const buildScene = (parameters) => {
    // Canvas
    const canvas = document.querySelector("canvas.webgl");

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(parameters.sceneBackground);

    // Texture
    const textureLoader = new THREE.TextureLoader();

    // Scene Sizes
    const sceneSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sceneSizes.width = window.innerWidth;
      sceneSizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sceneSizes.width / sceneSizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sceneSizes.width, sceneSizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sceneSizes.width / sceneSizes.height,
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

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      preserveDrawingBuffer: true
    });
    renderer.setSize(sceneSizes.width, sceneSizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Update
    const tick = () => {
      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    // Update scene
    const updateScene = () => {
      scene.background = new THREE.Color(parameters.sceneBackground);
    }

    return { textureLoader, scene, updateScene, renderer };
  };

  return { buildScene };
};
