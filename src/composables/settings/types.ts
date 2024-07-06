export type Settings = {
  theme: Theme;
  blindfoldedMode: boolean;
  blindfoldedTraining: {
    mode: "key" | "value" | "alternate";
    maximumRecognitionTime: 0 | 3 | 5 | 7;
    resultsViewMode: "key" | "value";
    threeBldCornerPairs: Record<string, string>;
  };
  timerFormat: "none" | "rounded" | "1decimal" | "2decimals" | "3decimals";
};
export type Theme = "bi" | "sexy" | "nb";
