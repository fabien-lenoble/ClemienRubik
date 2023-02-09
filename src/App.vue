<script setup lang="ts">
import { computed } from "vue";
import { RouterView } from "vue-router";
import { useTimer } from "@/composables/timer";
const { isTimerStarted, isTimerOnHold, isSpaceHeldLongEnough } = useTimer();

const timerClass = computed(() => {
  if (isTimerStarted.value) {
    return "started";
  } else {
    if (isTimerOnHold.value) {
      if (isSpaceHeldLongEnough.value) {
        return "ready";
      } else {
        return "held";
      }
    } else {
      return "stopped";
    }
  }
});
</script>

<template>
  <div class="app" :class="`timer-${timerClass}`">
    <RouterView />
  </div>
</template>

<style lang="scss">
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}
.app {
  height: 100vh;
  &.timer-stopped {
    background-color: #e0e2db50;
  }
  &.timer-held {
    background-color: #ee353572;
  }
  &.timer-ready {
    background-color: #b5d42875;
  }
  &.timer-started {
    background-color: #4897345c;
  }
}
</style>
