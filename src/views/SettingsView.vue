<script setup lang="ts">
import { useSettings } from "@/composables/settings";

const { themes, setTheme } = useSettings();
</script>

<template>
  <div class="flex flex-col gap-y-2 h-24 text-lg">
    <button
      v-for="theme in themes"
      :key="theme"
      @click="setTheme(theme)"
      class="border-2 gradient flex basis-full justify-center items-center border-my-text-primary text-white theme-background"
      :data-theme="theme"
    >
      {{ theme }}
    </button>
  </div>
</template>
