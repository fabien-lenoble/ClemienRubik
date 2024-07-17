import type { StickerValue } from "@/composables/scramble/types";
import type {
  CenterPosition,
  CornerPosition,
  EdgePosition,
} from "@/composables/training/types";

export type Settings = {
  theme: Theme;
  blindfoldedMode: boolean;
  letterScheme: {
    corners: Record<CornerPosition, StickerValue>;
    edges: Record<EdgePosition, StickerValue>;
    centers: Record<CenterPosition, StickerValue>;
  };
  blindfoldedTraining: {
    mode: "key" | "value" | "alternate";
    maximumRecognitionTime: 0 | 3 | 5 | 7;
    resultsViewMode: "key" | "value";
    threeBldCornerPairs: Record<string, string>;
  };
  pllRecognition: {
    pllPool: string[];
  };
  timerFormat: "none" | "rounded" | "1decimal" | "2decimals" | "3decimals";
};
export type Theme = "bi" | "sexy" | "nb";
