export type Settings = {
  theme: Theme;
  blindfoldedMode: boolean;
  blindfoldedTraining: {
    mode: "pairs" | "texts" | "alternate";
  };
  timerFormat: "none" | "rounded" | "1decimal" | "2decimals" | "3decimals";
};
export type Theme = "bi" | "sexy" | "nb";
