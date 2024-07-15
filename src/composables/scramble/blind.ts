import type { CubeImage, StickerValue } from "./types";

function generateMemo(cube: CubeImage) {
  const edgesMemo = generateEdgesMemo(cube);
  const cornerMemo = generateCornerMemo(cube);
  return { edgesMemo, cornerMemo };
}

function generateEdgesMemo(cube: CubeImage) {
  let edgeMemo: string = "";
  let edgePositionMemo: StickerValue[] = [];
  let edgeFlipMemo: string[] = [];
  let edgePositionsMemoed: number[] = [];
  let edgeBufferValue = cube[edgeBuffer[0]][edgeBuffer[1]][edgeBuffer[2]];

  while ([...new Set(edgePositionsMemoed)].length < edges.length - 1) {
    ({ edgePositionMemo, edgeFlipMemo, edgePositionsMemoed } =
      generateEdgeCycle(
        cube,
        edgeBufferValue,
        edgePositionMemo,
        edgeFlipMemo,
        edgePositionsMemoed
      ));

    edgeBufferValue = edges.filter(
      (_edge, index) => !edgePositionsMemoed.includes(index)
    )?.[0]?.[0];
  }

  edgeMemo = edgePositionMemo
    .map((sticker, index) => sticker + (index % 2 ? " " : ""))
    .join("");

  const memo = [edgeMemo, ...edgeFlipMemo].join(". ");
  return memo;
}

function generateCornerMemo(cube: CubeImage) {
  let cornerMemo: string = "";
  let cornerPositionMemo: StickerValue[] = [];
  let cornerFlipMemo: string[] = [];
  let cornerPositionsMemoed: number[] = [];
  let cornerBufferValue =
    cube[cornerBuffer[0]][cornerBuffer[1]][cornerBuffer[2]];

  // get all corner positions memoed & filter duplicates. Check that we have all of them except the buffer one (so n-1) which we don't memo
  while ([...new Set(cornerPositionsMemoed)].length < corners.length - 1) {
    ({ cornerPositionMemo, cornerFlipMemo, cornerPositionsMemoed } =
      generateCornerCycle(
        cube,
        cornerBufferValue,
        cornerPositionMemo,
        cornerFlipMemo,
        cornerPositionsMemoed
      ));

    cornerBufferValue = corners.filter(
      (_corner, index) => !cornerPositionsMemoed.includes(index)
    )?.[0]?.[0];
  }

  // join by pairs
  cornerMemo = cornerPositionMemo
    .map((sticker, index) => sticker + (index % 2 ? " " : ""))
    .join("");
  // .map(
  //   (sticker, index) =>
  //     cornerMemoMapping[sticker][index % 4] + (index % 4 === 3 ? ". " : " ")
  // )
  // .join("");

  const memo = [cornerMemo, ...cornerFlipMemo].join(" ");
  return memo;
}

function generateEdgeCycle(
  cube: CubeImage,
  currentBufferValue: StickerValue,
  edgePositionMemo: StickerValue[],
  edgeFlipMemo: string[],
  edgePositionsMemoed: number[]
) {
  const cycleStartBufferValue = currentBufferValue;

  const cycleStartBufferEdgePosition = edges.findIndex((edge) =>
    edge.includes(cycleStartBufferValue)
  );

  const cycleMemo: StickerValue[] = [cycleStartBufferValue];
  const cycleEdgePositionsMemoed: number[] = [cycleStartBufferEdgePosition];

  currentBufferValue = getNextEdgeBufferValue(cube, currentBufferValue);
  const currentBufferValuePosition = edges.findIndex((edge) =>
    edge.includes(currentBufferValue)
  );

  const isPieceInItsPosition =
    cycleStartBufferEdgePosition === currentBufferValuePosition;
  if (isPieceInItsPosition) {
    return {
      edgePositionMemo,
      ...generateEdgeFlip(
        currentBufferValue,
        currentBufferValuePosition,
        edgeFlipMemo,
        edgePositionsMemoed,
        cycleEdgePositionsMemoed
      ),
    };
  } else {
    return {
      edgeFlipMemo,
      ...generateEdgePositionCycle(
        cube,
        currentBufferValue,
        cycleStartBufferEdgePosition,
        currentBufferValuePosition,
        cycleMemo,
        edgePositionMemo,
        edgePositionsMemoed,
        cycleEdgePositionsMemoed
      ),
    };
  }
}

