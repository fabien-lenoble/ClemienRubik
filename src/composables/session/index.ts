import { computed, reactive } from "vue";
import type { Note, SavedSolve, Solve } from "./types";
import { useTimer } from "@/composables/timer";
import { useScramble } from "@/composables/scramble";
import type { State, Time } from "../timer/types";

const { getTimerDisplayValue } = useTimer();
const { stringifiedScramble } = useScramble();

export function useSession() {
  // TODO: still need some work to get this to be properly reactive.
  // For example "getPersonalBest" computed is not reactive when we push a new solve
  // with a better time.
  const sessionSolves: SavedSolve[] = reactive(
    JSON.parse(localStorage.getItem("sessionSolves") || "[]") as SavedSolve[]
  );

  // solves that count when we will want to look for the personal bests (single, Ao5, Ao12, ...)
  const countingSessionSolves = computed(() => {
    return sessionSolves.filter(
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
    sessionSolves.push(savedSolve);
    localStorage.setItem("sessionSolves", JSON.stringify(sessionSolves));
  }

  function updateSolveState(index: number, newState: State) {
    const newFinalTime = computeFinalTime(
      sessionSolves[index].baseTime,
      newState
    );
    sessionSolves[index].state = newState;
    sessionSolves[index].displayTime = getTimerDisplayValue(
      newFinalTime,
      newState
    );
    sessionSolves[index].finalTime = newFinalTime;
  }

  function updateSolveNote(index: number, newNote: Note) {
    sessionSolves[index].note = newNote;
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

  return {
    sessionSolves,
    getPersonalBest,
    countingSessionSolves,
    addSolveToSessionSolves,
    updateSolveState,
    updateSolveNote,
  };
}
