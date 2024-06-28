import type { Ref } from "vue";
import { ref } from "vue";
import type { Settings, Theme } from "./types";

const themes: Theme[] = ["bi", "sexy", "nb"];

// Define default settings
const defaultSettings: Settings = {
  theme: "bi",
  blindfoldedMode: false,
  timerFormat: "3decimals",
};

// Retrieve stored settings and merge with default settings
const storedSettingsString = localStorage.getItem("settings");
const storedSettings = storedSettingsString
  ? (JSON.parse(storedSettingsString) as Partial<Settings>)
  : {};
const settings: Ref<Settings> = ref({
  ...defaultSettings,
  ...storedSettings,
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

export function useSettings() {
  return {
    themes,
    setTheme,
    settings,
    setBlindfoldedMode,
    setTimerFormat,
  };
}
