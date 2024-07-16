import type { Move } from "@/composables/scramble/types";
import type {
  CornerColor,
  CornerPosition,
  EdgePosition,
} from "@/composables/training/types";

const edgePositionIndexes: Record<
  EdgePosition | "z",
  [number, number, number]
> = {
  UB: [0, 1, 0],
  UR: [0, 0, 1],
  UF: [0, 1, 2],
  UL: [0, 2, 1],

  FU: [3, 0, 1],
  FR: [3, 1, 2],
  FD: [3, 2, 1],
  FL: [3, 1, 0],

  RU: [4, 0, 1],
  RB: [4, 1, 2],
  RD: [4, 2, 1],
  RF: [4, 1, 0],

  BU: [1, 0, 1],
  BL: [1, 1, 2],
  BD: [1, 2, 1],
  BR: [1, 1, 0],

  LU: [2, 0, 1],
  LF: [2, 1, 2],
  LD: [2, 2, 1],
  LB: [2, 1, 0],

  DF: [5, 1, 2],
  DR: [5, 2, 1],
  DB: [5, 1, 0],
  DL: [5, 0, 1],

  z: [6, 6, 6],
};

const cornerPositionIndexes: Record<
  CornerPosition | "z",
  [number, number, number]
> = {
  ULB: [0, 1, 0],
  UBR: [0, 0, 1],
  URF: [0, 1, 2],
  UFL: [0, 2, 1],

  FLU: [3, 0, 1],
  FUR: [3, 1, 2],
  FRD: [3, 2, 1],
  FDL: [3, 1, 0],

  RFU: [4, 0, 1],
  RUB: [4, 1, 2],
  RBD: [4, 2, 1],
  RDF: [4, 1, 0],

  BRU: [1, 0, 1],
  BUL: [1, 1, 2],
  BLD: [1, 2, 1],
  BDR: [1, 1, 0],

  LBU: [2, 0, 1],
  LUF: [2, 1, 2],
  LFD: [2, 2, 1],
  LDB: [2, 1, 0],

  DLF: [5, 1, 2],
  DFR: [5, 2, 1],
  DRB: [5, 1, 0],
  DBL: [5, 0, 1],

  z: [6, 6, 6],
};
const clockWiseUTurns = ["", "U", "U2", "U'"];
const antiClockWiseUTurns = ["", "U'", "U2", "U"];
const clockWiseYTurns = ["", "y", "y2", "y'"];
const antiClockWiseYTurns = ["", "y'", "y2", "y"];

const cornerColors: Array<{ ufr: CornerColor; rotation: Move[] }> = [
  {
    ufr: "WGR",
    rotation: [],
  },
  {
    ufr: "WRB",
    rotation: ["y"],
  },
  {
    ufr: "WBO",
    rotation: ["y2"],
  },
  {
    ufr: "WOG",
    rotation: ["y'"],
  },
  {
    ufr: "GYR",
    rotation: ["x"],
  },
  {
    ufr: "GRW",
    rotation: ["x", "y"],
  },
  {
    ufr: "GWO",
    rotation: ["x", "y2"],
  },
  {
    ufr: "GOY",
    rotation: ["x", "y'"],
  },
  {
    ufr: "YBR",
    rotation: ["x2"],
  },
  {
    ufr: "YRG",
    rotation: ["x2", "y"],
  },
  {
    ufr: "YGO",
    rotation: ["x2", "y2"],
  },
  {
    ufr: "YOB",
    rotation: ["x2", "y'"],
  },
  {
    ufr: "BWR",
    rotation: ["x'"],
  },
  {
    ufr: "BRY",
    rotation: ["x'", "y"],
  },
  {
    ufr: "BYO",
    rotation: ["x'", "y2"],
  },
  {
    ufr: "BOW",
    rotation: ["x'", "y'"],
  },
  {
    ufr: "OGW",
    rotation: ["z"],
  },
  {
    ufr: "OWB",
    rotation: ["z", "y"],
  },
  {
    ufr: "OBY",
    rotation: ["z", "y2"],
  },
  {
    ufr: "OYG",
    rotation: ["z", "y'"],
  },
  {
    ufr: "RGY",
    rotation: ["z'"],
  },
  {
    ufr: "RYB",
    rotation: ["z'", "y"],
  },
  {
    ufr: "RBW",
    rotation: ["z'", "y2"],
  },
  {
    ufr: "RWG",
    rotation: ["z'", "y'"],
  },
];

export default {
  antiClockWiseUTurns,
  antiClockWiseYTurns,
  clockWiseUTurns,
  clockWiseYTurns,
  cornerColors,
  cornerPositionIndexes,
  edgePositionIndexes,
};
