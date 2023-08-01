export const getCanvas = (): HTMLCanvasElement | null => {
  const elementId = "canvas";
  const canvas = document.getElementById(elementId);

  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error(`Canvas with id ${elementId} doesn't exist`);
  }
  return canvas;
};
