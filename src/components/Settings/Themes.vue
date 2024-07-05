<script setup lang="ts">
import { useSettings } from "@/composables/settings";

const { themes, setTheme } = useSettings();
</script>

<template>
  <div class="flex flex-row gap-4">
    <button
      v-for="theme in themes"
      :key="theme"
      @click="setTheme(theme)"
      class="border-2 gradient flex justify-center items-center border-my-text-primary theme-background h-10 w-full"
      :data-theme="theme"
    ></button>
  </div>
</template>
