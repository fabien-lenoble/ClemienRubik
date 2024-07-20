<template>
  <div class="flex flex-wrap gap-2 justify-center">
    <div
      v-for="(preset, index) in presets"
      :key="index"
      class="flex border rounded-md"
      @click="$emit('selectPreset', preset)"
    >
      <div class="w-6 text-center" v-for="letter in preset" :key="letter">
        {{ letter }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StickerValue } from "@/composables/scramble/types";

defineEmits<{
  (e: "selectPreset", preset: StickerValue[]): void;
}>();

const presets: StickerValue[][] = [
  ["A", "B", "C", "D"],
  ["E", "F", "G", "H"],
  ["I", "J", "K", "L"],
  ["M", "N", "O", "P"],
  ["Q", "R", "S", "T"],
  ["U", "V", "W", "X"],
];

function test(preset: StickerValue[]) {
  console.log(preset);
}
</script>
