import {
  pllCases,
  threeBldCornerPairs,
} from "@/composables/training/constants";
import type { Ref } from "vue";
import { computed, ref } from "vue";
import type { Settings, Theme } from "./types";

const themes: Theme[] = ["bi", "sexy", "nb"];

// Define default settings
const defaultSettings: Settings = {
  theme: "bi",
  blindfoldedMode: false,
  timerFormat: "3decimals",
  blindfoldedTraining: {
    mode: "alternate",
    maximumRecognitionTime: 5,
    resultsViewMode: "key",
    threeBldCornerPairs,
  },
  pllRecognition: {
    selectablePlls: pllCases.map((pll) => pll.name),
  },
};

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
  },
});

function setTheme(theme: Settings["theme"]) {
  settings.value["theme"] = theme;
  localStorage.setItem("settings", JSON.stringify(settings.value));
}

function setBlindfoldedMode(blindfoldedMode: Settings["blindfoldedMode"]) {
  settings.value["blindfoldedMode"] = blindfoldedMode;
  localStorage.setItem("settings", JSON.stringify(settings.value));
}

function setTimerFormat(timerFormat: Settings["timerFormat"]) {
  settings.value["timerFormat"] = timerFormat;
  localStorage.setItem("settings", JSON.stringify(settings.value));
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

  settings.value["blindfoldedTraining"] = {
    ...settings.value["blindfoldedTraining"],
    ...blindfoldedTraining,
  };
  localStorage.setItem("settings", JSON.stringify(settings.value));
}

function setPllRecognition(
  pllRecognition: Partial<Settings["pllRecognition"]>
) {
  settings.value["pllRecognition"] = {
    ...settings.value["pllRecognition"],
    ...pllRecognition,
  };
  localStorage.setItem("settings", JSON.stringify(settings.value));
}

const hasMaximumRecognitionTime = computed(() => {
  return settings.value.blindfoldedTraining.maximumRecognitionTime > 0;
});

function import3BldCornerPairs() {
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
      const text = e.target?.result;
      console.log("File content:", text);

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

export function useSettings() {
  return {
    themes,
    setTheme,
    settings,
    setBlindfoldedMode,
    setTimerFormat,
    setBlindfoldedTraining,
    hasMaximumRecognitionTime,
    import3BldCornerPairs,
    setPllRecognition,
  };
}