function generateEdgeFlip(
  currentBufferValue: StickerValue,
  currentBufferValuePosition: number,
  edgeFlipMemo: string[],
  edgePositionsMemoed: number[],
  cycleEdgePositionsMemoed: number[]
) {
  if (currentBufferValuePosition !== edges.length - 1) {
    const letterFlippingIndex = edges[currentBufferValuePosition].findIndex(
      (edgeValue) => edgeValue === currentBufferValue
    );

    if (letterFlippingIndex === 1) {
      edgeFlipMemo.push(`${currentBufferValue} flip`);
    }
    edgePositionsMemoed = edgePositionsMemoed.concat(cycleEdgePositionsMemoed);
  }

  return {
    edgeFlipMemo: edgeFlipMemo,
    edgePositionsMemoed,
  };
}

function generateEdgePositionCycle(
  cube: CubeImage,
  currentBufferValue: StickerValue,
  cycleStartBufferEdgePosition: number,
  currentBufferValuePosition: number,
  cycleMemo: StickerValue[],
  edgePositionMemo: StickerValue[],
  edgePositionsMemoed: number[],
  cycleEdgePositionsMemoed: number[]
) {
  while (
    currentBufferValuePosition !== edges.length - 1 &&
    !cycleEdgePositionsMemoed.slice(1).includes(cycleStartBufferEdgePosition)
  ) {
    cycleMemo.push(currentBufferValue);
    cycleEdgePositionsMemoed.push(currentBufferValuePosition);
    currentBufferValue = getNextEdgeBufferValue(cube, currentBufferValue);
    currentBufferValuePosition = edges.findIndex((edge) =>
      edge.includes(currentBufferValue)
    );
  }

  edgePositionMemo = edgePositionMemo.concat(cycleMemo);
  edgePositionsMemoed = edgePositionsMemoed.concat(cycleEdgePositionsMemoed);

  return { edgePositionMemo, edgePositionsMemoed };
}

function generateCornerCycle(
  cube: CubeImage,
  currentBufferValue: StickerValue,
  cornerPositionMemo: StickerValue[],
  cornerFlipMemo: string[],
  cornerPositionsMemoed: number[]
) {
  const cycleStartBufferValue = currentBufferValue;
  const cycleStartBufferCornerPosition = corners.findIndex((corner) =>
    corner.includes(cycleStartBufferValue)
  );

  const cycleMemo: StickerValue[] = [cycleStartBufferValue];
  const cycleCornerPositionsMemoed: number[] = [cycleStartBufferCornerPosition];

  currentBufferValue = getNextCornerBufferValue(cube, currentBufferValue);
  const currentBufferValuePosition = corners.findIndex((corner) =>
    corner.includes(currentBufferValue)
  );

  const isPieceInItsPosition =
    cycleStartBufferCornerPosition === currentBufferValuePosition;

  if (isPieceInItsPosition) {
    return {
      cornerPositionMemo,
      ...generateCornerFlip(
        currentBufferValue,
        currentBufferValuePosition,
        cornerFlipMemo,
        cornerPositionsMemoed,
        cycleCornerPositionsMemoed
      ),
    };
  } else {
    return {
      cornerFlipMemo,
      ...generateCornerPositionCycle(
        cube,
        currentBufferValue,
        cycleStartBufferCornerPosition,
        currentBufferValuePosition,
        cycleMemo,
        cornerPositionMemo,
        cornerPositionsMemoed,
        cycleCornerPositionsMemoed
      ),
    };
  }
}

function generateCornerFlip(
  currentBufferValue: StickerValue,
  currentBufferValuePosition: number,
  cornerFlipMemo: string[],
  cornerPositionsMemoed: number[],
  cycleCornerPositionsMemoed: number[]
) {
  if (currentBufferValuePosition !== corners.length - 1) {
    cornerPositionsMemoed = cornerPositionsMemoed.concat(
      cycleCornerPositionsMemoed
    );
  }
  return {
    cornerFlipMemo,
    cornerPositionsMemoed,
  };
}

