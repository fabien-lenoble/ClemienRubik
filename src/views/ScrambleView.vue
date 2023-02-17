<script setup lang="ts">
import { useSeed } from "@/composables/seed";
import { useScramble } from "@/composables/scramble";
import CurrentScramble from "@/components/CurrentScramble/index.vue";
import { useRoute } from "vue-router";

const { initSeedValues } = useSeed();
const { initScrambleValues } = useScramble();
const route = useRoute();

initSeedValues(Number(route.params.seed));
initScrambleValues();
</script>

<template>
  <main class="container mx-auto h-full">
    <div class="flex justify-center h-full">
      <current-scramble />
    </div>
  </main>
</template>
