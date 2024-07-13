<template>
  <div class="flex flex-col h-full">
    <div class="grow self-center content-center">
      <corner-image :current-sticker="currentSticker" :class="rotationClass" />
    </div>
    <div>
      <answer-picker
        :is-sticker-selected="isStickerSelected"
        :selected-sticker="selectedSticker"
        :current-sticker="currentSticker"
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
import { onMounted, ref, computed, type Ref } from "vue";

import AnswerPicker from "@/components/Training/3bld/Recognition/Corners/AnswerPicker.vue";
import CornerImage from "@/components/Training/3bld/Recognition/Corners/CornerImage.vue";
import { useScramble } from "@/composables/scramble";
import type { StickerValue } from "@/composables/scramble/types";

const { corners } = useScramble();
const isStickerSelected = ref(false);
const selectedSticker = ref("");
const currentSticker: Ref<StickerValue> = ref("B");
const currentRotation = ref(0);
const lastSticker = ref("");

// get all corners except the buffer ones
const noBufferStickers = corners.slice(0, corners.length - 1);
const computedStickers = noBufferStickers.flat().sort();

function pickNewRandomSticker() {
  do {
    currentSticker.value =
      computedStickers[Math.floor(Math.random() * computedStickers.length)];
  } while (lastSticker.value === currentSticker.value);

  currentRotation.value = Math.floor(Math.random() * 4);
  lastSticker.value = currentSticker.value;
}

const rotationClasses = ["rotate-0", "rotate-90", "rotate-180", "-rotate-90"];
const rotationClass = computed(() => {
  return rotationClasses[currentRotation.value];
});

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
