import { ref } from "vue";
import type { Ref } from "vue";

const timerValue: Ref<number> = ref(0);
const timerInterval: Ref<number> = ref(0);

const isTimerStarted: Ref<Boolean> = ref(false);

export function useTimer() {
  function incrementTimer() {
    timerValue.value++;
  }

  function startTimer() {
    timerValue.value = 0;
    isTimerStarted.value = true;
    timerInterval.value = setInterval(incrementTimer, 1);
  }

  function stopTimer() {
    isTimerStarted.value = false;
    clearInterval(timerInterval.value);
  }

  function timerDisplayValue() {
    // pour l'instant ça marche pas j'arrive pas à réfléchir
    const minutes = timerValue.value % 60000;
    const seconds = timerValue.value % 1000;
    const milliSeconds = timerValue.value - minutes * 60000 - seconds * 1000;
    let displayValue = `${seconds}.${String(milliSeconds).padStart(3, "0")}`;
    if (minutes) {
      displayValue = `${minutes}:${displayValue}`;
    }
    return displayValue;
  }

  return {
    isTimerStarted,
    startTimer,
    stopTimer,
    timerDisplayValue,
  };
}
