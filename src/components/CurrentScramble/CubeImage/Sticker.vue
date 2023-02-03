<script setup lang="ts">
import type { FaceInitial } from "@/composables/scramble/types";

defineProps<{
  sticker: FaceInitial;
}>();
</script>

<template>
  <div :class="`sticker ${sticker}`"></div>
</template>

<style lang="scss">
.sticker {
  height: 32px;
  width: 32px;
  margin: 4px;
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
