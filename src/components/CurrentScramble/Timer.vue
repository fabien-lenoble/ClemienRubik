<script setup lang="ts">
import { useTimer } from "@/composables/timer";
import { onMounted, onUnmounted } from "vue";
const {
  isTimerStarted,
  startHoldTime,
  stopHoldTime,
  startTimer,
  stopTimer,
  isSpaceHeldLongEnough,
  isTimerOnHold,
  getTimerDisplayValue,
  timerValue,
} = useTimer();

const emit = defineEmits<{
  (e: "updateRouteScrambleIndex"): void;
}>();

function handleTimerTriggerHeld() {
  if (!isTimerStarted.value) {
    startHoldTime();
  } else {
    stopTimer();
    emit("updateRouteScrambleIndex");
  }
}

function handleTimerTriggerReleased() {
  if (
    !isTimerStarted.value &&
    isTimerOnHold.value &&
    isSpaceHeldLongEnough.value
  ) {
    startTimer();
  }
  stopHoldTime();
}

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
  <div
    class="prevent-select flex-grow flex items-center place-content-center text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-mono"
    @touchstart="handleTimerTriggerHeld()"
    @touchend="handleTimerTriggerReleased()"
  >
    <p class="text-outline">
      {{ getTimerDisplayValue(timerValue) }}
    </p>
  </div>
</template>

<style lang="scss">
.text-outline {
  text-shadow: -2px -2px 0 #004643, 2px -2px 0 #004643, -2px 2px 0 #004643,
    2px 2px 0 #004643;
  color: white;
}
</style>
