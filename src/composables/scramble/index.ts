import Scrambler from "./scrambler";
import Image from "./image";
import Blind from "./blind";

export function useScramble() {
  return {
    ...Scrambler,
    ...Image,
    ...Blind,
  };
}
