import { Vector, addVectors, rotateVector } from "./vector";

// This allows tests to pass even with small rounding errors
function vectorNearlyEquals(a: Vector, b: Vector) {
  const xDiff = Math.abs(a[0] - b[0]);
  const yDiff = Math.abs(a[1] - b[1]);
  return xDiff < 0.0001 && yDiff < 0.0001;
}

describe("Vector", () => {
  test.each`
    a            | b             | expected
    ${[0, 0]}    | ${[0, 0]}     | ${[0, 0]}
    ${[1, 2]}    | ${[3, 4]}     | ${[4, 6]}
    ${[100, -2]} | ${[352, -23]} | ${[452, -25]}
  `("returns $expected when $a is added to $b", ({ a, b, expected }) => {
    expect(addVectors(a, b)).toEqual(expected);
  });

  test.each`
    vector     | about      | angle             | expected
    ${[0, 0]}  | ${[0, 0]}  | ${0}              | ${[0, 0]}
    ${[1, 0]}  | ${[0, 0]}  | ${Math.PI * 0.5}  | ${[0, 1]}
    ${[1, 1]}  | ${[0, 0]}  | ${Math.PI * 0.5}  | ${[-1, 1]}
    ${[5, 7]}  | ${[0, 0]}  | ${Math.PI}        | ${[-5, -7]}
    ${[1, 1]}  | ${[1, 1]}  | ${12}             | ${[1, 1]}
    ${[0, 0]}  | ${[1, 1]}  | ${Math.PI * 0.5}  | ${[2, 0]}
    ${[-1, 2]} | ${[-3, 4]} | ${-Math.PI * 0.5} | ${[-5, 2]}
  `(
    "returns $expected when $vector is rotated about $about by $angle",
    ({ vector, about, angle, expected }) => {
      const rotatedVector = rotateVector(vector, about, angle);

      expect(vectorNearlyEquals(rotatedVector, expected)).toBe(true);
    }
  );
});
