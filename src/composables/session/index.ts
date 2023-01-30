import { computed, ref } from "vue";
import type { Ref } from "vue";
import type { Note, SavedSolve, Solve } from "./types";
import { useTimer } from "@/composables/timer";
import { useScramble } from "@/composables/scramble";
import type { State, Time } from "@/composables/timer/types";

const { getTimerDisplayValue } = useTimer();
const { stringifiedScramble } = useScramble();

const sessionSolves: Ref<SavedSolve[]> = ref(
  JSON.parse(localStorage.getItem("sessionSolves") || "[]") as SavedSolve[]
);

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
  return countingSessionSolves.value.sort((solveA, solveB) => {
    return solveA.finalTime < solveB.finalTime ? -1 : 1;
  })[0];
});

function addSolveToSessionSolves(solve: Solve) {
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

export function useSession() {
  return {
    sessionSolves,
    getPersonalBest,
    countingSessionSolves,
    addSolveToSessionSolves,
    updateSolveState,
    updateSolveNote,
  };
}
