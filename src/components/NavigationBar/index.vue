<script setup lang="ts">
import NavigationButton from "@/components/NavigationBar/Button.vue";
import { computed } from "vue";

import { useScramble } from "@/composables/scramble";
import { useSeed } from "@/composables/seed";

const { baseSessionSeed } = useSeed();
const { currentScrambleIndex } = useScramble();

const rumixRoute = computed(() => {
  return currentScrambleIndex.value
    ? `/scramble/${baseSessionSeed.value}/${currentScrambleIndex.value}`
    : "/";
});
</script>

<template>
  <div
    class="w-[calc(100%-32px)] left-4 m-0 inline-flex absolute bottom-8"
    role="group"
  >
    <navigation-button
      class="rounded-l"
      :route-push="rumixRoute"
      :is-active-check="'scramble'"
      >rumix</navigation-button
    >
    <navigation-button route-push="/solves" :is-active-check="'solves'"
      >solves</navigation-button
    >
    <navigation-button
      class="rounded-r"
      route-push="/settings"
      :is-active-check="'settings'"
      >settings</navigation-button
    >
  </div>
</template>
