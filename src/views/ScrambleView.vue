<script setup lang="ts">
import { useSeed } from "@/composables/seed";
import { useScramble } from "@/composables/scramble";
import CurrentScramble from "@/components/CurrentScramble/index.vue";
import ScrambleHistory from "@/components/ScrambleHistory/index.vue";

const { initSeedValues } = useSeed();
const { initScrambleValues } = useScramble();
const a = process.env.NODE_ENV;
initSeedValues();
initScrambleValues();
</script>

<template>
  <main>
    env: {{ a }}
    <div class="container">
      <div class="column columns">
        <current-scramble />
      </div>
      <div class="column">
        <scramble-history />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.container {
  display: flex;
  justify-content: space-around;
}
.columns {
  flex-direction: column;
}
.column {
  flex: 50%;
}
</style>
