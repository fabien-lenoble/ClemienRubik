<script setup lang="ts">
import type { StickerValue } from "@/composables/scramble/types";
import { useSettings } from "@/composables/settings";
import { computed } from "vue";
const { computedLetterScheme } = useSettings();

const props = defineProps<{
  sticker: StickerValue;
  stickerType: "edge" | "corner" | "center";
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

const color = computed(() => {
  const piece = Object.entries(computedLetterScheme.value).find(
    ([_, value]) =>
      value.letter === props.sticker && value.type === props.stickerType
  );

  switch (piece?.[0][0]) {
    case "U":
      return "white";
    case "F":
      return "green";
    case "L":
      return "orange";
    case "B":
      return "blue";
    case "D":
      return "yellow";
    case "R":
      return "red";
    default:
      return "grey";
  }
});

const computedClass = computed(() => {
  return (props.stickerClass ?? "") + color.value;
});
</script>

<template>
  <div
    :class="computedClass"
    class="sticker border border-black text-white text-center font-semibold content-center w-3 h-3"
  >
    {{ stickerContent }}
  </div>
</template>

<style lang="scss">
.sticker {
  &.white {
    color: black;
    background-color: #ffffff;
  }
  &.red {
    background-color: #ef0000;
  }
  &.green {
    color: black;
    background-color: #00d900;
  }
  &.orange {
    color: black;
    background-color: #ffa200;
  }
  &.blue {
    background-color: #0000f2;
  }
  &.yellow {
    color: black;
    background-color: #fefe00;
  }
  &.grey {
    background-color: #222222;
  }
}
</style>
