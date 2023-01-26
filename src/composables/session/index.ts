import { computed, reactive } from "vue";
import type { Note, SavedSolve, Solve } from "./types";
import { useTimer } from "@/composables/timer";
import { useScramble } from "@/composables/scramble";
import type { State } from "../timer/types";

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
      // TODO: add checks on +2 and DNF, since we don't overwrite the time in these states
      return solveA.time < solveB.time ? -1 : 1;
    })[0];
  });

  function addSolveToSessionSolves(solve: Solve) {
    const savedSolve: SavedSolve = {
      ...solve,
      displayScramble: stringifiedScramble(solve.scramble),
      displayTime: getTimerDisplayValue(solve.time),
      state: "solved",
    };
    sessionSolves.push(savedSolve);
    localStorage.setItem("sessionSolves", JSON.stringify(sessionSolves));
  }

  // updating a state should not overwrite time, at least in the DNF case we want
  // to have a way to go back to original time. Or maybe we want to have an "originalTime" value for that.
  // we will need a computed time with state taken into account to calculate PB and averages properly
  function updateSolveState(index: number, newState: State) {
    const previousTime = sessionSolves[index].time;
    sessionSolves[index].state = newState;
    sessionSolves[index].displayTime = getTimerDisplayValue(
      previousTime,
      newState
    );
  }
  function updateSolveNote(index: number, newNote: Note) {
    sessionSolves[index].note = newNote;
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
