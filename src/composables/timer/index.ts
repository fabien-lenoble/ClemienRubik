import { ref, computed } from "vue";
import type { Ref } from "vue";
import { useScramble } from "@/composables/scramble";
import { useSession } from "@/composables/session";
import { useSeed } from "@/composables/seed";
import type { DisplayTime, State, Time } from "./types";
import { useRouter } from "vue-router";

const { currentScramble, goToNextScramble, currentScrambleIndex } =
  useScramble();
const { currentScrambleSeed, baseSessionSeed } = useSeed();
const { addSolveToSessionSolves } = useSession();

const timerInterval: Ref<number> = ref(0);
const isTimerStarted: Ref<Boolean> = ref(false);
const isTimerOnHold: Ref<Boolean> = ref(false);
const timerValue: Ref<Time> = ref(0);
const timerStartedAt: Ref<Time> = ref(0);
const holdTimeBeforeStart: Ref<Time> = ref(30);
const holdTime = ref(0);
const holdTimeInterval = ref(0);

function updateTimerValue() {
  timerValue.value = Math.floor(performance.now() - timerStartedAt.value);
}

function startTimer() {
  timerStartedAt.value = performance.now();
  isTimerStarted.value = true;
  timerInterval.value = setInterval(updateTimerValue, 10);
}

function getTimerDisplayValue(
  timeInMilliseconds: Time,
  state?: State
): DisplayTime {
  if (state === "DNF") {
    return "DNF";
  }

  const minutes = Math.floor(timeInMilliseconds / 60000);
  const seconds = Math.floor(timeInMilliseconds / 1000) % 60;
  const milliseconds = timeInMilliseconds % 1000;
  // pad start with a 0 for the milliseconds so that it doesn't show 5.2s when it should show 5.002s for example
  let displayValue = `${seconds}.${String(milliseconds).padStart(3, "0")}`;
  if (minutes) {
    // pad start with a 0 for the seconds so that it doesn't show 1:5.002s when it should show 1:05.002s for example
    displayValue = `${minutes}:${displayValue.padStart(6, "0")}`;
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

export function useTimer() {
  // useRouter can only be used in setup so we have to export all of this in useTimer to be able to push routes
  const router = useRouter();

  function handleTimerTriggerHeld() {
    if (!isTimerStarted.value) {
      startHoldTime();
    } else {
      stopTimer();
    }
  }
  function stopTimer() {
    // stop updating timer value
    clearInterval(timerInterval.value);
    // update timer value one last time (in case we stopped the timer before a new 10ms window (yes we are that precise it's important))
    updateTimerValue();
    isTimerStarted.value = false;
    addSolveToSessionSolves({
      scramble: currentScramble.value,
      seed: currentScrambleSeed.value,
      baseTime: timerValue.value,
    });

    router.push(
      `/scramble/${baseSessionSeed.value}/${currentScrambleIndex.value + 1}`
    );
    goToNextScramble();
  }
  return {
    startTimer,
    stopTimer,
    getTimerDisplayValue,
    startHoldTime,
    stopHoldTime,
    handleTimerTriggerHeld,
    handleTimerTriggerReleased,
    isTimerStarted,
    isTimerOnHold,
    timerValue,
    holdTimeBeforeStart,
    holdTime,
    holdTimeInterval,
    isSpaceHeldLongEnough,
  };
}
