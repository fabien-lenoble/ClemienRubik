<script setup lang="ts">
import { useTimer } from "@/composables/timer";
import { onMounted, onUnmounted } from "vue";

const {
  isTimerStarted,
  isTimerOnHold,
  timerValue,
  startTimer,
  stopTimer,
  getTimerDisplayValue,
  holdTimeBeforeStart,
  holdTime,
  startHoldTime,
  stopHoldTime,
  isSpaceHeldLongEnough,
} = useTimer();

function handleSpaceDown(event: KeyboardEvent) {
  if (event.repeat) {
    return;
  }
  if (event.code === "Space") {
    if (!isTimerStarted.value) {
      startHoldTime();
    } else {
      stopTimer();
    }
  }
}
function handleSpaceUp(event: KeyboardEvent) {
  if (event.code === "Space") {
    if (
      !isTimerStarted.value &&
      isTimerOnHold.value &&
      isSpaceHeldLongEnough.value
    ) {
      startTimer();
    }
    stopHoldTime();
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
  <div>
    <div>
      hold time (ms) <input type="number" v-model="holdTimeBeforeStart" />
      {{ holdTime }} vs {{ holdTimeBeforeStart }}
    </div>
    <div class="timer">{{ getTimerDisplayValue(timerValue) }}</div>
  </div>
</template>

<style lang="scss">
.timer {
  font-size: 120px;
}
</style>
