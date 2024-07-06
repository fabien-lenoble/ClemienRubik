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

const hasMaximumRecognitionTime = computed(() => {
  return settings.value.blindfoldedTraining.maximumRecognitionTime > 0;
});

export function useSettings() {
  return {
    themes,
    setTheme,
    settings,
    setBlindfoldedMode,
    setTimerFormat,
    setBlindfoldedTraining,
    hasMaximumRecognitionTime,
  };
}
