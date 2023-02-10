<script setup lang="ts">
import { useTimer } from "@/composables/timer";
import { onMounted, onUnmounted } from "vue";

const {
  timerValue,
  getTimerDisplayValue,
  handleTimerTriggerHeld,
  handleTimerTriggerReleased,
} = useTimer();

function handleSpaceDown(event: KeyboardEvent) {
  if (event.repeat) {
    return;
  }
  if (event.code === "Space") {
    handleTimerTriggerHeld();
  }
}
function handleSpaceUp(event: KeyboardEvent) {
  if (event.code === "Space") {
    handleTimerTriggerReleased();
  }
}
onMounted(() => {
  addEventListener("keydown", handleSpaceDown);
  addEventListener("keyup", handleSpaceUp);
});

onUnmounted(() => {
  removeEventListener("keydown", handleSpaceDown);
  removeEventListener("keyup", handleSpaceUp);
});
</script>

<template>
  <div class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-mono">
    {{ getTimerDisplayValue(timerValue) }}
  </div>
</template>
