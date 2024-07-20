// import { EdgePosition, CornerPosition } from "@/composables/training/types";
import { computed } from "vue";
import type { CubeImage, StickerValue } from "./types";

import { useSettings } from "@/composables/settings";
const { computedLetterScheme } = useSettings();

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
  let edgeBufferValue =
    cube[edgeBufferPosition.value[0]][edgeBufferPosition.value[1]][
      edgeBufferPosition.value[2]
    ];

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

  const memo = [edgeMemo, ...edgeFlipMemo].join(" / ");
  return memo;
}

function generateCornerMemo(cube: CubeImage) {
  let cornerMemo: string = "";
  let cornerPositionMemo: StickerValue[] = [];
  let cornerFlipMemo: string[] = [];
  let cornerPositionsMemoed: number[] = [];
  let cornerBufferValue =
    cube[cornerBufferPosition.value[0]][cornerBufferPosition.value[1]][
      cornerBufferPosition.value[2]
    ];

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

  const memo = [cornerMemo, ...cornerFlipMemo].join(" / ");
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
      edgeFlipMemo.push(`${currentBufferValue}-flip`);
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
    const letterFlippingIndex = corners[currentBufferValuePosition].findIndex(
      (cornerValue) => cornerValue === currentBufferValue
    );

    switch (letterFlippingIndex) {
      case 0:
        break;
      case 1:
        cornerFlipMemo.push(`${currentBufferValue}-flip`);
        break;
      case 2:
        cornerFlipMemo.push(`${currentBufferValue}-planche`);
        break;
    }
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
  const newBuffer = edgeLetters.value[currentBufferValue];
  return cube[newBuffer[0]][newBuffer[1]][newBuffer[2]];
}

function getNextCornerBufferValue(
  cube: CubeImage,
  currentBufferValue: StickerValue
) {
  const newBuffer = cornerLetters.value[currentBufferValue];
  return cube[newBuffer[0]][newBuffer[1]][newBuffer[2]];
}
const edgeLetters = computed(() => {
  return Object.fromEntries(
    Object.values(computedLetterScheme.value)
      .filter((value) => value.type === "edge")
      .map((value) => {
        return [value.letter, value.position];
      })
  ) as Record<StickerValue, [number, number, number]>;
});

const cornerLetters = computed(() => {
  return Object.fromEntries(
    Object.values(computedLetterScheme.value)
      .filter((value) => value.type === "corner")
      .map((value) => {
        return [value.letter, value.position];
      })
  ) as Record<StickerValue, [number, number, number]>;
});

const edgeBuffer = computed(() => computedLetterScheme.value.UB);
const cornerBuffer = computed(() => computedLetterScheme.value.UFL);

const edgeBufferPosition = computed(
  () => edgeLetters.value[edgeBuffer.value.letter]
);
const cornerBufferPosition = computed(
  () => cornerLetters.value[cornerBuffer.value.letter]
);

const corners: StickerValue[][] = [
  [
    computedLetterScheme.value.UBR.letter,
    computedLetterScheme.value.BRU.letter,
    computedLetterScheme.value.RUB.letter,
  ],
  [
    computedLetterScheme.value.BDR.letter,
    computedLetterScheme.value.DRB.letter,
    computedLetterScheme.value.RBD.letter,
  ],
  [
    computedLetterScheme.value.LBU.letter,
    computedLetterScheme.value.BUL.letter,
    computedLetterScheme.value.ULB.letter,
  ],
  [
    computedLetterScheme.value.FUR.letter,
    computedLetterScheme.value.URF.letter,
    computedLetterScheme.value.RFU.letter,
  ],
  [
    computedLetterScheme.value.DBL.letter,
    computedLetterScheme.value.BLD.letter,
    computedLetterScheme.value.LDB.letter,
  ],
  [
    computedLetterScheme.value.DFR.letter,
    computedLetterScheme.value.FRD.letter,
    computedLetterScheme.value.RDF.letter,
  ],
  [
    computedLetterScheme.value.FDL.letter,
    computedLetterScheme.value.DLF.letter,
    computedLetterScheme.value.LFD.letter,
  ],
  [
    computedLetterScheme.value.UFL.letter,
    computedLetterScheme.value.FLU.letter,
    computedLetterScheme.value.LUF.letter,
  ],
];

const edges: StickerValue[][] = [
  [computedLetterScheme.value.UF.letter, computedLetterScheme.value.FU.letter], //D,Q],
  [computedLetterScheme.value.UR.letter, computedLetterScheme.value.RU.letter], //C,E],
  [computedLetterScheme.value.UL.letter, computedLetterScheme.value.LU.letter], //A,M],
  [computedLetterScheme.value.RF.letter, computedLetterScheme.value.FR.letter], //H,R],
  [computedLetterScheme.value.LF.letter, computedLetterScheme.value.FL.letter], //N,T],
  [computedLetterScheme.value.DF.letter, computedLetterScheme.value.FD.letter], //X,S],
  [computedLetterScheme.value.RD.letter, computedLetterScheme.value.DR.letter], //G,U],
  [computedLetterScheme.value.DL.letter, computedLetterScheme.value.LD.letter], //W,O],
  [computedLetterScheme.value.RB.letter, computedLetterScheme.value.BR.letter], //F,L],
  [computedLetterScheme.value.BD.letter, computedLetterScheme.value.DB.letter], //K,V],
  [computedLetterScheme.value.BL.letter, computedLetterScheme.value.LB.letter], //J,P],
  [computedLetterScheme.value.UB.letter, computedLetterScheme.value.BU.letter], //B,I],
];

export default {
  generateMemo,
  corners,
  edges,
};
