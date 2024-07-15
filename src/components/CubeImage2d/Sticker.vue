<script setup lang="ts">
import type { StickerValue } from "@/composables/scramble/types";
import { computed } from "vue";

const props = defineProps<{
  sticker: StickerValue;
  stickerClass?: string;
  showContent?: boolean;
  isHint?: boolean;
}>();

const stickerContent = computed(() => {
  if (props.showContent) {
    return props.isHint ? "?" : props.sticker;
  }
  return "";
});
</script>

<template>
  <div
    :class="sticker + ' ' + stickerClass"
    class="sticker border border-black text-white text-center font-semibold content-center w-3 h-3"
  >
    {{ stickerContent }}
  </div>
</template>

<style lang="scss">
.sticker {
  &.A,
  &.B,
  &.C,
  &.D {
    color: black;
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
    color: black;
    background-color: #00d900;
  }
  &.M,
  &.N,
  &.O,
  &.P {
    color: black;
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
    color: black;
    background-color: #fefe00;
  }
  &.z {
    background-color: #222222;
  }
}
</style>
