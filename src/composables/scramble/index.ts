import { ref } from "vue";
import type { Ref } from "vue";
import type {
  CubeFace,
  CubeImage,
  DisplayScramble,
  FaceInitial,
  MoveSet,
  Scramble,
  SubMoveSet,
} from "./types";
import { useRoute } from "vue-router";
import { useSeed } from "@/composables/seed";

const {
  baseSessionSeed,
  currentScrambleSeed,
  lastGeneratedSeed,
  generateNewSeed,
} = useSeed();

const currentScrambleIndex: Ref<number> = ref(0);
const numberOfMoves: Ref<number> = ref(20);
const currentScramble: Ref<Scramble> = ref([]);
const scramblesHistory: Ref<Scramble[]> = ref([]);

const moveSet: MoveSet = [
  ["U", "U'", "U2"],
  ["B", "B'", "B2"],
  ["F", "F'", "F2"],
  ["D", "D'", "D2"],
  ["L", "L'", "L2"],
  ["R", "R'", "R2"],
];

function initScrambleValues() {
  const route = useRoute();
  goToScrambleIndex(Number(route.params.scrambleIndex));
}

// function to go to a specific scramble in the seeded session
function goToScrambleIndex(scrambleIndex: number) {
  lastGeneratedSeed.value = baseSessionSeed.value;
  for (let i = 0; i < scrambleIndex; i++) {
    goToNextScramble();
  }
}

function goToNextScramble() {
  if (currentScramble.value.length > 0) {
    // add current scramble to the history
    scramblesHistory.value.push(currentScramble.value);
  }
  currentScrambleSeed.value = lastGeneratedSeed.value;
  currentScramble.value = generateScramble();
  currentScrambleIndex.value++;
}

function generateScramble() {
  const scramble: Scramble = [];
  let currentSubMoveSetIndex = 0;
  let previousSubMoveSetIndex = 0;
  let currentSubMoveSet = null;

  // iterate user requested "numberOfMove" times
  for (let i = 0; i < numberOfMoves.value; i++) {
    ({ currentSubMoveSetIndex, currentSubMoveSet } = pickSubMoveSetIndex(
      currentSubMoveSetIndex,
      previousSubMoveSetIndex
    ));

    const move = pickMoveFromSubMoveSet(currentSubMoveSet);
    scramble.push(move);

    // store used sub move set index to make sure we don't use it in next iteration
    previousSubMoveSetIndex = currentSubMoveSetIndex;
  }
  return scramble;
}

function pickSubMoveSetIndex(
  currentSubMoveSetIndex: number,
  previousSubMoveSetIndex: number
) {
  // check if current sub move set is the same as the previous one
  // (to avoid having the same letter 2+ consecutive times in the scramble)
  while (currentSubMoveSetIndex === previousSubMoveSetIndex) {
    // while it is, generate a new random seed and pick a new sub move set
    generateNewSeed();
    currentSubMoveSetIndex = lastGeneratedSeed.value % moveSet.length;
  }
  const currentSubMoveSet = moveSet[currentSubMoveSetIndex];
  return { currentSubMoveSetIndex, currentSubMoveSet };
}

function pickMoveFromSubMoveSet(currentSubMoveSet: SubMoveSet) {
  // once we have chosen a different sub move set than the previous one,
  // we want to pick a random move in this set to add it to the scramble
  generateNewSeed();
  return currentSubMoveSet[lastGeneratedSeed.value % currentSubMoveSet.length];
}

function stringifiedScramble(scramble: Scramble): DisplayScramble {
  return scramble.join(" ");
}

function lastNScrambles(n: number) {
  const nScrambles = scramblesHistory.value.slice(-n);
  return nScrambles.reverse();
}

