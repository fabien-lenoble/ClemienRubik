import { ref } from "vue";
import type { Ref } from "vue";
import type { Theme } from "./types";

const themes: Theme[] = ["bi", "sexy", "nb"];

const appTheme: Ref<Theme> = ref(
  (localStorage.getItem("theme") || "bi") as Theme
);

function setTheme(theme: Theme) {
  appTheme.value = theme;
  localStorage.setItem("theme", theme);
}

export function useSettings() {
  return {
    appTheme,
    themes,
    setTheme,
  };
}
