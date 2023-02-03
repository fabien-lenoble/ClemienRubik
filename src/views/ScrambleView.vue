<script setup lang="ts">
import { useSeed } from "@/composables/seed";
import { useScramble } from "@/composables/scramble";
import CurrentScramble from "@/components/CurrentScramble/index.vue";
import ScrambleHistory from "@/components/ScrambleHistory/index.vue";

const { initSeedValues } = useSeed();
const { initScrambleValues } = useScramble();

initSeedValues();
initScrambleValues();
</script>

<template>
  <main>
    <div class="container">
      <div class="column columns">
        <current-scramble />
      </div>
      <div class="column flex-6">
        <scramble-history />
      </div>
    </div>
  </main>
</template>
