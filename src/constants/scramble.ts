import type { Move } from "@/composables/scramble/types";
import type {
  CenterPosition,
  CornerColor,
  CornerPosition,
  EdgePosition,
} from "@/composables/training/types";

const centerPositionIndexes: Record<CenterPosition, [number, number, number]> =
  {
    U: [0, 1, 1],
    L: [1, 1, 1],
    F: [2, 1, 1],
    R: [3, 1, 1],
    B: [4, 1, 1],
    D: [5, 1, 1],
  };

const edgePositionIndexes: Record<EdgePosition, [number, number, number]> = {
  UB: [0, 0, 1],
  UR: [0, 1, 2],
  UF: [0, 2, 1],
  UL: [0, 1, 0],

  LU: [1, 0, 1],
  LF: [1, 1, 2],
  LD: [1, 2, 1],
  LB: [1, 1, 0],

  FU: [2, 0, 1],
  FR: [2, 1, 2],
  FD: [2, 2, 1],
  FL: [2, 1, 0],

  RU: [3, 0, 1],
  RB: [3, 1, 2],
  RD: [3, 2, 1],
  RF: [3, 1, 0],

  BU: [4, 0, 1],
  BL: [4, 1, 2],
  BD: [4, 2, 1],
  BR: [4, 1, 0],

  DF: [5, 0, 1],
  DR: [5, 1, 2],
  DB: [5, 2, 1],
  DL: [5, 1, 0],
};

const cornerPositionIndexes: Record<CornerPosition, [number, number, number]> =
  {
    ULB: [0, 0, 0],
    UBR: [0, 0, 2],
    URF: [0, 2, 2],
    UFL: [0, 2, 0],

    LBU: [1, 0, 0],
    LUF: [1, 0, 2],
    LFD: [1, 2, 2],
    LDB: [1, 2, 0],

    FLU: [2, 0, 0],
    FUR: [2, 0, 2],
    FRD: [2, 2, 2],
    FDL: [2, 2, 0],

    RFU: [3, 0, 0],
    RUB: [3, 0, 2],
    RBD: [3, 2, 2],
    RDF: [3, 2, 0],

    BRU: [4, 0, 0],
    BUL: [4, 0, 2],
    BLD: [4, 2, 2],
    BDR: [4, 2, 0],

    DLF: [5, 0, 0],
    DFR: [5, 0, 2],
    DRB: [5, 2, 2],
    DBL: [5, 2, 0],
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
  centerPositionIndexes,
};
