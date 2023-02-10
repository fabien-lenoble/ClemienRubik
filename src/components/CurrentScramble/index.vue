<script setup lang="ts">
import { useTimer } from "@/composables/timer";
import CubeImage from "./CubeImage/index.vue";
import BestAverages from "./BestAverages/index.vue";
import ScrambleInfo from "./ScrambleInfo.vue";
import Timer from "./Timer.vue";
const { isTimerStarted, handleTimerTriggerHeld, handleTimerTriggerReleased } =
  useTimer();
</script>

<template>
  <div class="flex flex-col gap-y-5 text-center py-2 md:py-5">
    <scramble-info v-if="!isTimerStarted" />
    <timer
      class="prevent-select w-screen flex-grow flex items-center place-content-center mx-auto"
      @touchstart="handleTimerTriggerHeld()"
      @touchend="handleTimerTriggerReleased()"
    />
    <div class="flex gap-x-3 px-2 md:px-5" v-if="!isTimerStarted">
      <cube-image />
      <div class="border border-black rounded-md flex-grow">
        <best-averages />
      </div>
    </div>
  </div>
</template>