function generateCornerPositionCycle(
  cube: CubeImage,
  currentBufferValue: StickerValue,
  cycleStartBufferCornerPosition: number,
  currentBufferValuePosition: number,
  cycleMemo: StickerValue[],
  cornerPositionMemo: StickerValue[],
  cornerPositionsMemoed: number[],
  cycleCornerPositionsMemoed: number[]
) {
  while (
    currentBufferValuePosition !== corners.length - 1 &&
    !cycleCornerPositionsMemoed
      .slice(1)
      .includes(cycleStartBufferCornerPosition)
  ) {
    cycleMemo.push(currentBufferValue);
    cycleCornerPositionsMemoed.push(currentBufferValuePosition);
    currentBufferValue = getNextCornerBufferValue(cube, currentBufferValue);
    currentBufferValuePosition = corners.findIndex((corner) =>
      corner.includes(currentBufferValue)
    );
  }

  cornerPositionMemo = cornerPositionMemo.concat(cycleMemo);
  cornerPositionsMemoed = cornerPositionsMemoed.concat(
    cycleCornerPositionsMemoed
  );

  return { cornerPositionMemo, cornerPositionsMemoed };
}

function getNextEdgeBufferValue(
  cube: CubeImage,
  currentBufferValue: StickerValue
) {
  const newBuffer = edgeLetters[currentBufferValue];
  return cube[newBuffer[0]][newBuffer[1]][newBuffer[2]];
}

function getNextCornerBufferValue(
  cube: CubeImage,
  currentBufferValue: StickerValue
) {
  const newBuffer = cornerLetters[currentBufferValue];
  return cube[newBuffer[0]][newBuffer[1]][newBuffer[2]];
}

const edgeLetters: Record<StickerValue, [number, number, number]> = {
  A: [0, 1, 0],
  B: [0, 0, 1],
  C: [0, 1, 2],
  D: [0, 2, 1],

  E: [3, 0, 1],
  F: [3, 1, 2],
  G: [3, 2, 1],
  H: [3, 1, 0],

  I: [4, 0, 1],
  J: [4, 1, 2],
  K: [4, 2, 1],
  L: [4, 1, 0],

  M: [1, 0, 1],
  N: [1, 1, 2],
  O: [1, 2, 1],
  P: [1, 1, 0],

  Q: [2, 0, 1],
  R: [2, 1, 2],
  S: [2, 2, 1],
  T: [2, 1, 0],

  U: [5, 1, 2],
  V: [5, 2, 1],
  W: [5, 1, 0],
  X: [5, 0, 1],

  z: [6, 6, 6],
};

const cornerLetters: Record<StickerValue, [number, number, number]> = {
  A: [0, 2, 0],
  B: [0, 0, 0],
  C: [0, 0, 2],
  D: [0, 2, 2],

  E: [3, 0, 0],
  F: [3, 0, 2],
  G: [3, 2, 2],
  H: [3, 2, 0],

  I: [4, 0, 0],
  J: [4, 0, 2],
  K: [4, 2, 2],
  L: [4, 2, 0],

  M: [1, 0, 0],
  N: [1, 0, 2],
  O: [1, 2, 2],
  P: [1, 2, 0],

  Q: [2, 0, 0],
  R: [2, 0, 2],
  S: [2, 2, 2],
  T: [2, 2, 0],

  U: [5, 0, 2],
  V: [5, 2, 2],
  W: [5, 2, 0],
  X: [5, 0, 0],

  z: [6, 6, 6],
};

const edgeBuffer = edgeLetters.B;
const cornerBuffer = cornerLetters.A;

const corners: StickerValue[][] = [
  ["C", "I", "F"], // infirmiere
  ["L", "V", "G"], // blanche neige
  ["M", "J", "B"], // sangoku
  ["R", "D", "E"], // link
  ["W", "K", "P"], // facteur
  ["U", "S", "H"], // clover
  ["T", "X", "O"], // tortue ninja
  ["A", "Q", "N"], // buffer
];

const edges: StickerValue[][] = [
  ["D", "Q"],
  ["C", "E"],
  ["A", "M"],
  ["H", "R"],
  ["N", "T"],
  ["X", "S"],
  ["G", "U"],
  ["W", "O"],
  ["F", "L"],
  ["K", "V"],
  ["J", "P"],
  ["B", "I"],
];

export default {
  generateMemo,
  corners,
};
