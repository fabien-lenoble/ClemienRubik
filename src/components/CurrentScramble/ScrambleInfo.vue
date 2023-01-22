<script setup lang="ts">
import { useSeed } from "@/composables/seed";
import { useScramble } from "@/composables/scramble";

const { baseSessionSeed, currentScrambleSeed } = useSeed();

const {
  numberOfMoves,
  stringifiedScramble,
  currentScrambleIndex,
  goToNextScramble,
  currentScramble,
} = useScramble();
</script>

<template>
  <div>
    <div>number of moves <input type="number" v-model="numberOfMoves" /></div>
    <div>my seed : {{ baseSessionSeed }}</div>
    <div>current seed : {{ currentScrambleSeed }}</div>
    <div>mélange # : {{ currentScrambleIndex }}</div>
    <div>my mélange : {{ stringifiedScramble(currentScramble) }}</div>
    <button @click="goToNextScramble">scramble</button>
  </div>
</template>
