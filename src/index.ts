function isCanvasElement(element: HTMLElement): element is HTMLCanvasElement {
  return element.nodeName === "CANVAS";
}

function maximiseCanvas(canvas: HTMLCanvasElement) {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}

function drawCircle(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  context.beginPath();
  const x = canvas.width * Math.random();
  const y = canvas.height * Math.random();
  context.arc(x, y, 25, 0, 2 * Math.PI);
  context.fillStyle = `hsl(${(performance.now() / 100) % 360}, 100%, 50%, .5)`;
  context.fill();
}

document.addEventListener("DOMContentLoaded", () => {
  const canvasElement = document.getElementById("canvas");
  if (!isCanvasElement(canvasElement)) {
    throw new Error("Could not find canvas element in HTML");
  }
  maximiseCanvas(canvasElement);
  const tick = (_currentTime: number) => {
    drawCircle(canvasElement);
    window.requestAnimationFrame(tick);
  };
  window.requestAnimationFrame(tick);
});
