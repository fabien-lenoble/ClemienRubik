<template>
  <table class="w-full text-left table-auto text-black">
    <thead class="sticky top-0 bg-tertiary text-xs">
      <tr>
        <th class="px-2 py-2 text-center">Pair</th>
        <th class="px-2 py-2 text-center">Text</th>
        <th v-if="hasMaximumRecognitionTime" class="px-2 py-2 text-center">
          Time
        </th>
        <th class="px-2 py-2 text-center">Ratio (#)</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(result, index) in displayedCornerResults"
        :key="index"
        :id="getElementId(result.key, index)"
        class="text-xs"
      >
        <td class="border px-2 py-2 bg-primary text-center">
          {{ result.key }}
        </td>
        <td class="border px-2 py-2 bg-primary">{{ result.text }}</td>
        <td
          v-if="hasMaximumRecognitionTime"
          class="border px-2 py-2"
          :class="getAverageTimeColorClass(result.averageTime)"
        >
          {{ isNaN(result.averageTime) ? "-" : result.averageTime.toFixed(2) }}
        </td>
        <td
          class="border px-2 py-2"
          :class="getRatioColorClass(result.ratio, result.total)"
        >
          {{ result.ratio.toFixed(0) }}% ({{ result.total }})
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import { useTraining } from "@/composables/training";
import { watch } from "vue";

const { displayedCornerResults } = useTraining();
const { hasMaximumRecognitionTime } = useSettings();

const props = defineProps<{
  clickedLetter: string;
}>();

function getElementId(key: string, index: number) {
  // sets id as the first letter of the key if it is the first occurrence
  if (
    (
      displayedCornerResults.value.map((result) => result.key).sort() as any
    ).findLastIndex((_key: string) => key[0] === _key[0]) === index
  ) {
    return key[0];
  }
}

watch(
  () => props.clickedLetter,
  (newLetter) => {
    if (newLetter) {
      const element = document.getElementById(newLetter);
      if (element) {
        element.scrollIntoView({ block: "end" });
      }
    }
  }
);

// TODO: update to use thresholds from UseTraining
function getRatioColorClass(ratio: number, total: number) {
  if (total === 0) {
    return "bg-gray-300";
  }

  if (ratio < 50) {
    return "bg-red-300";
  }
  if (ratio < 80) {
    return "bg-yellow-100";
  }
  return "bg-green-300";
}

function getAverageTimeColorClass(averageTime: number) {
  if (isNaN(averageTime)) {
    return "bg-gray-300";
  }
  if (averageTime > 3) {
    return "bg-red-300";
  }
  if (averageTime > 2) {
    return "bg-yellow-100";
  }
  return "bg-green-300";
}
</script>
