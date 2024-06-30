<script setup lang="ts">
import { useSettings } from "@/composables/settings";

const { themes, setTheme } = useSettings();
</script>

<template>
  <button
    v-for="theme in themes"
    :key="theme"
    @click="setTheme(theme)"
    class="border-2 gradient flex basis-full justify-center items-center border-my-text-primary theme-background"
    :data-theme="theme"
  ></button>
</template>
