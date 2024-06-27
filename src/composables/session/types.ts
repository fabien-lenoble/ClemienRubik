import type { Scramble } from "@/composables/scramble/types";
import type { Seed } from "@/composables/seed/types";
import type { DisplayTime, State, Time } from "@/composables/timer/types";

export type Solve = {
  scramble: Scramble;
  baseTime: Time;
  baseSeed: Seed;
  seed: Seed;
};

export type SavedSolve = Solve & {
  finalTime: Time;
  displayTime: DisplayTime;
  displayScramble: string;
  state: State;
  scrambleIndex: number;
  note?: Note;
};

export type Note = string;
