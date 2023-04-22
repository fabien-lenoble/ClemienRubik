<script setup lang="ts">
import type { CubeFace } from "@/composables/scramble/types";
import Sticker from "./Sticker.vue";

defineProps<{
  face: CubeFace;
  faceIndex: number;
}>();
</script>

<template>
  <div class="border-black border lg:border-2 m-px lg:m-1">
    <div v-for="(line, lineIndex) in face" :key="lineIndex" class="flex">
      <sticker
        v-for="(sticker, stickerIndex) in line"
        :key="stickerIndex"
        :sticker="sticker"
      />
    </div>
  </div>
</template>
