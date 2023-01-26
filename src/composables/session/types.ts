import type { Scramble } from "@/composables/scramble/types";
import type { DisplayTime, Time, State } from "@/composables/timer/types";
import type { Seed } from "@/composables/seed/types";

export type Solve = {
  scramble: Scramble;
  time: Time;
  seed: Seed;
};

export type SavedSolve = Solve & {
  displayTime: DisplayTime;
  displayScramble: string;
  state: State;
  note?: Note;
};

export type Note = string;
