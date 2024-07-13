<template>
  <div class="grid grid-rows-3 grid-cols-7 gap-2 h-full">
    <div
      v-for="(sticker, index) in computedStickers"
      :key="index"
      @click="handleClick(sticker)"
    >
      <div
        class="cursor-pointer text-center p-1 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        :class="{
          'border-green-500 bg-green-100 text-black':
            isStickerSelected && sticker === currentSticker,
          'border-red-500 bg-red-100 text-black':
            isStickerSelected &&
            sticker == selectedSticker &&
            sticker !== currentSticker,
          'border-gray-300 text-my-text-secondary': !isStickerSelected,
        }"
      >
        {{ sticker }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScramble } from "@/composables/scramble";

const { corners } = useScramble();
defineProps<{
  isStickerSelected: boolean;
  selectedSticker: string;
  currentSticker: string;
}>();

// get all corners except the buffer ones
const noBufferStickers = corners.slice(0, corners.length - 1);

const computedStickers = noBufferStickers.flat().sort();

const emit = defineEmits<{
  (e: "select-sticker", name: string): void;
}>();

function handleClick(sticker: string) {
  emit("select-sticker", sticker);
}
</script>
