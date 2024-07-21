<template>
  <div
    v-for="(centerPosition, index) in stickers"
    :key="centerPosition"
    class="border-2 rounded-md p-2"
    :class="{
      'opacity-100': index === selectedFaceIndex,
      'opacity-20': index !== selectedFaceIndex,
      'bg-green-500': isFaceValid(centerPosition),
      'bg-red-500': !isFaceValid(centerPosition),
    }"
  >
    <sticker
      :sticker-position="centerPosition"
      sticker-type="corner"
      @click="$emit('update:selectedFaceIndex', index)"
    />
  </div>
</template>

<script setup lang="ts">
import Sticker from "@/components/PickerSticker.vue";
import { useSettings } from "@/composables/settings";
import type { CenterPosition } from "@/composables/training/types";
const { computedLetterScheme } = useSettings();

defineProps<{
  selectedFaceIndex: number;
}>();

defineEmits(["update:selectedFaceIndex"]);

function isFaceValid(faceCenter: CenterPosition) {
  const letterScheme = computedLetterScheme.value;
  const faceStickers = Object.entries(letterScheme).filter(
    ([key]) => key[0] === faceCenter
  );
  return faceStickers.every(([_, value]) => !!value.letter);
}

const stickers: CenterPosition[] = ["U", "L", "F", "R", "B", "D"];
</script>
