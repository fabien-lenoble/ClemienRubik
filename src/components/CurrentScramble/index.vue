<script setup lang="ts">
import { useTimer } from "@/composables/timer";
import CubeImage from "./CubeImage/index.vue";
import ScrambleInfo from "./ScrambleInfo.vue";
import Timer from "./Timer.vue";
const { isTimerStarted, handleTimerTriggerHeld, handleTimerTriggerReleased } =
  useTimer();
</script>

<template>
  <div class="flex flex-col gap-y-5 text-center py-5">
    <scramble-info v-if="!isTimerStarted" />
    <timer
      class="prevent-select w-screen flex-grow flex items-center place-content-center mx-auto"
      @touchstart="handleTimerTriggerHeld()"
      @touchend="handleTimerTriggerReleased()"
    />
    <cube-image v-if="!isTimerStarted" />
  </div>
</template>
