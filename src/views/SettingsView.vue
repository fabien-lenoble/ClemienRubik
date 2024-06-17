<script setup lang="ts">
import SettingsThemes from "@/components/Settings/Themes.vue";
import SettingsToggles from "@/components/Settings/Toggles.vue";
</script>

<template>
  <div class="flex flex-col gap-y-2 h-48 text-lg">
    <settings-themes />
    <settings-toggles />
  </div>
</template>
