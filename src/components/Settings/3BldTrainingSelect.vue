<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import type { Settings } from "@/composables/settings/types";

const { settings, setBlindfoldedTraining } = useSettings();

const modeOptions: Array<[Settings["blindfoldedTraining"]["mode"], string]> = [
  ["key", "pairs only"],
  ["value", "texts only"],
  ["alternate", "alternate pairs and texts"],
];

const maximumRecognitionTimeOptions: Array<
  [Settings["blindfoldedTraining"]["maximumRecognitionTime"], string]
> = [
  [0, "no timer"],
  [3, "3s"],
  [5, "5s"],
  [7, "7s"],
];
</script>

<template>
  <div class="flex flex-col gap-y-2 mt-auto">
    <div class="flex items-center gap-2">
      <select
        v-model="settings.blindfoldedTraining.mode"
        @change="
          setBlindfoldedTraining({ mode: settings.blindfoldedTraining.mode })
        "
        class="bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
      >
        <option
          v-for="(option, key) in modeOptions"
          :key="key"
          :value="option[0]"
          class="text-gray-900 bg-white"
        >
          {{ option[1] }}
        </option>
      </select>
      <select
        v-model="settings.blindfoldedTraining.maximumRecognitionTime"
        @change="
          setBlindfoldedTraining({
            maximumRecognitionTime:
              settings.blindfoldedTraining.maximumRecognitionTime,
          })
        "
        class="bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
      >
        <option
          v-for="(option, key) in maximumRecognitionTimeOptions"
          :key="key"
          :value="option[0]"
          class="text-gray-900 bg-white"
        >
          {{ option[1] }}
        </option>
      </select>
    </div>
  </div>
</template>
