// import { EdgePosition, CornerPosition } from "@/composables/training/types";
import { computed } from "vue";
import type { CubeImage } from "./types";

import { useSettings } from "@/composables/settings";
import type { PiecePosition } from "@/composables/training/types";
const { settings, computedLetterScheme } = useSettings();

function generateMemo(cube: CubeImage) {
  const edgesMemo = generateEdgesMemo(cube);
  const cornerMemo = generateCornerMemo(cube);
  return { edgesMemo, cornerMemo };
}

function generateEdgesMemo(cube: CubeImage) {
  let edgeMemo: string = "";
  let edgePositionMemo: PiecePosition[] = [];
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
    .map(
      (piecePosition, index) =>
        getLetterFromPiecePosition(piecePosition) + (index % 2 ? " " : "")
    )
    .join("");

  const memo = [edgeMemo, ...edgeFlipMemo].join(" / ");
  return memo;
}

function generateCornerMemo(cube: CubeImage) {
  let cornerMemo: string = "";
  let cornerPositionMemo: PiecePosition[] = [];
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
    .map(
      (piecePosition, index) =>
        getLetterFromPiecePosition(piecePosition) + (index % 2 ? " " : "")
    )
    .join("");

  const memo = [cornerMemo, ...cornerFlipMemo].join(" / ");
  return memo;
}

function generateEdgeCycle(
  cube: CubeImage,
  currentPiecePosition: PiecePosition,
  edgePositionMemo: PiecePosition[],
  edgeFlipMemo: string[],
  edgePositionsMemoed: number[]
) {
  const cycleStartBufferValue = currentPiecePosition;

  const cycleStartBufferEdgePosition = edges.findIndex((edge) =>
    edge.includes(cycleStartBufferValue)
  );

  const cycleMemo: PiecePosition[] = [cycleStartBufferValue];
  const cycleEdgePositionsMemoed: number[] = [cycleStartBufferEdgePosition];

  currentPiecePosition = getNextPiecePosition(cube, currentPiecePosition);

  const currentPiecePositionIndex = edges.findIndex((edge) =>
    edge.includes(currentPiecePosition)
  );

  const isPieceInItsPosition =
    cycleStartBufferEdgePosition === currentPiecePositionIndex;
  if (isPieceInItsPosition) {
    return {
      edgePositionMemo,
      ...generateEdgeFlip(
        currentPiecePosition,
        currentPiecePositionIndex,
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
        currentPiecePosition,
        cycleStartBufferEdgePosition,
        currentPiecePositionIndex,
        cycleMemo,
        edgePositionMemo,
        edgePositionsMemoed,
        cycleEdgePositionsMemoed
      ),
    };
  }
}

