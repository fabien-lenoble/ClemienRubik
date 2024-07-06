<template>
  <table class="w-full text-left table-auto text-black">
    <thead class="sticky top-0 bg-tertiary text-xs">
      <tr>
        <th class="px-4 py-2">Key</th>
        <th class="px-4 py-2">Text</th>
        <th v-if="hasMaximumRecognitionTime" class="px-4 py-2">Time</th>
        <th class="px-4 py-2">Ratio (#)</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(result, index) in computedCornerMemoResults"
        :key="index"
        class="text-xs"
      >
        <td class="border px-4 py-2 bg-primary">{{ result.key }}</td>
        <td class="border px-4 py-2 bg-primary">{{ result.text }}</td>
        <td
          v-if="hasMaximumRecognitionTime"
          class="border px-4 py-2"
          :class="getAverageTimeColorClass(result.averageTime)"
        >
          {{ isNaN(result.averageTime) ? "-" : result.averageTime.toFixed(2) }}
        </td>
        <td
          class="border px-4 py-2"
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

const { computedCornerMemoResults } = useTraining();
const { hasMaximumRecognitionTime } = useSettings();

function getRatioColorClass(ratio: number, total: number) {
  if (total === 0) {
    return "bg-gray-300";
  }

  if (ratio < 50) {
    return "bg-red-300";
  }
  if (ratio < 70) {
    return "bg-red-200";
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
  if (averageTime > 2.5) {
    return "bg-red-200";
  }
  if (averageTime > 2) {
    return "bg-yellow-100";
  }
  return "bg-green-300";
}
</script>
