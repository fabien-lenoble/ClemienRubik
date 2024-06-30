<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import type { Settings } from "@/composables/settings/types";

const { settings, setBlindfoldedTraining } = useSettings();

const options: Array<[Settings["blindfoldedTraining"]["mode"], string]> = [
  ["pairs", "pairs only"],
  ["texts", "texts only"],
  ["alternate", "alternate pairs and texts"],
];
</script>

<template>
  <div class="flex flex-col gap-y-2 mt-auto">
    <label class="flex items-center">
      <span class="mr-2">3bld training mode</span>
      <select
        v-model="settings.blindfoldedTraining.mode"
        @change="
          setBlindfoldedTraining({ mode: settings.blindfoldedTraining.mode })
        "
        class="bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
      >
        <option
          v-for="(option, key) in options"
          :key="key"
          :value="option[0]"
          class="text-gray-900 bg-white"
        >
          {{ option[1] }}
        </option>
      </select>
    </label>
  </div>
</template>
