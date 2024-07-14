<script setup lang="ts">
import type { StickerValue } from "@/composables/scramble/types";

defineProps<{
  sticker: StickerValue;
}>();
</script>

<template>
  <div
    :class="sticker"
    class="sticker border border-black text-black text-center content-center text-sm w-3 h-3"
  ></div>
</template>

<style lang="scss">
.sticker {
  &.A,
  &.B,
  &.C,
  &.D {
    background-color: #ffffff;
  }
  &.E,
  &.F,
  &.G,
  &.H {
    background-color: #ef0000;
  }
  &.Q,
  &.R,
  &.S,
  &.T {
    background-color: #00d900;
  }
  &.M,
  &.N,
  &.O,
  &.P {
    background-color: #ffa200;
  }
  &.I,
  &.J,
  &.K,
  &.L {
    background-color: #0000f2;
  }
  &.U,
  &.V,
  &.W,
  &.X {
    background-color: #fefe00;
  }
}
</style>