function generateEdgeFlip(
  currentPiecePosition: PiecePosition,
  currentPiecePositionIndex: number,
  edgeFlipMemo: string[],
  edgePositionsMemoed: number[],
  cycleEdgePositionsMemoed: number[]
) {
  if (currentPiecePositionIndex !== edges.length - 1) {
    const letterFlippingIndex = edges[currentPiecePositionIndex].findIndex(
      (edgeValue) => edgeValue === currentPiecePosition
    );

    if (letterFlippingIndex === 1) {
      edgeFlipMemo.push(`${currentPiecePosition}-flip`);
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
  currentPiecePosition: PiecePosition,
  cycleStartBufferEdgePosition: number,
  currentPiecePositionIndex: number,
  cycleMemo: PiecePosition[],
  edgePositionMemo: PiecePosition[],
  edgePositionsMemoed: number[],
  cycleEdgePositionsMemoed: number[]
) {
  while (
    currentPiecePositionIndex !== edges.length - 1 &&
    !cycleEdgePositionsMemoed.slice(1).includes(cycleStartBufferEdgePosition)
  ) {
    cycleMemo.push(currentPiecePosition);
    cycleEdgePositionsMemoed.push(currentPiecePositionIndex);
    currentPiecePosition = getNextPiecePosition(cube, currentPiecePosition);
    currentPiecePositionIndex = edges.findIndex((edge) =>
      edge.includes(currentPiecePosition)
    );
  }

  edgePositionMemo = edgePositionMemo.concat(cycleMemo);
  edgePositionsMemoed = edgePositionsMemoed.concat(cycleEdgePositionsMemoed);

  return { edgePositionMemo, edgePositionsMemoed };
}

function generateCornerCycle(
  cube: CubeImage,
  currentPiecePosition: PiecePosition,
  cornerPositionMemo: PiecePosition[],
  cornerFlipMemo: string[],
  cornerPositionsMemoed: number[]
) {
  const cycleStartBufferValue = currentPiecePosition;
  const cycleStartBufferCornerPosition = corners.findIndex((corner) =>
    corner.includes(cycleStartBufferValue)
  );

  const cycleMemo: PiecePosition[] = [cycleStartBufferValue];
  const cycleCornerPositionsMemoed: number[] = [cycleStartBufferCornerPosition];

  currentPiecePosition = getNextPiecePosition(cube, currentPiecePosition);
  const currentPiecePositionIndex = corners.findIndex((corner) =>
    corner.includes(currentPiecePosition)
  );

  const isPieceInItsPosition =
    cycleStartBufferCornerPosition === currentPiecePositionIndex;

  if (isPieceInItsPosition) {
    return {
      cornerPositionMemo,
      ...generateCornerFlip(
        currentPiecePosition,
        currentPiecePositionIndex,
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
        currentPiecePosition,
        cycleStartBufferCornerPosition,
        currentPiecePositionIndex,
        cycleMemo,
        cornerPositionMemo,
        cornerPositionsMemoed,
        cycleCornerPositionsMemoed
      ),
    };
  }
}

function generateCornerFlip(
  currentPiecePosition: PiecePosition,
  currentPiecePositionIndex: number,
  cornerFlipMemo: string[],
  cornerPositionsMemoed: number[],
  cycleCornerPositionsMemoed: number[]
) {
  if (currentPiecePositionIndex !== corners.length - 1) {
    const letterFlippingIndex = corners[currentPiecePositionIndex].findIndex(
      (cornerValue) => cornerValue === currentPiecePosition
    );
    const letter = getLetterFromPiecePosition(currentPiecePosition);
    switch (letterFlippingIndex) {
      case 0:
        break;
      case 1:
        cornerFlipMemo.push(`${letter}-flip`);
        break;
      case 2:
        cornerFlipMemo.push(`${letter}-planche`);
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
  currentPiecePosition: PiecePosition,
  cycleStartBufferCornerPosition: number,
  currentPiecePositionIndex: number,
  cycleMemo: PiecePosition[],
  cornerPositionMemo: PiecePosition[],
  cornerPositionsMemoed: number[],
  cycleCornerPositionsMemoed: number[]
) {
  while (
    currentPiecePositionIndex !== corners.length - 1 &&
    !cycleCornerPositionsMemoed
      .slice(1)
      .includes(cycleStartBufferCornerPosition)
  ) {
    cycleMemo.push(currentPiecePosition);
    cycleCornerPositionsMemoed.push(currentPiecePositionIndex);
    currentPiecePosition = getNextPiecePosition(cube, currentPiecePosition);
    currentPiecePositionIndex = corners.findIndex((corner) =>
      corner.includes(currentPiecePosition)
    );
  }

  cornerPositionMemo = cornerPositionMemo.concat(cycleMemo);
  cornerPositionsMemoed = cornerPositionsMemoed.concat(
    cycleCornerPositionsMemoed
  );

  return { cornerPositionMemo, cornerPositionsMemoed };
}

function getNextPiecePosition(
  cube: CubeImage,
  currentPiecePosition: PiecePosition
) {
  const newBuffer =
    computedLetterScheme.value[currentPiecePosition].positionIndexes;
  return cube[newBuffer[0]][newBuffer[1]][newBuffer[2]];
}

const edgeBuffer = computed(() =>
  Object.values(computedLetterScheme.value).find(
    (piece) =>
      piece.letter === settings.value.blindfolded.edgeBuffer &&
      piece.type === "edge"
  )
);
const cornerBuffer = computed(() =>
  Object.values(computedLetterScheme.value).find(
    (piece) =>
      piece.letter === settings.value.blindfolded.cornerBuffer &&
      piece.type === "corner"
  )
);

const edgeBufferPosition = computed(() => edgeBuffer.value!.positionIndexes);
const cornerBufferPosition = computed(
  () => cornerBuffer.value!.positionIndexes
);

const corners: PiecePosition[][] = [
  ["UBR", "BRU", "RUB"],
  ["BDR", "DRB", "RBD"],
  ["LBU", "BUL", "ULB"],
  ["FUR", "URF", "RFU"],
  ["DBL", "BLD", "LDB"],
  ["DFR", "FRD", "RDF"],
  ["FDL", "DLF", "LFD"],
  ["UFL", "FLU", "LUF"],
];

const edges: PiecePosition[][] = [
  ["UF", "FU"],
  ["UR", "RU"],
  ["UL", "LU"],
  ["RF", "FR"],
  ["LF", "FL"],
  ["DF", "FD"],
  ["RD", "DR"],
  ["DL", "LD"],
  ["RB", "BR"],
  ["BD", "DB"],
  ["BL", "LB"],
  ["UB", "BU"],
];

function getLetterFromPiecePosition(piecePosition: PiecePosition) {
  return computedLetterScheme.value[piecePosition].letter;
}

export default {
  generateMemo,
  corners,
  edges,
  getLetterFromPiecePosition,
};
