import { drawSquares } from "./squares";

function isCanvasElement(element: HTMLElement): element is HTMLCanvasElement {
  return element.nodeName === "CANVAS";
}

function maximiseCanvas(canvas: HTMLCanvasElement) {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}

document.addEventListener("DOMContentLoaded", () => {
  const canvasElement = document.getElementById("canvas");
  if (!isCanvasElement(canvasElement)) {
    throw new Error("Could not find canvas element in HTML");
  }
  maximiseCanvas(canvasElement);
  const tick = (_currentTime: number) => {
    maximiseCanvas(canvasElement);
    drawSquares(canvasElement);
    window.requestAnimationFrame(tick);
  };
  window.requestAnimationFrame(tick);
});
