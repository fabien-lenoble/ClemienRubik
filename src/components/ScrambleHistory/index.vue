<script setup lang="ts">
import { useScramble } from "@/composables/scramble";
import { useSession } from "@/composables/session";

const { stringifiedScramble, currentScrambleIndex, lastNScrambles } =
  useScramble();

const { getPersonalBest, sessionSolves } = useSession();

const numberOfScrambles = 10;
</script>

<template>
  <div>
    <div>solves:</div>
    <p v-for="(solve, index) in sessionSolves" :key="index">
      {{ solve.displayTime }} - {{ solve.displayScramble }}
    </p>
    <div v-if="getPersonalBest">
      personal best: {{ getPersonalBest.displayTime }} -
      {{ getPersonalBest.displayScramble }}
    </div>
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
