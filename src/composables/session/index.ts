import { ref } from "vue";
import type { Ref } from "vue";
import type { Solve } from "./types";
const sessionSolves: Ref<Solve[]> = ref([]);

export function useSession() {
  function getPersonalBest() {
    return (
      sessionSolves.value
        // filter rerolled scrambles and deleted solves
        .filter((solve) => !["rerolled", "deleted"].includes(solve.state))
        .sort((solveA, solveB) => {
          return solveA.time < solveB.time ? -1 : 1;
        })[0]
    );
  }

  function addSolveToSessionSolves(solve: Solve) {
    // TODO: how to handle +2 state? Should we create the solve object here? (probably)
    sessionSolves.value.push(solve);
  }

  return {
    getPersonalBest,
    addSolveToSessionSolves,
  };
}
