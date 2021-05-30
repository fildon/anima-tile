import { addVectors, rotateVector } from "./vector";

function isCanvasElement(element: HTMLElement): element is HTMLCanvasElement {
  return element.nodeName === "CANVAS";
}

function maximiseCanvas(canvas: HTMLCanvasElement) {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}

function drawLine(
  context: CanvasRenderingContext2D,
  start: [number, number],
  end: [number, number]
) {
  context.beginPath();
  context.moveTo(...start);
  context.lineTo(...end);
  context.stroke();
}

function drawSquare(
  context: CanvasRenderingContext2D,
  center: [number, number]
) {
  context.strokeStyle = `hsl(${
    (performance.now() / 100) % 360
  }, 100%, 50%, .5)`;
  const angle = (performance.now() / 1000) % (Math.PI * 2);
  const right = rotateVector(addVectors(center, [50, 0]), center, angle);
  const up = rotateVector(addVectors(center, [0, 50]), center, angle);
  const left = rotateVector(addVectors(center, [-50, 0]), center, angle);
  const down = rotateVector(addVectors(center, [0, -50]), center, angle);
  drawLine(context, right, up);
  drawLine(context, up, left);
  drawLine(context, left, down);
  drawLine(context, down, right);
}

function drawSquares(canvas: HTMLCanvasElement) {
  const maxX = canvas.width / 100;
  const maxY = canvas.height / 100;
  for (let i = 0; i < maxX; i++) {
    for (let j = 0; j < maxY; j++) {
      drawSquare(canvas.getContext("2d"), [i * 100, j * 100]);
    }
  }
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
