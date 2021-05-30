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

function scalarMultiplyVector(
  v: [number, number],
  scalar: number
): [number, number] {
  return [scalar * v[0], scalar * v[1]];
}

function addVectors(
  a: [number, number],
  b: [number, number]
): [number, number] {
  return [a[0] + b[0], a[1] + b[1]];
}

function subtractVectors(a: [number, number], b: [number, number]) {
  return addVectors(a, scalarMultiplyVector(b, -1));
}

function rotateVector(
  vector: [number, number],
  about: [number, number],
  angle: number
) {
  const translatedToOrigin = subtractVectors(vector, about);
  const rotatedAboutOrigin: [number, number] = [
    translatedToOrigin[0] * Math.cos(angle),
    translatedToOrigin[1] * Math.sin(angle),
  ];
  return addVectors(rotatedAboutOrigin, about);
}

function drawSquare(
  context: CanvasRenderingContext2D,
  center: [number, number]
) {
  context.strokeStyle = `hsl(${
    (performance.now() / 100) % 360
  }, 100%, 50%, .5)`;
  const right = addVectors(center, [50, 0]);
  const up = addVectors(center, [0, 50]);
  const left = addVectors(center, [-50, 0]);
  const down = addVectors(center, [0, -50]);
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
    drawSquares(canvasElement);
    window.requestAnimationFrame(tick);
  };
  window.requestAnimationFrame(tick);
});
