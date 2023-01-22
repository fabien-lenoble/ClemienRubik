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
    timerInterval.value = setInterval(incrementTimer, 10);
  }

  function stopTimer() {
    isTimerStarted.value = false;
    clearInterval(timerInterval.value);
  }

  function timerDisplayValue() {
    const minutes = Math.floor(timerValue.value / 6000);
    const seconds = Math.floor(timerValue.value / 100) % 60;
    const tenthSeconds = timerValue.value % 100;
    // pad start with a 0 for the tenth of seconds so that it doesn't show 5.2s when it should show 5.02s for example
    let displayValue = `${seconds}.${String(tenthSeconds).padStart(2, "0")}`;
    if (minutes) {
      // pad start with a 0 for the seconds so that it doesn't show 1:5.02s when it should show 1:05.02s for example
      displayValue = `${minutes}:${displayValue.padStart(5, "0")}`;
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
