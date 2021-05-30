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

export function rotateVector(vector: Vector, about: Vector, angle: number) {
  const translatedToOrigin = subtractVectors(vector, about);
  const rotatedAboutOrigin: Vector = [
    translatedToOrigin[0] * Math.cos(angle) -
      translatedToOrigin[1] * Math.sin(angle),
    translatedToOrigin[0] * Math.sin(angle) +
      translatedToOrigin[1] * Math.cos(angle),
  ];
  return addVectors(rotatedAboutOrigin, about);
}
