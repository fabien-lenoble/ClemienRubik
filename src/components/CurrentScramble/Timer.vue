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

<style lang="scss">
.container {
  display: flex;
  justify-content: space-around;
}
.columns {
  flex-direction: column;
}
.column {
  flex: 50%;
}
</style>
