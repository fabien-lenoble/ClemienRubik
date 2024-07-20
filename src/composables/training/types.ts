export type CornerMemoResult = {
  key: string;
  text: string;
  results?: Array<{
    result: "right" | "wrong";
    hintType: "key" | "value";
    time?: number;
  }>;
};

export type ComputedCornerMemoResult = CornerMemoResult & {
  averageTime: number;
  total: number;
  ratio: number;
  score: number;
};

export type Threshold = {
  ratioChecker(result: Omit<ComputedCornerMemoResult, "score">): boolean;
  timeChecker(result: Omit<ComputedCornerMemoResult, "score">): boolean;
  active: boolean;
  color: string;
};

export type PllCase = {
  name: string;
  algorithm: string;
};

export type CornerColor =
  | "WGR"
  | "WRB"
  | "WBO"
  | "WOG"
  | "GYR"
  | "GRW"
  | "GWO"
  | "GOY"
  | "YBR"
  | "YRG"
  | "YGO"
  | "YOB"
  | "BWR"
  | "BRY"
  | "BYO"
  | "BOW"
  | "OGW"
  | "OWB"
  | "OBY"
  | "OYG"
  | "RGY"
  | "RYB"
  | "RBW"
  | "RWG";

export type CenterPosition = "U" | "F" | "R" | "B" | "L" | "D";

export type CornerPosition =
  | "ULB"
  | "UBR"
  | "URF"
  | "UFL"
  | "FLU"
  | "FUR"
  | "FRD"
  | "FDL"
  | "RFU"
  | "RUB"
  | "RBD"
  | "RDF"
  | "BRU"
  | "BUL"
  | "BLD"
  | "BDR"
  | "LBU"
  | "LUF"
  | "LFD"
  | "LDB"
  | "DLF"
  | "DFR"
  | "DRB"
  | "DBL";

export type EdgePosition =
  | "UB"
  | "UR"
  | "UF"
  | "UL"
  | "FU"
  | "FR"
  | "FD"
  | "FL"
  | "RU"
  | "RB"
  | "RD"
  | "RF"
  | "BU"
  | "BL"
  | "BD"
  | "BR"
  | "LU"
  | "LF"
  | "LD"
  | "LB"
  | "DF"
  | "DR"
  | "DB"
  | "DL";

export type PiecePosition = CornerPosition | EdgePosition | CenterPosition;
