<script setup lang="ts">
import type { FaceInitial } from "@/composables/scramble/types";

defineProps<{
  sticker: FaceInitial;
}>();
</script>

<template>
  <div
    :class="`sticker ${sticker}`"
    class="w-4 h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 m-px"
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
