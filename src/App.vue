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

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
const vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
</script>

<template>
  <div class="app" :class="`timer-${timerClass}`">
    <RouterView />
  </div>
</template>

<style lang="scss">
body {
  height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}

body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  overflow: hidden;
}
.app {
  height: 100%;
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
