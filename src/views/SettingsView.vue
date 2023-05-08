<script setup lang="ts">
import { useSettings } from "@/composables/settings";

const { themes, appTheme, setTheme } = useSettings();
</script>

<template>
  <div class="flex flex-col gap-y-2 h-24 text-lg">
    <button
      v-for="theme in themes"
      :key="theme"
      @click="setTheme(theme)"
      class="border-2 gradient flex basis-full justify-center items-center border-my-text-primary text-white bg-tertiary background"
      :data-theme="theme"
    >
      {{ theme }}
    </button>
  </div>
</template>

<style lang="scss">
.background {
  background: linear-gradient(
    180deg,
    rgb(var(--color-primary)) 30%,
    rgb(var(--color-secondary)) 45%,
    rgb(var(--color-secondary)) 55%,
    rgb(var(--color-tertiary)) 70%
  );
}
</style>
