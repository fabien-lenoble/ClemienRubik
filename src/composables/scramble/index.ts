import Scrambler from "./scrambler";
import Image from "./image";

export function useScramble() {
  return {
    ...Scrambler,
    ...Image,
  };
}
