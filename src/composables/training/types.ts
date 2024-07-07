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
};
