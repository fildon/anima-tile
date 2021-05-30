function isCanvasElement(element: HTMLElement): element is HTMLCanvasElement {
  return element.nodeName === "CANVAS";
}

document.addEventListener("DOMContentLoaded", () => {
  const canvasElement = document.getElementById("canvas");
  if (!isCanvasElement(canvasElement)) {
    throw new Error("Could not find canvas element in HTML");
  }
  const canvasContext = canvasElement.getContext("2d");
  canvasContext.beginPath();
  canvasContext.arc(100, 100, 50, 0, 2 * Math.PI);
  canvasContext.fillStyle = "red";
  canvasContext.fill();
});
