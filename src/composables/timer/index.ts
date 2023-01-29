import { ref, computed } from "vue";
import type { Ref } from "vue";
import { useScramble } from "@/composables/scramble";
import { useSession } from "@/composables/session";
import { useSeed } from "@/composables/seed";
import type { DisplayTime, State, Time } from "./types";

const { currentScramble, goToNextScramble } = useScramble();
const { currentScrambleSeed } = useSeed();
const { addSolveToSessionSolves } = useSession();

const timerInterval: Ref<number> = ref(0);
const isTimerStarted: Ref<Boolean> = ref(false);
const isTimerOnHold: Ref<Boolean> = ref(false);
const timerValue: Ref<Time> = ref(0);
const holdTimeBeforeStart: Ref<Time> = ref(30);
const holdTime = ref(0);
const holdTimeInterval = ref(0);

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

  addSolveToSessionSolves({
    scramble: currentScramble.value,
    seed: currentScrambleSeed.value,
    baseTime: timerValue.value,
  });
  goToNextScramble();
}

function getTimerDisplayValue(
  timeInTenthOfSeconds: Time,
  state?: State
): DisplayTime {
  if (state === "DNF") {
    return "DNF";
  }

  const minutes = Math.floor(timeInTenthOfSeconds / 6000);
  const seconds = Math.floor(timeInTenthOfSeconds / 100) % 60;
  const tenthOfSeconds = timeInTenthOfSeconds % 100;
  // pad start with a 0 for the tenth of seconds so that it doesn't show 5.2s when it should show 5.02s for example
  let displayValue = `${seconds}.${String(tenthOfSeconds).padStart(2, "0")}`;
  if (minutes) {
    // pad start with a 0 for the seconds so that it doesn't show 1:5.02s when it should show 1:05.02s for example
    displayValue = `${minutes}:${displayValue.padStart(5, "0")}`;
  }

  if (state === "+2") {
    displayValue += " (+2)";
  }

  return displayValue;
}
function incrementHoldTime() {
  holdTime.value++;
}

function startHoldTime() {
  isTimerOnHold.value = true;
  holdTimeInterval.value = setInterval(incrementHoldTime, 10);
}

function stopHoldTime() {
  clearInterval(holdTimeInterval.value);
  isTimerOnHold.value = false;
  holdTime.value = 0;
}

const isSpaceHeldLongEnough = computed(() => {
  return holdTime.value > holdTimeBeforeStart.value;
});

export function useTimer() {
  return {
    startTimer,
    stopTimer,
    getTimerDisplayValue,
    startHoldTime,
    stopHoldTime,
    isTimerStarted,
    isTimerOnHold,
    timerValue,
    holdTimeBeforeStart,
    holdTime,
    holdTimeInterval,
    isSpaceHeldLongEnough,
  };
}
