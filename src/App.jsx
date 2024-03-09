import { useEffect } from "react";
import { useGalaxyBuilder } from "./hooks/useGalaxyBuilder";
import { useDebug } from "./hooks/useDebug";

function App() {
  const { galaxyBuilder } = useGalaxyBuilder();
  const { debug } = useDebug();

  useEffect(() => {
    const parameters = {
      sceneBackground: "#000000",
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

    // Init galaxy
    const { updateGalaxy, updateScene } = galaxyBuilder(parameters);

    // Debug
    debug(parameters, updateGalaxy, updateScene);
  }, []);

  return <canvas className="webgl"></canvas>;
}

export default App;