const solvedImageArray = () => {
  return [
    [
      ["U", "U", "U"],
      ["U", "U", "U"],
      ["U", "U", "U"],
    ],
    [
      ["L", "L", "L"],
      ["L", "L", "L"],
      ["L", "L", "L"],
    ],
    [
      ["F", "F", "F"],
      ["F", "F", "F"],
      ["F", "F", "F"],
    ],
    [
      ["R", "R", "R"],
      ["R", "R", "R"],
      ["R", "R", "R"],
    ],
    [
      ["B", "B", "B"],
      ["B", "B", "B"],
      ["B", "B", "B"],
    ],
    [
      ["D", "D", "D"],
      ["D", "D", "D"],
      ["D", "D", "D"],
    ],
  ] as CubeImage;
};

function getScrambledImage(scramble: Scramble): CubeImage {
  const simplifiedScramble = getSimplifiedScramble(scramble);
  let cube = solvedImageArray();
  simplifiedScramble.forEach((move) => {
    switch (move) {
      case "U":
        cube = turnUpFace(cube);
        break;
      case "L":
        cube = turnLeftFace(cube);
        break;
      case "F":
        cube = turnFrontFace(cube);
        break;
      case "R":
        cube = turnRightFace(cube);
        break;
      case "B":
        cube = turnBackFace(cube);
        break;
      case "D":
        cube = turnDownFace(cube);
        break;
    }
  });
  return cube;
}

// function to transform a scramble from
// ["U2", "F", "B'", "F2"]
// to
// ["U", "U", "F", "B", "B", "B", "F", "F"]
function getSimplifiedScramble(scramble: Scramble) {
  return scramble
    .map((move) => {
      const moveLetter = move[0];
      if (move.includes("2")) {
        return [moveLetter, moveLetter];
      } else if (move.includes("'")) {
        return [moveLetter, moveLetter, moveLetter];
      } else {
        return moveLetter;
      }
    })
    .flat();
}

function turnUpFace(cube: CubeImage): CubeImage {
  cube = faceQuarterTurn(cube, "U");
  const leftFaceTopRow = getFaceLine(cube, "L", "row", "top");
  const frontFaceTopRow = getFaceLine(cube, "F", "row", "top");
  const rightFaceTopRow = getFaceLine(cube, "R", "row", "top");
  const backFaceTopRow = getFaceLine(cube, "B", "row", "top");
  cube = setFaceLine(cube, "L", "row", "top", frontFaceTopRow);
  cube = setFaceLine(cube, "F", "row", "top", rightFaceTopRow);
  cube = setFaceLine(cube, "R", "row", "top", backFaceTopRow);
  cube = setFaceLine(cube, "B", "row", "top", leftFaceTopRow);
  return cube;
}

function turnLeftFace(cube: CubeImage): CubeImage {
  cube = faceQuarterTurn(cube, "L");
  const upFaceLeftColumn = getFaceLine(cube, "U", "column", "left");
  const frontFaceLeftColumn = getFaceLine(cube, "F", "column", "left");
  const downFaceLeftColumn = getFaceLine(cube, "D", "column", "left");
  const backFaceRightColumn = getFaceLine(cube, "B", "column", "right");
  cube = setFaceLine(
    cube,
    "U",
    "column",
    "left",
    backFaceRightColumn.reverse()
  );
  cube = setFaceLine(cube, "F", "column", "left", upFaceLeftColumn);
  cube = setFaceLine(cube, "D", "column", "left", frontFaceLeftColumn);
  cube = setFaceLine(
    cube,
    "B",
    "column",
    "right",
    downFaceLeftColumn.reverse()
  );
  return cube;
}

