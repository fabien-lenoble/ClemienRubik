<template>
  <div
    v-if="props.duration"
    class="w-full h-5 bg-gray-300 relative overflow-hidden rounded-lg"
  >
    <div
      :key="timeBarAnimationKey"
      class="absolute h-full w-full bg-green-500"
      :style="{
        animation: `squeeze ${props.duration}s linear forwards`,
        animationPlayState: timeBarPlayState,
      }"
      @animationstart="handleTimeBarAnimationStart"
      @animationend="handleTimeBarAnimationEnd(true)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useTraining } from "@/composables/training";

const props = defineProps<{
  duration: number;
}>();

const {
  timeBarPlayState,
  handleTimeBarAnimationStart,
  handleTimeBarAnimationEnd,
  timeBarAnimationKey,
} = useTraining();
</script>

<style>
@keyframes squeeze {
  0% {
    width: 100%;
    left: 0;
  }
  100% {
    width: 0;
    left: 50%;
  }
}
</style>
