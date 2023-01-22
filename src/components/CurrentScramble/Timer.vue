<script setup lang="ts">
import { useTimer } from "@/composables/timer";
import { computed } from "vue";

const {
  isTimerStarted,
  timerValue,
  startTimer,
  stopTimer,
  getTimerDisplayValue,
} = useTimer();

function handleTimer() {
  if (isTimerStarted.value) {
    stopTimer();
  } else {
    startTimer();
  }
}

const buttonText = computed(() =>
  isTimerStarted.value ? "stop timer" : "start timer"
);
</script>

<template>
  <div>
    <button @click="handleTimer()">{{ buttonText }}</button>
    {{ getTimerDisplayValue(timerValue) }}
  </div>
</template>
