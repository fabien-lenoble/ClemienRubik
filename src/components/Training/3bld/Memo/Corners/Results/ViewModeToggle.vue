<template>
  <div
    class="flex flex-row gap-2 w-full border-2 rounded-md px-2"
    @click="toggleResultsViewModeOptions"
  >
    <div class="flex basis-1/3 justify-center m-auto">
      {{
        settings.blindfoldedTraining.resultsViewMode === "key" ? "pair" : "??"
      }}
    </div>
    <div class="flex basis-1/3 justify-center m-auto">
      <i class="fa-solid fa-arrow-right-arrow-left"></i>
    </div>
    <div class="flex basis-1/3 justify-center m-auto">
      {{
        settings.blindfoldedTraining.resultsViewMode === "value" ? "text" : "??"
      }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettings } from "@/composables/settings";

const { settings, setBlindfoldedTraining } = useSettings();

function toggleResultsViewModeOptions() {
  const currentResultsViewMode =
    settings.value.blindfoldedTraining.resultsViewMode;
  setBlindfoldedTraining({
    resultsViewMode: currentResultsViewMode === "key" ? "value" : "key",
  });
}
</script>