function turnFrontFace(cube: CubeImage): CubeImage {
  cube = faceQuarterTurn(cube, "F");
  const leftFaceRightColumn = getFaceLine(cube, "L", "column", "right");
  const upFaceBottomRow = getFaceLine(cube, "U", "row", "bottom");
  const rightFaceLeftColumn = getFaceLine(cube, "R", "column", "left");
  const downFaceTopRow = getFaceLine(cube, "D", "row", "top");
  cube = setFaceLine(cube, "L", "column", "right", downFaceTopRow);
  cube = setFaceLine(cube, "U", "row", "bottom", leftFaceRightColumn.reverse());
  cube = setFaceLine(cube, "R", "column", "left", upFaceBottomRow);
  cube = setFaceLine(cube, "D", "row", "top", rightFaceLeftColumn.reverse());
  return cube;
}
function turnRightFace(cube: CubeImage): CubeImage {
  cube = faceQuarterTurn(cube, "R");
  const frontFaceRightColumn = getFaceLine(cube, "F", "column", "right");
  const upFaceRightColumn = getFaceLine(cube, "U", "column", "right");
  const BackFaceLeftColumn = getFaceLine(cube, "B", "column", "left");
  const downFaceRightColumn = getFaceLine(cube, "D", "column", "right");
  cube = setFaceLine(cube, "F", "column", "right", downFaceRightColumn);
  cube = setFaceLine(cube, "U", "column", "right", frontFaceRightColumn);
  cube = setFaceLine(cube, "B", "column", "left", upFaceRightColumn.reverse());
  cube = setFaceLine(
    cube,
    "D",
    "column",
    "right",
    BackFaceLeftColumn.reverse()
  );
  return cube;
}
function turnBackFace(cube: CubeImage): CubeImage {
  cube = faceQuarterTurn(cube, "B");
  const leftFaceLeftColumn = getFaceLine(cube, "L", "column", "left");
  const upFaceTopRow = getFaceLine(cube, "U", "row", "top");
  const rightFaceRightColumn = getFaceLine(cube, "R", "column", "right");
  const downFaceBottomRow = getFaceLine(cube, "D", "row", "bottom");
  cube = setFaceLine(cube, "L", "column", "left", upFaceTopRow.reverse());
  cube = setFaceLine(cube, "U", "row", "top", rightFaceRightColumn);
  cube = setFaceLine(cube, "R", "column", "right", downFaceBottomRow.reverse());
  cube = setFaceLine(cube, "D", "row", "bottom", leftFaceLeftColumn);
  return cube;
}
function turnDownFace(cube: CubeImage): CubeImage {
  cube = faceQuarterTurn(cube, "D");
  const leftFaceBottomRow = getFaceLine(cube, "L", "row", "bottom");
  const frontFaceBottomRow = getFaceLine(cube, "F", "row", "bottom");
  const rightFaceBottomRow = getFaceLine(cube, "R", "row", "bottom");
  const backFaceBottomRow = getFaceLine(cube, "B", "row", "bottom");
  cube = setFaceLine(cube, "L", "row", "bottom", backFaceBottomRow);
  cube = setFaceLine(cube, "F", "row", "bottom", leftFaceBottomRow);
  cube = setFaceLine(cube, "R", "row", "bottom", frontFaceBottomRow);
  cube = setFaceLine(cube, "B", "row", "bottom", rightFaceBottomRow);
  return cube;
}
function faceQuarterTurn(cube: CubeImage, faceInitial: FaceInitial): CubeImage {
  const faceIndex = getFaceIndexFromFaceInitial(faceInitial);
  const face = cube[faceIndex];

  const topRowCopy = getFaceTopRow(face);
  const leftColumnCopy = getFaceLeftColumn(face);
  const bottomRowCopy = getFaceBottomRow(face);
  const rightColumnCopy = getFaceRightColumn(face);

  cube = setFaceLine(cube, faceInitial, "row", "top", leftColumnCopy.reverse());
  cube = setFaceLine(cube, faceInitial, "column", "left", bottomRowCopy);
  cube = setFaceLine(
    cube,
    faceInitial,
    "row",
    "bottom",
    rightColumnCopy.reverse()
  );
  cube = setFaceLine(cube, faceInitial, "column", "right", topRowCopy);
  return cube;
}

