<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
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

const isBackgroundImageShown = computed(() => {
  return !isTimerStarted.value && useRoute().name === "scramble";
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
  <div
    class="app"
    :class="{
      [`timer-${timerClass}`]: true,
      'background-shown': isBackgroundImageShown,
    }"
  >
    <main class="container mx-auto h-full">
      <RouterView />
    </main>
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
  padding-bottom: 12px;
  &.timer-stopped {
    background-color: #faf4d3;
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

.background-shown {
  background-image: url("assets/background-image.png");
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: bottom 75% right 50%;
}
</style>
