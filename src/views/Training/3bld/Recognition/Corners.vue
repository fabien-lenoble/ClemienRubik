<template>
  <div class="flex flex-col h-full">
    <div class="grow self-center content-center">
      <cube-image-3d
        :sticker-size="50"
        :ufr-colors="currentUfrColors"
        class="w-[250px] min-h-[250px] m-auto"
        :revealed-sticker-colors="currentSelectedCorner"
        :revealed-sticker-values="currentSelectedStickerIndex"
        :hint-sticker-values="currentSelectedStickerIndex"
      />
    </div>
    <div>
      <answer-picker
        :is-sticker-selected="isStickerSelected"
        :selected-sticker="selectedSticker"
        :current-sticker="currentSelectedStickerValue"
        @select-sticker="selectSticker($event)"
      />
    </div>
    <div class="flex flex-wrap justify-center items-center pt-4 pb-12">
      <button
        @click="chooseNextSticker"
        :disabled="!isStickerSelected"
        class="w-full px-6 py-2 font-semibold rounded-lg shadow border-2 transition-colors duration-300"
        :class="{
          'border-green-500 bg-green-100': isStickerSelected,
          'text-my-text-secondary': !isStickerSelected,
          'text-black': isStickerSelected,
        }"
      >
        next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from "vue";

import CubeImage3d from "@/components/CubeImage3d.vue";
import AnswerPicker from "@/components/Training/3bld/Recognition/Corners/AnswerPicker.vue";
import { useScramble } from "@/composables/scramble";
import type { StickerValue } from "@/composables/scramble/types";
import { cornerColors } from "@/composables/training/constants";
import type { CornerColors } from "@/composables/training/types";

const { corners, getInitialRotation, getScrambledImage } = useScramble();

const cornerPool: [number, number, number][][] = [
  // [
  //   // ULF
  //   [0, 2, 0],
  //   [1, 0, 2],
  //   [2, 0, 0],
  // ],
  [
    // UFR
    [0, 2, 2],
    [2, 0, 2],
    [3, 0, 0],
  ],
  // [
  //   // FDR
  //   [2, 2, 2],
  //   [3, 2, 0],
  //   [5, 0, 2],
  // ],
  // [
  //   // URB
  //   [0, 0, 2],
  //   [3, 0, 2],
  //   [4, 0, 0],
  // ],
];
const currentSelectedCorner = ref(cornerPool[0]);
const currentSelectedStickerIndex = ref(cornerPool[0][0]);

const currentSelectedStickerValue: Ref<StickerValue> = computed(() => {
  const stickerIndex = currentSelectedStickerIndex.value;
  return currentScrambledImage.value[stickerIndex[0]][stickerIndex[1]][
    stickerIndex[2]
  ];
});
const lastSelectedStickerValue = ref("");
const currentUfrColors: Ref<CornerColors> = ref("WGR");

const currentRotation = computed(() => {
  return getInitialRotation(currentUfrColors.value);
});

const currentScrambledImage = computed(() => {
  return getScrambledImage(currentRotation.value);
});

const isStickerSelected = ref(false);
const selectedSticker = ref("");

// get all corners except the buffer ones
const bufferStickerValues = corners[7].flat();

function pickNewRandomSticker() {
  do {
    currentSelectedCorner.value =
      cornerPool[Math.floor(Math.random() * cornerPool.length)];

    currentSelectedStickerIndex.value =
      currentSelectedCorner.value[Math.floor(Math.random() * 3)];

    currentUfrColors.value = cornerColors.map((cornerColor) => cornerColor.ufr)[
      Math.floor(Math.random() * cornerColors.length)
    ];
  } while (
    lastSelectedStickerValue.value == currentSelectedStickerValue.value ||
    bufferStickerValues.includes(currentSelectedStickerValue.value)
  );

  lastSelectedStickerValue.value = currentSelectedStickerValue.value;
}

function chooseNextSticker() {
  if (isStickerSelected.value === true) {
    pickNewRandomSticker();
    isStickerSelected.value = false;
  }
}

function selectSticker(corner: string) {
  if (isStickerSelected.value === false) {
    isStickerSelected.value = true;
    selectedSticker.value = corner;
  }
}

onMounted(() => {
  pickNewRandomSticker();
});
</script>
