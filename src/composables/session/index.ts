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
const validSessionSolves = computed(() => {
  return validSolves(sessionSolves.value);
});

function validSolves(solves: SavedSolve[]) {
  return solves.filter(
    (solve) => !["deleted", "rerolled"].includes(solve.state)
  );
}

// TODO: probably needed to send as a state or something like that for challenges in order to skip specific scrambles
// const skippedSolvesIndices = computed(() => {
//   return sessionSolves
//     .filter((solve) => ["deleted", "rerolled"].includes(solve.state))
//     .map((solve, index) => index);
// });

const getPersonalBest = computed(() => {
  const validSessionSolvesCopy = [...validSessionSolves.value];
  return validSessionSolvesCopy.sort((solveA, solveB) => {
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
    index: sessionSolves.value.length,
  };
  sessionSolves.value.push(savedSolve);
  localStorage.setItem("sessionSolves", JSON.stringify(sessionSolves.value));
}

function updateSolveState(index: number, newState: State) {
  if (
    newState === "deleted" &&
    !confirm("Are you sure you want to delete this solve?")
  ) {
    return;
  }

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
  localStorage.setItem("sessionSolves", JSON.stringify(sessionSolves.value));
}

function updateSolveNote(index: number, newNote: Note) {
  sessionSolves.value[index].note = newNote;
}

function computeFinalTime(baseTime: Time, state: State): Time {
  switch (state) {
    case "solved":
      return baseTime;
    case "+2":
      return (baseTime += 2000);
    case "DNF":
    case "deleted":
    case "rerolled":
      return Number.MAX_VALUE;
  }
}

const lastAo5 = computed(() => {
  return getAoN(validSessionSolves.value, 5);
});

const lastAo12 = computed(() => {
  return getAoN(validSessionSolves.value, 12);
});

const lastAo100 = computed(() => {
  return getAoN(validSessionSolves.value, 100, false);
});

const mean = computed(() => {
  return getAoN(
    validSessionSolves.value,
    validSessionSolves.value.length,
    false,
    true
  );
});

function getAoN(
  solves: SavedSolve[],
  n: number,
  shouldRemoveBestAndWorst: boolean = true,
  shouldRemoveDNF: boolean = false,
  fromIndex: number = solves.length - n
) {
  const { getTimerDisplayValue } = useTimer();

  solves = validSolves(solves);

  // check that there are at least n solves
  if (n && fromIndex >= 0 && solves.length - fromIndex >= n) {
    solves = solves.slice(fromIndex, fromIndex + n);

    if (shouldRemoveDNF) {
      solves = solves.filter((solve) => solve.state !== "DNF");
    } else {
      // if more than one DNF in the solves, then return DNF as the average
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

function bestAoNIndex(n: number, shouldRemoveBestAndWorst: boolean = true) {
  let bestIndex = 0;
  let bestAoN: string | undefined = "Infinity";
  let currentAoN: string | undefined = "Infinity";
  for (
    let currentIndex = 0;
    currentIndex < validSessionSolves.value.length;
    currentIndex++
  ) {
    currentAoN = getAoN(
      validSessionSolves.value,
      n,
      shouldRemoveBestAndWorst,
      false,
      currentIndex
    );

    if (
      currentAoN &&
      currentAoN !== "DNF" &&
      Number(currentAoN) < Number(bestAoN)
    ) {
      bestIndex = currentIndex;
      bestAoN = currentAoN;
    }
  }

  return bestIndex;
}

function getAverage(solves: SavedSolve[]) {
  return Math.floor(computeAverage(solves.map((solve) => solve.finalTime)));
}

function removeBestAndWorstSolves(solves: SavedSolve[]) {
  let orderedSolvesCopy = JSON.parse(JSON.stringify(solves));
  orderedSolvesCopy = (orderedSolvesCopy as SavedSolve[]).sort(
    (solveA, solveB) => {
      if (solveB.state === "DNF") return -1;
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
    validSessionSolves,
    addSolveToSessionSolves,
    updateSolveState,
    updateSolveNote,
    getAoN,
    lastAo5,
    lastAo12,
    lastAo100,
    bestAoNIndex,
    mean,
  };
}
