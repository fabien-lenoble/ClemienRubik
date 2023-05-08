import type { Scramble } from "@/composables/scramble/types";
import type { DisplayTime, Time, State } from "@/composables/timer/types";
import type { Seed } from "@/composables/seed/types";

export type Solve = {
  scramble: Scramble;
  baseTime: Time;
  seed: Seed;
};

export type SavedSolve = Solve & {
  finalTime: Time;
  displayTime: DisplayTime;
  displayScramble: string;
  state: State;
  index: number;
  note?: Note;
};

export type Note = string;
