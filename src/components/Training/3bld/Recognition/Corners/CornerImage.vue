<template>
  <div>
    <div class="flex">
      <sticker :sticker="getStickerValue(0)" :class="getClass()" />
      <sticker :sticker="getStickerValue(1)" :class="getClass()" />
    </div>
    <sticker :sticker="getStickerValue(2)" :class="getClass()" />
  </div>
</template>

<script setup lang="ts">
import { useScramble } from "@/composables/scramble";
import type { StickerValue } from "@/composables/scramble/types";
import { computed, type Ref } from "vue";

import Sticker from "@/components/CubeImage/Sticker.vue";

function getClass() {
  return `w-[${props.size}px] h-[${props.size}px]`;
}

const { corners } = useScramble();
const props = defineProps<{
  currentSticker: StickerValue;
  size: number;
}>();
// get all corners except the buffer ones
const noBufferCorners = corners.slice(0, corners.length - 1);
const corner: Ref<StickerValue[]> = computed(() => {
  return noBufferCorners.find((corner) =>
    corner.includes(props.currentSticker)
  ) as StickerValue[];
});

const stickerIndex = computed(() => {
  return corner.value?.indexOf(props.currentSticker);
});

function getStickerValue(index: number): StickerValue {
  return corner.value[(index + stickerIndex.value) % 3];
}
</script>
