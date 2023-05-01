<script setup lang="ts">
import type { SavedSolve } from "@/composables/session/types";

const props = defineProps<{
  solve: SavedSolve;
  index: number;
  isSelected: boolean;
  isBest: boolean;
  isWorst: boolean;
  isInBestAoN: boolean;
}>();

const emit = defineEmits<{
  (e: "updateSelectedSolve", index: number): void;
}>();

function updateSelectedSolve() {
  emit("updateSelectedSolve", props.index);
}
</script>

<template>
  <div
    class="relative m-1 justify-center flex h-[32px] cursor-pointer items-center rounded-md border px-[12px] py-0 text-[13px] hover:!shadow-none"
    :class="{
      'bg-[#2870d423]': !isInBestAoN && !isSelected,
      'bg-[#2547c28f]': isSelected,
      'bg-[#2581c28f]': isInBestAoN && !isSelected,
    }"
    @click="updateSelectedSolve()"
  >
    {{ solve.displayTime }}
    <img
      v-if="isBest || isWorst"
      class="absolute w-[23%] right-1"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      :src="`/src/assets/${isWorst ? 'poop' : 'trophy'}.svg`"
    />
  </div>
</template>
