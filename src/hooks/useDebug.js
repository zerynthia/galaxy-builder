import * as dat from "lil-gui";

export const useDebug = () => {
  const debug = (parameters, updateGalaxy, updateScene) => {
    const gui = new dat.GUI({
      width: 450,
    });

    const scene = gui.addFolder("Scene");
    const galaxy = gui.addFolder("Galaxy");
    const stars = gui.addFolder("Stars");
    const blackHole = gui.addFolder("Block hole");

    // Scene parameters
    scene
      .addColor(parameters, "sceneBackground")
      .name("Scene background")
      .onFinishChange(updateScene);

    // Stars parameters
    stars
      .add(parameters, "count")
      .min(100)
      .max(1000000)
      .step(100)
      .name("Count")
      .onFinishChange(updateGalaxy);
    stars
      .add(parameters, "size")
      .min(0.001)
      .max(0.1)
      .step(0.001)
      .name("Size")
      .onFinishChange(updateGalaxy);

    // Galaxy parameters
    galaxy
      .add(parameters, "radius")
      .min(0.01)
      .max(20)
      .step(0.01)
      .name("Radius")
      .onFinishChange(updateGalaxy);
    galaxy
      .add(parameters, "branches")
      .min(2)
      .max(20)
      .step(1)
      .name("Branches counts")
      .onFinishChange(updateGalaxy);
    galaxy
      .add(parameters, "spin")
      .min(-5)
      .max(5)
      .step(0.001)
      .name("Spin")
      .onFinishChange(updateGalaxy);
    galaxy
      .add(parameters, "randomness")
      .min(0)
      .max(2)
      .step(0.001)
      .name("Randomness power")
      .onFinishChange(updateGalaxy);
    galaxy
      .add(parameters, "randomnessPower")
      .min(1)
      .max(10)
      .step(0.001)
      .name("Randomness")
      .onFinishChange(updateGalaxy);
    galaxy
      .addColor(parameters, "insideColor")
      .name("Inside color")
      .onFinishChange(updateGalaxy);
    galaxy
      .addColor(parameters, "outsideColor")
      .name("Outside color")
      .onFinishChange(updateGalaxy);
    galaxy
      .add(parameters.rotation, "x")
      .min(1)
      .max(360)
      .step(1)
      .name("Rotation X")
      .onFinishChange(updateGalaxy);
    galaxy
      .add(parameters.rotation, "y")
      .min(1)
      .max(360)
      .step(1)
      .name("Rotation Y")
      .onFinishChange(updateGalaxy);
    galaxy
      .add(parameters.rotation, "z")
      .min(1)
      .max(360)
      .step(1)
      .name("Rotation Z")
      .onFinishChange(updateGalaxy);

    // Black hole parameters
    blackHole
      .add(parameters.sphere, "has")
      .name("Has")
      .onFinishChange(updateGalaxy);
    blackHole
      .addColor(parameters.sphere, "color")
      .name("Color")
      .onFinishChange(updateGalaxy);
    blackHole
      .add(parameters.sphere, "radius")
      .min(0.02)
      .max(2)
      .step(0.01)
      .name("Radius")
      .onFinishChange(updateGalaxy);
  };

  return { debug };
};
