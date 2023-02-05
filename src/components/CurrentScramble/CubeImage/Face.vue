<script setup lang="ts">
import type { FaceInitial } from "@/composables/scramble/types";
import Sticker from "./Sticker.vue";

defineProps<{
  face: FaceInitial[][];
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
