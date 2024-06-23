<script setup lang="ts">
import NavigationBar from "@/components/NavigationBar/index.vue";
import { useSettings } from "@/composables/settings";
import { useTimer } from "@/composables/timer";
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
const { settings } = useSettings();
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
  <div class="app" :data-theme="settings.theme" :class="`timer-${timerClass}`">
    <main
      class="h-full text-my-text-primary"
      :class="{
        'background-shown': isBackgroundImageShown,
        'px-5 py-5 container': !isTimerStarted,
      }"
    >
      <div class="flex flex-col h-full">
        <RouterView />
        <navigation-bar v-show="!isTimerStarted" />
      </div>
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
}

.background-shown {
  background-image: url("assets/background-image.png");
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: bottom 75% right 50%;
}
</style>
