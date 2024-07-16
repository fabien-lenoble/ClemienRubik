import { useScramble } from "@/composables/scramble";
import type { StickerValue } from "@/composables/scramble/types";
import type { CornerColor } from "@/composables/training/types";
import constants from "@/constants";
import { computed, ref, type Ref } from "vue";
const { cornerColors } = constants;

const { edges, corners, getInitialRotation, getScrambledImage } = useScramble();

const edgePiecesPool: [number, number, number][][] = [
  [
    // UF
    [0, 2, 1],
    [2, 0, 1],
  ],
  [
    // FR
    [2, 1, 2],
    [3, 1, 0],
  ],
  [
    // UR
    [0, 1, 2],
    [3, 0, 1],
  ],
];

const cornerPiecesPool: [number, number, number][][] = [
  [
    // UFR
    [0, 2, 2],
    [2, 0, 2],
    [3, 0, 0],
  ],
];

const poolType = ref("edges");

const piecesPool = computed(() => {
  if (poolType.value === "edges") {
    return edgePiecesPool;
  } else {
    return cornerPiecesPool;
  }
});

function setPool(type: "edges" | "corners") {
  poolType.value = type;
}

const currentSelectedPiece = ref(piecesPool.value[0]);
const currentSelectedStickerIndex = ref(piecesPool.value[0][0]);

const currentSelectedStickerValue: Ref<StickerValue> = computed(() => {
  const stickerIndex = currentSelectedStickerIndex.value;
  return currentScrambledImage.value[stickerIndex[0]][stickerIndex[1]][
    stickerIndex[2]
  ];
});
const lastSelectedStickerValue = ref("");
const currentUfrColors: Ref<CornerColor> = ref("WGR");

const currentRotation = computed(() => {
  return getInitialRotation(currentUfrColors.value);
});

const currentScrambledImage = computed(() => {
  return getScrambledImage(currentRotation.value);
});

const isStickerSelected = ref(false);
const selectedSticker = ref("");

const stickerValuesPool = computed(() => {
  if (poolType.value === "edges") {
    return edges;
  } else {
    return corners;
  }
});

const bufferStickerValues = computed(() => {
  return stickerValuesPool.value[stickerValuesPool.value.length - 1];
});

const noBufferStickersPool = computed(() =>
  stickerValuesPool.value
    .flat()
    .filter((sticker) => !bufferStickerValues.value.includes(sticker))
    .sort()
);

function pickNewRandomSticker() {
  do {
    currentSelectedPiece.value =
      piecesPool.value[Math.floor(Math.random() * piecesPool.value.length)];

    currentSelectedStickerIndex.value =
      currentSelectedPiece.value[
        Math.floor(Math.random() * currentSelectedPiece.value.length)
      ];

    currentUfrColors.value = cornerColors.map((edgeColor) => edgeColor.ufr)[
      Math.floor(Math.random() * cornerColors.length)
    ];
  } while (
    lastSelectedStickerValue.value == currentSelectedStickerValue.value ||
    bufferStickerValues.value.includes(currentSelectedStickerValue.value)
  );

  lastSelectedStickerValue.value = currentSelectedStickerValue.value;
}

function chooseNextSticker() {
  if (isStickerSelected.value === true) {
    pickNewRandomSticker();
    isStickerSelected.value = false;
  }
}

function selectSticker(edge: string) {
  if (isStickerSelected.value === false) {
    isStickerSelected.value = true;
    selectedSticker.value = edge;
  }
}

export default {
  setPool,
  pickNewRandomSticker,
  chooseNextSticker,
  currentUfrColors,
  currentSelectedPiece,
  currentSelectedStickerIndex,
  isStickerSelected,
  selectedSticker,
  currentSelectedStickerValue,
  selectSticker,
  noBufferStickersPool,
};
