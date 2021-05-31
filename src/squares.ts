import { addVectors, rotateVector, Vector } from "./vector";

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

function drawSquare(context: CanvasRenderingContext2D, center: Vector) {
  const angle = (performance.now() / 1000) % (Math.PI * 2);
  const relativeVectorsToCorners: Array<Vector> = [
    [50, 0],
    [0, 50],
    [-50, 0],
    [0, -50],
  ];

  const toAbsoluteVector = (v: Vector) => addVectors(v, center);
  const rotateAboutCenter = (v: Vector) => rotateVector(v, center, angle);
  const path = relativeVectorsToCorners
    .map(toAbsoluteVector)
    .map(rotateAboutCenter);

  fillPath(context, path);
}

export function drawSquares(canvas: HTMLCanvasElement) {
  const gridSize = 100; // pixels between square centers
  const canvasCenter: Vector = [canvas.width / 2, canvas.height / 2];

  const topLeft: Vector = [
    (canvasCenter[0] % gridSize) - gridSize,
    (canvasCenter[1] % gridSize) - gridSize,
  ];

  const topRow: Array<Vector> = [topLeft];
  const squaresInRow = canvas.width / gridSize + 2; // +2 to hang off left and right
  for (let i = 1; i < squaresInRow; i++) {
    topRow.push(addVectors(topLeft, [i * gridSize, 0]));
  }
  const gridPositions: Array<Array<Vector>> = [topRow];
  const squaresInColumn = canvas.height / gridSize + 2; // +2 to hang off top and bottom
  for (let j = 1; j < squaresInColumn; j++) {
    gridPositions.push(
      topRow.map((position) => addVectors(position, [0, j * gridSize]))
    );
  }

  const drawSquareOnCanvas = (position: Vector) =>
    drawSquare(canvas.getContext("2d"), position);

  gridPositions.flat().forEach(drawSquareOnCanvas);
}
