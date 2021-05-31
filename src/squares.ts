import { addVectors, rotateVector, Vector } from "./vector";

const gridSize = 100;

function fillPath(context: CanvasRenderingContext2D, points: Array<Vector>) {
  if (points.length === 0) return;
  const [first, ...others] = points;
  context.beginPath();
  context.moveTo(...first);
  others.forEach((other) => context.lineTo(...other));
  context.closePath();
  context.fillStyle = `hsl(${
    (performance.now() / 100 + (first[0] + first[1]) / 20) % 360
  }, 100%, 50%, .5)`;
  context.fill();
}

function getDistanceToCorner(angle: number) {
  const nearestAngle = angle % (Math.PI * 0.5);
  const angleOnSharedEdge = 0.75 * Math.PI - nearestAngle;
  const maximumDistance =
    0.5 * gridSize * Math.sqrt(2) * Math.sin(angleOnSharedEdge);
  const marginBetweenSquares = 1;
  return maximumDistance - marginBetweenSquares;
}

function drawSquare(context: CanvasRenderingContext2D, center: Vector) {
  const angle = (performance.now() / 1000) % (Math.PI * 2);

  const distanceToCorner = getDistanceToCorner(angle);
  const relativeVectorsToCorners: Array<Vector> = [
    [distanceToCorner, 0],
    [0, distanceToCorner],
    [-distanceToCorner, 0],
    [0, -distanceToCorner],
  ];

  const toAbsoluteVector = (v: Vector) => addVectors(v, center);
  const rotateAboutCenter = (v: Vector) => rotateVector(v, center, angle);
  const path = relativeVectorsToCorners
    .map(toAbsoluteVector)
    .map(rotateAboutCenter);

  fillPath(context, path);
}

export function drawSquares(canvas: HTMLCanvasElement) {
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
