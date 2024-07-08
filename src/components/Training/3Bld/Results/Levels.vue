<template>
  <div class="flex flex-row h-full gap-1 text-xs">
    <div
      v-for="(threshold, key) in thresholds"
      :key="key"
      class="flex flex-col basis-1/4 justify-center h-full rounded-md items-center text-black py-1"
      :class="getElementClass(threshold)"
      @click="updateLevels(key)"
    >
      <div class="basis-full content-center">{{ getTimeText(key) }}</div>
      <div class="basis-full" v-if="getRatioText(key)">
        {{ getRatioText(key) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTraining } from "@/composables/training";
import type { Threshold } from "@/composables/training/types";

const { thresholds, thresholdLevels, updateLevels } = useTraining();

function getElementClass(threshold: Threshold) {
  return {
    [`bg-${threshold.color}`]: true,
    "opacity-30": !threshold.active,
  };
}

function getTimeText(key: string) {
  switch (key) {
    case "unknown":
      return "-";
    case "bad":
      return `> ${thresholdLevels.time[0]}s`;
    case "medium":
      return `≤ ${thresholdLevels.time[0]}s`;
    case "good":
      return `≤ ${thresholdLevels.time[1]}s`;
  }
}

function getRatioText(key: string) {
  switch (key) {
    case "unknown":
      return "";
    case "bad":
      return `< ${thresholdLevels.ratio[0]}%`;
    case "medium":
      return `≥ ${thresholdLevels.ratio[0]}%`;
    case "good":
      return `≥ ${thresholdLevels.ratio[1]}%`;
  }
}
</script>
