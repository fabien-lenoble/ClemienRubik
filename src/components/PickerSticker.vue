<template>
  <sticker
    :sticker="stickerLetter"
    :sticker-type="stickerType"
    class="w-8 h-8"
  ></sticker>
</template>

<script setup lang="ts">
import Sticker from "@/components/CubeImage2d/Sticker.vue";
import { useSettings } from "@/composables/settings";
import type {
  CenterPosition,
  CornerPosition,
  EdgePosition,
} from "@/composables/training/types";
import { computed } from "vue";
const { computedLetterScheme } = useSettings();
const props = defineProps<{
  stickerType: "edge" | "corner" | "center";
  stickerPosition: CornerPosition | EdgePosition | CenterPosition;
}>();

const stickerLetter = computed(
  () => computedLetterScheme.value[props.stickerPosition].letter
);
</script>
