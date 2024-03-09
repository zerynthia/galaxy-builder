import * as dat from "lil-gui";

export const useDebug = () => {
  const debug = (parameters, updateGalaxy, updateScene) => {
    const gui = new dat.GUI({
      width: 450,
    });

    const scene = gui.addFolder("Налады сцены");
    const galaxy = gui.addFolder("Налады галактыкі");
    const stars = gui.addFolder("Наладкі зорак");
    const blackHole = gui.addFolder("Налады чорнай дзіркі");

    // Scene parameters
    scene
      .addColor(parameters, "sceneBackground")
      .name("Фон сцэны")
      .onFinishChange(updateScene);

    // Stars parameters
    stars
      .add(parameters, "count")
      .min(100)
      .max(1000000)
      .step(100)
      .name("Колькасць зорак")
      .onFinishChange(updateGalaxy);
    stars
      .add(parameters, "size")
      .min(0.001)
      .max(0.1)
      .step(0.001)
      .name("Памер зорак")
      .onFinishChange(updateGalaxy);

    // Galaxy parameters
    galaxy
      .add(parameters, "radius")
      .min(0.01)
      .max(20)
      .step(0.01)
      .name("Радыус галактыкі")
      .onFinishChange(updateGalaxy);
    galaxy
      .add(parameters, "branches")
      .min(2)
      .max(20)
      .step(1)
      .name("Колькасць рукавоў галактыкі")
      .onFinishChange(updateGalaxy);
    galaxy
      .add(parameters, "spin")
      .min(-5)
      .max(5)
      .step(0.001)
      .name("Закругленасць галактыкі")
      .onFinishChange(updateGalaxy);
    galaxy
      .add(parameters, "randomness")
      .min(0)
      .max(2)
      .step(0.001)
      .name("Рандомнасць зорак галактыкі")
      .onFinishChange(updateGalaxy);
    galaxy
      .add(parameters, "randomnessPower")
      .min(1)
      .max(10)
      .step(0.001)
      .name("Ступень рандомнасці галактыкі")
      .onFinishChange(updateGalaxy);
    galaxy
      .addColor(parameters, "insideColor")
      .name("Вонкавы колер галактыкі")
      .onFinishChange(updateGalaxy);
    galaxy
      .addColor(parameters, "outsideColor")
      .name("Унутраны колер галактыкі")
      .onFinishChange(updateGalaxy);

    // Black hole parameters
    blackHole
      .add(parameters.sphere, "has")
      .name("Ці ёсць чорная дзірка")
      .onFinishChange(updateGalaxy);
    blackHole
      .addColor(parameters.sphere, "color")
      .name("Колер чорнай дзіркі")
      .onFinishChange(updateGalaxy);
    blackHole
      .add(parameters.sphere, "radius")
      .min(0.02)
      .max(2)
      .step(0.01)
      .name("Памер чорнай дзіркі")
      .onFinishChange(updateGalaxy);
  };

  return { debug };
};
