<script setup lang="ts">
import type { CubeFace } from "@/composables/scramble/types";
import Sticker from "./Sticker.vue";

defineProps<{
  face: CubeFace;
  faceIndex: number;
  stickerClass?: string;
}>();
</script>

<template>
  <div>
    <div v-for="(line, lineIndex) in face" :key="lineIndex" class="flex">
      <sticker
        v-for="(sticker, stickerIndex) in line"
        :key="stickerIndex"
        :sticker="sticker"
        :class="stickerClass"
      />
    </div>
  </div>
</template>
