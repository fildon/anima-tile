import { Vector, addVectors, rotateVector } from "./vector";

function isCanvasElement(element: HTMLElement): element is HTMLCanvasElement {
  return element.nodeName === "CANVAS";
}

function maximiseCanvas(canvas: HTMLCanvasElement) {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}

function fillPath(context: CanvasRenderingContext2D, points: Array<Vector>) {
  if (points.length === 0) return;
  context.fillStyle = `hsl(${(performance.now() / 100) % 360}, 100%, 50%, .5)`;
  const [first, ...others] = points;
  context.beginPath();
  context.moveTo(...first);
  others.forEach((other) => context.lineTo(...other));
  context.closePath();
  context.fill();
}

function drawSquare(
  context: CanvasRenderingContext2D,
  center: [number, number]
) {
  const angle = (performance.now() / 1000) % (Math.PI * 2);
  const right = rotateVector(addVectors(center, [50, 0]), center, angle);
  const up = rotateVector(addVectors(center, [0, 50]), center, angle);
  const left = rotateVector(addVectors(center, [-50, 0]), center, angle);
  const down = rotateVector(addVectors(center, [0, -50]), center, angle);

  fillPath(context, [right, up, left, down]);
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
