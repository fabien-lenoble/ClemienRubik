<script setup lang="ts">
import { useScramble } from "@/composables/scramble";

const { stringifiedScramble, currentScrambleIndex, lastNScrambles } =
  useScramble();

const numberOfScrambles = 10;
</script>

<template>
  <div>
    <div>previous {{ numberOfScrambles }} mélanges</div>
    <p
      v-for="(scramble, index) in lastNScrambles(numberOfScrambles)"
      :key="index"
    >
      #{{ currentScrambleIndex - 1 - index }}:
      {{ stringifiedScramble(scramble) }}
    </p>
  </div>
</template>
