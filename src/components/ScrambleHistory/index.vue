<script setup lang="ts">
import { useScramble } from "@/composables/scramble";
import { useSession } from "@/composables/session";

const { stringifiedScramble, currentScrambleIndex, lastNScrambles } =
  useScramble();

const { getPersonalBest } = useSession();

const numberOfScrambles = 10;
</script>

<template>
  <div>
    <div>personal best: {{ getPersonalBest() }}</div>
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
