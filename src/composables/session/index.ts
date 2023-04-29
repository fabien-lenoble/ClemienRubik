import { computed, ref } from "vue";
import type { Ref } from "vue";
import type { Note, SavedSolve, Solve } from "./types";
import { useTimer } from "@/composables/timer";
import { useScramble } from "@/composables/scramble";
import type { State, Time } from "@/composables/timer/types";

const sessionSolves: Ref<SavedSolve[]> = ref(
  JSON.parse(localStorage.getItem("sessionSolves") || "[]") as SavedSolve[]
);

function setSessionSolves(solves: SavedSolve[]) {
  sessionSolves.value = solves;
  localStorage.setItem("sessionSolves", JSON.stringify(solves));
}

// solves that count when we will want to look for the personal bests (single, Ao5, Ao12, ...)
const countingSessionSolves = computed(() => {
  return sessionSolves.value.filter(
    (solve) => !["deleted", "rerolled"].includes(solve.state)
  );
});

// TODO: probably needed to send as a state or something like that for challenges in order to skip specific scrambles
// const skippedSolvesIndices = computed(() => {
//   return sessionSolves
//     .filter((solve) => ["deleted", "rerolled"].includes(solve.state))
//     .map((solve, index) => index);
// });

const getPersonalBest = computed(() => {
  const countingSessionSolvesCopy = [...countingSessionSolves.value];
  return countingSessionSolvesCopy.sort((solveA, solveB) => {
    return solveA.finalTime < solveB.finalTime ? -1 : 1;
  })[0];
});

function addSolveToSessionSolves(solve: Solve) {
  const { getTimerDisplayValue } = useTimer();
  const { stringifiedScramble } = useScramble();
  const savedSolve: SavedSolve = {
    ...solve,
    finalTime: solve.baseTime,
    displayScramble: stringifiedScramble(solve.scramble),
    displayTime: getTimerDisplayValue(solve.baseTime),
    state: "solved",
  };
  sessionSolves.value.push(savedSolve);
  localStorage.setItem("sessionSolves", JSON.stringify(sessionSolves.value));
}

function updateSolveState(index: number, newState: State) {
  const { getTimerDisplayValue } = useTimer();
  const newFinalTime = computeFinalTime(
    sessionSolves.value[index].baseTime,
    newState
  );
  sessionSolves.value[index].state = newState;
  sessionSolves.value[index].displayTime = getTimerDisplayValue(
    newFinalTime,
    newState
  );
  sessionSolves.value[index].finalTime = newFinalTime;
}

function updateSolveNote(index: number, newNote: Note) {
  sessionSolves.value[index].note = newNote;
}

function computeFinalTime(baseTime: Time, state: State): Time {
  switch (state) {
    case "solved":
      return baseTime;
    case "+2":
      return (baseTime += 200);
    case "DNF":
    case "deleted":
    case "rerolled":
      return +Infinity;
  }
}

const lastAo5 = computed(() => {
  return getLastAoN(5);
});

const lastAo12 = computed(() => {
  return getLastAoN(12);
});

const lastAo100 = computed(() => {
  return getLastAoN(100, false, false);
});

const mean = computed(() => {
  return getLastAoN(countingSessionSolves.value.length, false, false);
});

function getLastAoN(
  n: number,
  shouldCountDNF: boolean = true,
  shouldRemoveBestAndWorst: boolean = true
) {
  const { getTimerDisplayValue } = useTimer();

  if (n && countingSessionSolves.value.length >= n) {
    let solves = countingSessionSolves.value.slice(-n);

    if (shouldCountDNF) {
      if (solves.filter((solve) => solve.state === "DNF").length > 1) {
        return "DNF";
      }
    }

    if (shouldRemoveBestAndWorst) {
      solves = removeBestAndWorstSolves(solves);
    }

    const rawAverage = getAverage(solves);

    return getTimerDisplayValue(rawAverage);
  }
}

function getAverage(solves: SavedSolve[]) {
  return Math.floor(computeAverage(solves.map((solve) => solve.finalTime)));
}

function removeBestAndWorstSolves(solves: SavedSolve[]) {
  let orderedSolvesCopy = JSON.parse(JSON.stringify(solves));
  orderedSolvesCopy = (orderedSolvesCopy as SavedSolve[]).sort(
    (solveA, solveB) => {
      return solveA.finalTime > solveB.finalTime ? 1 : -1;
    }
  );
  return orderedSolvesCopy.slice(1, orderedSolvesCopy.length - 1);
}

function computeAverage(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function startNewSession() {
  setSessionSolves([]);
}

export function useSession() {
  return {
    sessionSolves,
    startNewSession,
    getPersonalBest,
    countingSessionSolves,
    addSolveToSessionSolves,
    updateSolveState,
    updateSolveNote,
    lastAo5,
    lastAo12,
    lastAo100,
    mean,
  };
}
