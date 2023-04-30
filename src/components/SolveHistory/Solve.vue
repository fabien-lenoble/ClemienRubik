<script setup lang="ts">
import type { SavedSolve } from "@/composables/session/types";
import { Chip, Ripple, initTE } from "tw-elements";
initTE({ Chip, Ripple });

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
    data-te-chip-init
    data-te-ripple-init
    class="m-1 justify-center flex h-[32px] cursor-pointer items-center rounded-md border border-[#3b71ca] px-[12px] py-0 text-[13px] text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-[#3b71ca] hover:!shadow-none dark:text-neutral-200"
    :class="{
      'border-[blue]': isSelected,
      'bg-[#0ea0eeaf]': isSelected,
      'bg-[#e52e2e66]': isWorst && !isSelected,
      'bg-[#12bc1292]': isBest && !isSelected,
      'bg-[#eceff1]': isInBestAoN && !isWorst && !isBest && !isSelected,
    }"
    data-te-ripple-color="dark"
    @click="updateSelectedSolve()"
  >
    {{ solve.displayTime }}
  </div>
</template>
