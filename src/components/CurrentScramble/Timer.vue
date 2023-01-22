<script setup lang="ts">
import { useTimer } from "@/composables/timer";
import { computed } from "vue";

const { isTimerStarted, startTimer, stopTimer, timerDisplayValue } = useTimer();

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
    {{ timerDisplayValue() }}
  </div>
</template>
