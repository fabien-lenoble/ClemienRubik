import type { StickerValue } from "@/composables/scramble/types";
import type { PiecePosition } from "@/composables/training/types";
import constants from "@/constants";
import type { Ref } from "vue";
import { computed, ref } from "vue";
import type { Settings, Theme } from "./types";
const {
  defaultSettings,
  cornerPositionIndexes,
  edgePositionIndexes,
  centerPositionIndexes,
} = constants;

const themes: Theme[] = ["bi", "sexy", "nb"];

// Retrieve stored settings and merge with default settings
const storedSettingsString = localStorage.getItem("settings");
const storedSettings = storedSettingsString
  ? (JSON.parse(storedSettingsString) as Partial<Settings>)
  : {};
const settings: Ref<Settings> = ref({
  ...defaultSettings,
  ...storedSettings,
  blindfoldedTraining: {
    ...defaultSettings.blindfoldedTraining,
    ...storedSettings.blindfoldedTraining,
    letterScheme: {
      corners: {
        ...defaultSettings.blindfolded?.letterScheme.corners,
        ...storedSettings.blindfolded?.letterScheme.corners,
      },
      edges: {
        ...defaultSettings.blindfolded?.letterScheme.edges,
        ...storedSettings.blindfolded?.letterScheme.edges,
      },
      centers: {
        ...defaultSettings.blindfolded?.letterScheme.centers,
        ...storedSettings.blindfolded?.letterScheme.centers,
      },
    },
  },
  blindfolded: {
    ...defaultSettings.blindfolded,
    ...storedSettings.blindfolded,
  },
  pllRecognition: {
    ...defaultSettings.pllRecognition,
    ...storedSettings.pllRecognition,
  },
});

function saveSettings() {
  localStorage.setItem("settings", JSON.stringify(settings.value));
}

function setTheme(theme: Settings["theme"]) {
  settings.value.theme = theme;
  saveSettings();
}

function setBlindfoldedMode(blindfoldedMode: Settings["blindfoldedMode"]) {
  settings.value.blindfoldedMode = blindfoldedMode;
  saveSettings();
}

function setTimerFormat(timerFormat: Settings["timerFormat"]) {
  settings.value.timerFormat = timerFormat;
  saveSettings();
}

function setBlindfoldedTraining(
  blindfoldedTraining: Partial<Settings["blindfoldedTraining"]>
) {
  // in case the mode is changed to "key" or "value", update the resultsViewMode as well
  if (
    blindfoldedTraining.mode === "key" ||
    blindfoldedTraining.mode === "value"
  ) {
    blindfoldedTraining.resultsViewMode = blindfoldedTraining.mode;
  }

  settings.value.blindfoldedTraining = {
    ...settings.value.blindfoldedTraining,
    ...blindfoldedTraining,
  };
  saveSettings();
}

function setLetterScheme(
  letterScheme: Settings["blindfolded"]["letterScheme"]
) {
  settings.value.blindfolded.letterScheme = letterScheme;
  if (!isLetterSchemeValid(letterScheme)) {
    console.log("Invalid letter scheme");
    return;
  } else {
    saveSettings();
  }
}

function isLetterSchemeValid(
  letterScheme: Settings["blindfolded"]["letterScheme"]
) {
  const values = Object.values({
    ...letterScheme.corners,
    ...letterScheme.edges,
    ...letterScheme.centers,
  });
  return values.every((value) => !!value);
}

function setPllRecognition(
  pllRecognition: Partial<Settings["pllRecognition"]>
) {
  settings.value.pllRecognition = {
    ...settings.value.pllRecognition,
    ...pllRecognition,
  };
  saveSettings();
}

const hasMaximumRecognitionTime = computed(() => {
  return settings.value.blindfoldedTraining.maximumRecognitionTime > 0;
});

function import3bldCornerPairs() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".csv";

  fileInput.onchange = (event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (
        !confirm(
          "This will overwrite your current 3BLD corner pairs. Continue?"
        )
      ) {
        return;
      }
      const text = e.target?.result;

      if (!text || typeof text !== "string") {
        console.error("Invalid file content");
        return;
      }
      try {
        const csv = text?.split("\r\n").map((line) => line.split(","));
        const obj = Object.fromEntries(csv);
        setBlindfoldedTraining({ threeBldCornerPairs: obj });
      } catch (error) {
        console.error("Error parsing CSV file", error);
        return;
      }

      // Here, you can process the CSV content as needed
    };
    reader.onerror = (e) => console.error("Error reading file", e);
    reader.readAsText(file);
    document.body.removeChild(fileInput);
  };

  fileInput.click();
}

const computedLetterScheme = computed(() => {
  const letterScheme = {
    ...settings.value.blindfolded.letterScheme.corners,
    ...settings.value.blindfolded.letterScheme.edges,
    ...settings.value.blindfolded.letterScheme.centers,
  } as Record<PiecePosition, StickerValue>;
  const piecesPositionIndexes = {
    ...cornerPositionIndexes,
    ...edgePositionIndexes,
    ...centerPositionIndexes,
  };
  return (
    Object.entries(letterScheme) as [PiecePosition, StickerValue][]
  ).reduce((acc, [key, value]) => {
    let type: "center" | "corner" | "edge" = "center";
    if (key in cornerPositionIndexes) {
      type = "corner";
    } else if (key in edgePositionIndexes) {
      type = "edge";
    }
    acc[key] = {
      letter: value,
      positionIndexes: piecesPositionIndexes[key],
      type,
    };
    return acc;
  }, {} as Record<PiecePosition, { letter: StickerValue; positionIndexes: [number, number, number]; type: "center" | "corner" | "edge" }>);
});

export function useSettings() {
  return {
    themes,
    setTheme,
    settings,
    setBlindfoldedMode,
    setTimerFormat,
    setBlindfoldedTraining,
    setLetterScheme,
    hasMaximumRecognitionTime,
    import3bldCornerPairs,
    setPllRecognition,
    computedLetterScheme,
    isLetterSchemeValid,
  };
}
