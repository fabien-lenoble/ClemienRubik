<script setup lang="ts">
import { useTimer } from "@/composables/timer";
import CubeImage from "./CubeImage/index.vue";
import ScrambleInfo from "./ScrambleInfo.vue";
import Timer from "./Timer.vue";
const { isTimerStarted } = useTimer();
</script>

<template>
  <div class="grid content-around">
    <scramble-info v-if="!isTimerStarted" />
    <timer />
    <cube-image v-if="!isTimerStarted" />
  </div>
</template>
