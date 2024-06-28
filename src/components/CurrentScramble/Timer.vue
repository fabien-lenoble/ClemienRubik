<script setup lang="ts">
import { useSettings } from "@/composables/settings";
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

const { settings } = useSettings();

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
    class="prevent-select text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-mono"
    @touchstart="handleTimerTriggerHeld()"
    @touchend="handleTimerTriggerReleased()"
  >
    <p class="text-outline text-primary">
      {{
        getTimerDisplayValue(
          timerValue,
          isTimerStarted ? settings.timerFormat : "3decimals"
        )
      }}
    </p>
  </div>
</template>

<style lang="scss">
.text-outline {
  text-shadow: -1px -1px 0 rgb(var(--color-my-text-primary)),
    1px -1px 0 rgb(var(--color-my-text-primary)),
    -1px 1px 0 rgb(var(--color-my-text-primary)),
    1px 1px 0 rgb(var(--color-my-text-primary));
}
</style>
