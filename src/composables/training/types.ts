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

export type CornerColors =
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
