<script setup lang="ts">
import { useSettings } from "@/composables/settings";

const { settings, setBlindfoldedMode } = useSettings();
</script>

<template>
  <div class="flex flex-col gap-y-2 mt-auto">
    <label class="flex items-center">
      <input
        type="checkbox"
        v-model="settings.blindfoldedMode"
        @change="setBlindfoldedMode(($event.target as any).checked)"
      />
      <span class="ml-2">show blind memo</span>
    </label>
  </div>
</template>
