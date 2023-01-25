import type { Scramble } from "@/composables/scramble/types";
import type { DisplayTime, Time, State } from "@/composables/timer/types";
import type { Seed } from "@/composables/seed/types";

export type Solve = {
  scramble: Scramble;
  time: Time;
  displayTime: DisplayTime;
  seed: Seed;
  state: State;
};
