<template>
  <div class="flex">
    <sticker is-big :sticker="getStickerValue(0)" />
    <sticker is-big :sticker="getStickerValue(1)" />
  </div>
  <sticker is-big :sticker="getStickerValue(2)" />
</template>

<script setup lang="ts">
import { useScramble } from "@/composables/scramble";
import type { StickerValue } from "@/composables/scramble/types";
import { computed, type Ref } from "vue";

import Sticker from "@/components/CubeImage/Sticker.vue";

const { corners } = useScramble();
const props = defineProps<{
  currentSticker: StickerValue;
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
