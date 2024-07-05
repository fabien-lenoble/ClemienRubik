<template>
  <div class="flex flex-col h-full">
    <div class="h-screen overflow-auto">
      <table class="w-full text-left table-auto text-black">
        <thead class="sticky top-0 bg-tertiary text-sm">
          <tr>
            <th class="px-4 py-2">Key</th>
            <th class="px-4 py-2">Text</th>
            <th v-if="hasMaximumRecognitionTime" class="px-4 py-2">Avg time</th>
            <th class="px-4 py-2">Ratio (#)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(result, index) in computedCornerMemoResults"
            :key="index"
            class="text-sm"
          >
            <td class="border px-4 py-2 bg-primary">{{ result.key }}</td>
            <td class="border px-4 py-2 bg-primary">{{ result.text }}</td>
            <td
              v-if="hasMaximumRecognitionTime"
              class="border px-4 py-2"
              :class="getAverageTimeColorClass(result.averageTime)"
            >
              {{
                isNaN(result.averageTime) ? "-" : result.averageTime.toFixed(2)
              }}
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
    </div>
    <div class="shrink pt-4 pb-2 align text-end">
      <button
        @click="resetCornerMemoResults"
        class="w-1/4 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
      >
        reset all
      </button>
    </div>
    <div class="shrink pb-12">
      <button
        @click="goBack"
        class="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import { useTraining } from "@/composables/training";
import { useRouter } from "vue-router";

const { computedCornerMemoResults, resetCornerMemoResults } = useTraining();
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

const router = useRouter();
function goBack() {
  router.go(-1);
}
</script>
