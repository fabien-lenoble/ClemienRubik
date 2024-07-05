<script setup lang="ts">
import { useSettings } from "@/composables/settings";

const { settings, setBlindfoldedMode } = useSettings();
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center">
      <span class="mr-2">show blind memo</span>
      <input
        type="checkbox"
        v-model="settings.blindfoldedMode"
        @change="setBlindfoldedMode(($event.target as any).checked)"
      />
    </div>
  </div>
</template>
