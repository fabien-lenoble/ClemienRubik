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
    class="relative justify-center flex h-[32px] rounded-md cursor-pointer items-center px-[2px] py-0 text-[13px] border"
    :class="{
      'bg-quinary bg-opacity-100 text-my-text-secondary border-my-text-secondary':
        !isInBestAoN,
      'bg-senary bg-opacity-75 text-my-text-primary border-my-text-primary':
        isInBestAoN,
      'rounded-corners-gradient-borders': isSelected,
    }"
    @click="updateSelectedSolve()"
  >
    {{ solve.displayTime }}
    <img
      v-if="isBest"
      class="absolute w-[23%] right-1"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      src="../../assets/trophy.svg"
    />
    <img
      v-else-if="isWorst"
      class="absolute w-[23%] right-1"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      src="../../assets/poop.svg"
    />
  </div>
</template>

<style lang="scss">
.rounded-corners-gradient-borders {
  background-size: 100% 0px;
  background-position: 0 0, 0 100%;
  background-repeat: no-repeat;
  animation: gradient 0.7s linear infinite;
  background-image: linear-gradient(0deg, #d6026f, #0038a8),
    linear-gradient(0deg, #d6026f, #0038a8);
}
@keyframes gradient {
  0% {
    border-left: 2px solid #d6026f;
    border-right: 2px solid #0038a8;
    border-top: 2px solid #d6026f;
    border-bottom: 2px solid #0038a8;
  }
  25% {
    border-left: 2px solid #0038a8;
    border-right: 2px solid #d6026f;
    border-top: 2px solid #d6026f;
    border-bottom: 2px solid #0038a8;
  }
  50% {
    border-left: 2px solid #0038a8;
    border-right: 2px solid #d6026f;
    border-top: 2px solid #0038a8;
    border-bottom: 2px solid #d6026f;
  }
  75% {
    border-left: 2px solid #d6026f;
    border-right: 2px solid #0038a8;
    border-top: 2px solid #0038a8;
    border-bottom: 2px solid #d6026f;
  }
  100% {
    border-left: 2px solid #d6026f;
    border-right: 2px solid #0038a8;
    border-top: 2px solid #d6026f;
    border-bottom: 2px solid #0038a8;
  }
}
</style>
