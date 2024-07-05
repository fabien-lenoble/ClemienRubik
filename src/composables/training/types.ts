export type CornerMemoResult = {
  key: string;
  text: string;
  results?: Array<{
    result: "right" | "wrong";
    time?: number;
  }>;
};
