<script setup lang="ts">
import type { FaceInitial } from "@/composables/scramble/types";

defineProps<{
  sticker: FaceInitial;
}>();
</script>

<template>
  <div
    :class="`sticker ${sticker}`"
    class="w-2 h-2 md:w-4 md:h-4 xl:w-6 xl:h-6 m-px"
  ></div>
</template>

<style lang="scss">
.sticker {
  &.U {
    background-color: rgb(225, 216, 216);
  }
  &.L {
    background-color: orange;
  }
  &.F {
    background-color: green;
  }
  &.R {
    background-color: red;
  }
  &.B {
    background-color: blue;
  }
  &.D {
    background-color: yellow;
  }
}
</style>
