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
  <div class="timer w-fit m-auto">
    {{ getTimerDisplayValue(timerValue) }}
  </div>
</template>

<style lang="scss">
.timer {
  font-size: 120px;
}
</style>
