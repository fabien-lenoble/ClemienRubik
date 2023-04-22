<script setup lang="ts">
import type { FaceInitial } from "@/composables/scramble/types";

defineProps<{
  sticker: FaceInitial;
}>();
</script>

<template>
  <div
    :class="sticker"
    class="sticker w-2 h-2 md:w-4 md:h-4 xl:w-6 xl:h-6 border"
  ></div>
</template>

<style lang="scss">
.sticker {
  &.U {
    background-color: #ffffff;
  }
  &.L {
    background-color: #ff5800;
  }
  &.F {
    background-color: #009b48;
  }
  &.R {
    background-color: #b71234;
  }
  &.B {
    background-color: #0046ad;
  }
  &.D {
    background-color: #ffd500;
  }
}
</style>
