<script setup lang="ts">
import { useSeed } from "@/composables/seed";
import { useScramble } from "@/composables/scramble";
import CurrentScramble from "@/components/CurrentScramble/index.vue";
import ScrambleHistory from "@/components/ScrambleHistory/index.vue";
import { useTimer } from "@/composables/timer";

const { initSeedValues } = useSeed();
const { initScrambleValues } = useScramble();
initSeedValues();
initScrambleValues();
</script>

<template>
  <main class="container mx-auto h-full">
    <div class="flex justify-center h-full">
      <current-scramble />
      <!-- <div class="columns-6">
        <scramble-history v-if="!isTimerStarted" />
      </div> -->
    </div>
  </main>
</template>
