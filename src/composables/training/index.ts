import Use3bld from "./3bld";
import UsePllRecognition from "./pllRecognition";

export function useTraining() {
  return {
    ...Use3bld,
    ...UsePllRecognition,
  };
}
