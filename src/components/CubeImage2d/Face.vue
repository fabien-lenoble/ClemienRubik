<script setup lang="ts">
import { useScramble } from "@/composables/scramble";
import type { CubeFace } from "@/composables/scramble/types";
import Sticker from "./Sticker.vue";

const props = defineProps<{
  face: CubeFace;
  faceIndex: number;
  stickerClass?: string;
  revealedStickersValues?: [number, number, number][];
  hintStickersValues?: [number, number, number][];
}>();
const { getStickerTypeFromIndexes } = useScramble();

function shouldShowContent(lineIndex: number, stickerIndex: number): boolean {
  if (!props.revealedStickersValues) {
    return false;
  }

  return props.revealedStickersValues.some(
    (revealedStickerValue) =>
      props.faceIndex === revealedStickerValue[0] &&
      lineIndex === revealedStickerValue[1] &&
      stickerIndex === revealedStickerValue[2]
  );
}
function isHint(lineIndex: number, stickerIndex: number): boolean {
  if (!props.hintStickersValues) {
    return false;
  }

  return props.hintStickersValues.some(
    (hintStickerValue) =>
      props.faceIndex === hintStickerValue[0] &&
      lineIndex === hintStickerValue[1] &&
      stickerIndex === hintStickerValue[2]
  );
}
</script>

<template>
  <div class="m-px">
    <div v-for="(line, lineIndex) in face" :key="lineIndex" class="flex">
      <sticker
        v-for="(sticker, stickerIndex) in line"
        :key="stickerIndex"
        :sticker-position="sticker"
        :sticker-type="getStickerTypeFromIndexes(lineIndex, stickerIndex)"
        :class="stickerClass"
        :show-content="shouldShowContent(lineIndex, stickerIndex)"
        :is-hint="isHint(lineIndex, stickerIndex)"
      />
    </div>
  </div>
</template>
