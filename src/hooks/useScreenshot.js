export const useScreenshot = () => {
  const initScreenshotButton = (renderer) => {
    const button = document.querySelector(".button-screenshot");

    button.addEventListener("click", () => {
      // Screenshot
      const imgData = renderer.domElement.toDataURL("image/png");

      // Download
      const link = document.createElement("a");
      link.download = "galaxy.png";
      link.href = imgData;
      link.click();
    });
  };

  return { initScreenshotButton };
};
