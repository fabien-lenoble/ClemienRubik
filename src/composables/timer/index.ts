import { useScramble } from "@/composables/scramble";
import { useSeed } from "@/composables/seed";
import { useSession } from "@/composables/session";
import type { Settings } from "@/composables/settings/types";
import type { Ref } from "vue";
import { computed, ref } from "vue";
import type { DisplayTime, State, Time } from "./types";

const { currentScramble, goToNextScramble } = useScramble();
const { currentScrambleSeed, baseSessionSeed } = useSeed();
const { addSolveToSessionSolves } = useSession();

const timerInterval: Ref<ReturnType<typeof setInterval>> = ref(
  setTimeout(() => {})
);
const holdTimeInterval: Ref<ReturnType<typeof setInterval>> = ref(
  setTimeout(() => {})
);
const isTimerStarted: Ref<Boolean> = ref(false);
const isTimerOnHold: Ref<Boolean> = ref(false);
const timerValue: Ref<Time> = ref(0);
const timerStartedAt: Ref<Time> = ref(0);
const holdTimeBeforeStart: Ref<Time> = ref(30);
const holdTime = ref(0);
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
  format: Settings["timerFormat"] = "3decimals",
  state?: State
): DisplayTime {
  if (format === "none") {
    return "-";
  }

  if (state === "DNF") {
    return "DNF";
  }

  const minutes = Math.floor(timeInMilliseconds / 60000);
  const seconds = (timeInMilliseconds % 60000) / 1000;

  let decimalPlaces = 3;
  switch (format) {
    case "rounded":
      decimalPlaces = 0;
      break;
    case "1decimal":
      decimalPlaces = 1;
      break;
    case "2decimals":
      decimalPlaces = 2;
      break;
    case "3decimals":
      decimalPlaces = 3;
      break;
  }

  const formattedSeconds = seconds.toFixed(decimalPlaces);

  if (minutes < 1) {
    // For values less than 60 seconds, show with specified decimal places
    return formattedSeconds;
  } else {
    // For values 60 seconds or more, convert to minutes and seconds
    // Pad the seconds part with a '0' if it's less than 10
    const paddedSeconds =
      seconds < 10 ? "0" + formattedSeconds : formattedSeconds;
    return `${minutes}:${paddedSeconds}`;
  }
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

function stopTimer() {
  // stop updating timer value
  clearInterval(timerInterval.value);
  // update timer value one last time (in case we stopped the timer before a new 10ms window (yes we are that precise it's important))
  updateTimerValue();
  isTimerStarted.value = false;
  addSolveToSessionSolves({
    scramble: currentScramble.value,
    baseSeed: baseSessionSeed.value,
    seed: currentScrambleSeed.value,
    baseTime: timerValue.value,
  });

  goToNextScramble();
}

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
