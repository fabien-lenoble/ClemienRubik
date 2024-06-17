import { ref } from "vue";
import type { Ref } from "vue";
import type { Theme, Settings } from "./types";

const themes: Theme[] = ["bi", "sexy", "nb"];

const settings: Ref<Settings> = ref(
  JSON.parse(localStorage.getItem("settings") || '{ "theme": "bi" }')
);

function setTheme(theme: Settings["theme"]) {
  settings.value["theme"] = theme;
  localStorage.setItem("settings", JSON.stringify(settings.value));
}

function setBlindfoldedMode(blindfoldedMode: Settings["blindfoldedMode"]) {
  settings.value["blindfoldedMode"] = blindfoldedMode;
  localStorage.setItem("settings", JSON.stringify(settings.value));
}

export function useSettings() {
  return {
    themes,
    setTheme,
    settings,
    setBlindfoldedMode,
  };
}
