<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import type { Settings } from "@/composables/settings/types";

const { settings, setTimerFormat } = useSettings();

const options: Array<[Settings["timerFormat"], string]> = [
  ["none", "none"],
  ["rounded", "2"],
  ["1decimal", "2.8"],
  ["2decimals", "2.83"],
  ["3decimals", "2.834"],
];
</script>

<template>
  <div class="flex flex-col gap-y-2 mt-auto">
    <label class="flex items-center">
      <span class="mr-2">timer format</span>
      <select
        v-model="settings.timerFormat"
        @change="setTimerFormat(settings.timerFormat)"
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
