<script setup lang="ts">
import type { CubeFace } from "@/composables/scramble/types";
import Sticker from "./Sticker.vue";

defineProps<{
  face: CubeFace;
  faceIndex: number;
}>();
</script>

<template>
  <div v-for="(line, lineIndex) in face" :key="lineIndex" class="container">
    <sticker
      v-for="(sticker, stickerIndex) in line"
      :key="stickerIndex"
      :sticker="sticker"
    />
  </div>
</template>
