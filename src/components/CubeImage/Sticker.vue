<script setup lang="ts">
import type { StickerValue } from "@/composables/scramble/types";

const props = defineProps<{
  sticker: StickerValue;
  isBig?: boolean;
}>();

const widthClass = props.isBig
  ? "w-9 h-9"
  : "w-3 h-3 md:w-4 md:h-4 xl:w-6 xl:h-6";
</script>

<template>
  <div
    :class="`${sticker} ${widthClass}`"
    class="sticker border border-black text-black"
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
    background-color: #b71234;
  }
  &.Q,
  &.R,
  &.S,
  &.T {
    background-color: #009b48;
  }
  &.M,
  &.N,
  &.O,
  &.P {
    background-color: #ff5800;
  }
  &.I,
  &.J,
  &.K,
  &.L {
    background-color: #0046ad;
  }
  &.U,
  &.V,
  &.W,
  &.X {
    background-color: #ffd500;
  }
}
</style>
