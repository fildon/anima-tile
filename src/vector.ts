const { sin, cos } = Math;

export type Vector = [number, number];

function scalarMultiplyVector(v: Vector, scalar: number): Vector {
  return [scalar * v[0], scalar * v[1]];
}

export function addVectors(a: Vector, b: Vector): Vector {
  return [a[0] + b[0], a[1] + b[1]];
}

function subtractVectors(a: Vector, b: Vector) {
  return addVectors(a, scalarMultiplyVector(b, -1));
}

export function rotateVector(vector: Vector, about: Vector, theta: number) {
  const [x, y] = subtractVectors(vector, about);
  const rotatedAboutOrigin: Vector = [
    x * cos(theta) - y * sin(theta),
    x * sin(theta) + y * cos(theta),
  ];
  return addVectors(rotatedAboutOrigin, about);
}
