<script setup lang="ts">
import { useScramble } from "@/composables/scramble";
import type { CubeFace } from "@/composables/scramble/types";
import Sticker from "./Sticker.vue";

const props = defineProps<{
  face: CubeFace;
  faceIndex: number;
  stickerClass?: string;
  revealedStickerValues?: [number, number, number];
  hintStickerValues?: [number, number, number];
}>();
const { getStickerTypeFromIndexes } = useScramble();

function shouldShowContent(lineIndex: number, stickerIndex: number): boolean {
  if (!props.revealedStickerValues) {
    return false;
  }

  return (
    props.faceIndex === props.revealedStickerValues[0] &&
    lineIndex === props.revealedStickerValues[1] &&
    stickerIndex === props.revealedStickerValues[2]
  );
}
function isHint(lineIndex: number, stickerIndex: number): boolean {
  if (!props.hintStickerValues) {
    return false;
  }

  return (
    props.faceIndex === props.hintStickerValues[0] &&
    lineIndex === props.hintStickerValues[1] &&
    stickerIndex === props.hintStickerValues[2]
  );
}
</script>

<template>
  <div class="m-px">
    <div v-for="(line, lineIndex) in face" :key="lineIndex" class="flex">
      <sticker
        v-for="(sticker, stickerIndex) in line"
        :key="stickerIndex"
        :sticker="sticker"
        :sticker-type="getStickerTypeFromIndexes(lineIndex, stickerIndex)"
        :class="stickerClass"
        :show-content="shouldShowContent(lineIndex, stickerIndex)"
        :is-hint="isHint(lineIndex, stickerIndex)"
      />
    </div>
  </div>
</template>
