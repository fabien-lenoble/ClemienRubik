<template>
  <div class="grid grid-rows-3 grid-cols-8 gap-2 h-full">
    <div
      v-for="(sticker, index) in noBufferStickersPool"
      :key="index"
      @click="selectSticker(sticker)"
    >
      <div
        class="cursor-pointer text-center p-1 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        :class="{
          'border-green-500 bg-green-100 text-black':
            isStickerSelected && sticker === currentSelectedStickerValue,
          'border-red-500 bg-red-100 text-black':
            isStickerSelected &&
            sticker == selectedSticker &&
            sticker !== currentSelectedStickerValue,
          'border-gray-300 text-my-text-secondary': !isStickerSelected,
        }"
      >
        {{ sticker }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTraining } from "@/composables/training";

const {
  isStickerSelected,
  selectedSticker,
  currentSelectedStickerValue,
  selectSticker,
  noBufferStickersPool,
} = useTraining();
</script>
