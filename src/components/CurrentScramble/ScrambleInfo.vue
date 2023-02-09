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
  <div class="text-center px-3">
    <!-- <div>number of moves <input type="number" v-model="numberOfMoves" /></div>
    <div>my seed : {{ baseSessionSeed }}</div>
    <div>current seed : {{ currentScrambleSeed }}</div>
    <div>mélange # : {{ currentScrambleIndex }}</div> -->
    <div>{{ stringifiedScramble(currentScramble) }}</div>
    <button @click="goToNextScramble">scramble</button>
  </div>
</template>
