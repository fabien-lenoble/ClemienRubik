<template>
  <sticker
    :sticker-type="stickerType"
    :sticker-position="props.stickerPosition"
    class="w-8 h-8"
  ></sticker>
</template>

<script setup lang="ts">
import Sticker from "@/components/CubeImage2d/Sticker.vue";
import type { PiecePosition } from "@/composables/training/types";
const props = defineProps<{
  stickerType: "edge" | "corner" | "center";
  stickerPosition: PiecePosition;
}>();
</script>