function getFaceLine(
  cube: CubeImage,
  faceInitial: FaceInitial,
  type: "row" | "column",
  direction: "top" | "bottom" | "left" | "right"
) {
  const faceIndex = getFaceIndexFromFaceInitial(faceInitial);
  const face = cube[faceIndex];

  if (type === "row") {
    if (direction === "top") {
      return getFaceTopRow(face);
    } else {
      return getFaceBottomRow(face);
    }
  } else {
    if (direction === "left") {
      return getFaceLeftColumn(face);
    } else {
      return getFaceRightColumn(face);
    }
  }
}

function setFaceLine(
  cube: CubeImage,
  faceInitial: FaceInitial,
  type: "row" | "column",
  direction: "top" | "bottom" | "left" | "right",
  newLineValue: FaceInitial[]
) {
  const initialsOrder: FaceInitial[] = ["U", "L", "F", "R", "B", "D"];
  const faceIndex = initialsOrder.indexOf(faceInitial);
  const faceCopy = copyObj(cube[faceIndex]);
  if (type === "row") {
    if (direction === "top") {
      cube[faceIndex] = setFaceTopRow(faceCopy, newLineValue);
    } else {
      cube[faceIndex] = setFaceBottomRow(faceCopy, newLineValue);
    }
  } else {
    if (direction === "left") {
      cube[faceIndex] = setFaceLeftColumn(faceCopy, newLineValue);
    } else {
      cube[faceIndex] = setFaceRightColumn(faceCopy, newLineValue);
    }
  }
  return cube;
}

function getFaceIndexFromFaceInitial(faceInitial: FaceInitial) {
  const initialsOrder: FaceInitial[] = ["U", "L", "F", "R", "B", "D"];
  return initialsOrder.indexOf(faceInitial);
}

function getFaceTopRow(face: CubeFace): FaceInitial[] {
  return copyObj(face[0]);
}
function setFaceTopRow(face: CubeFace, newRowValue: FaceInitial[]): CubeFace {
  const faceCopy = copyObj(face);
  faceCopy[0] = copyObj(newRowValue);
  return faceCopy;
}

function getFaceBottomRow(face: CubeFace): FaceInitial[] {
  return copyObj(face[2]);
}
function setFaceBottomRow(
  face: CubeFace,
  newRowValue: FaceInitial[]
): CubeFace {
  const faceCopy = copyObj(face);
  faceCopy[2] = copyObj(newRowValue);
  return faceCopy;
}

function getFaceLeftColumn(face: CubeFace): FaceInitial[] {
  return copyObj(face.map((row) => row[0]));
}
function setFaceLeftColumn(
  face: CubeFace,
  newColumnValue: FaceInitial[]
): CubeFace {
  const faceCopy = copyObj(face);
  faceCopy[0][0] = newColumnValue[0];
  faceCopy[1][0] = newColumnValue[1];
  faceCopy[2][0] = newColumnValue[2];
  return faceCopy;
}

function getFaceRightColumn(face: CubeFace): FaceInitial[] {
  return copyObj(face.map((row) => row[2]));
}
function setFaceRightColumn(
  face: CubeFace,
  newColumnValue: FaceInitial[]
): CubeFace {
  const faceCopy = copyObj(face);
  faceCopy[0][2] = newColumnValue[0];
  faceCopy[1][2] = newColumnValue[1];
  faceCopy[2][2] = newColumnValue[2];
  return faceCopy;
}

function copyObj(obj: Object) {
  return JSON.parse(JSON.stringify(obj));
}

export function useScramble() {
  return {
    numberOfMoves,
    initScrambleValues,
    currentScramble,
    generateScramble,
    stringifiedScramble,
    currentScrambleIndex,
    goToNextScramble,
    scramblesHistory,
    lastNScrambles,
    getScrambledImage,
    getSimplifiedScramble,
    solvedImageArray,
  };
}
