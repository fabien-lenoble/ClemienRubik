<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import type { Ref } from "vue";
const moves = [
  ["U", "U'", "U2"],
  ["B", "B'", "B2"],
  ["F", "F'", "F2"],
  ["D", "D'", "D2"],
  ["L", "L'", "L2"],
  ["R", "R'", "R2"],
];
const route = useRoute();
const baseSeed = Number(route.params.seed);
const currentSeed = ref(baseSeed);
let scrambleIndex = Number(route.params.scrambleIndex);

const numberOfMoves = 20;

function goToScrambleIndex() {
  let scramble: Array<string> = [];
    
  for (let i = 0; i < scrambleIndex; i++) {
    scramble = generateScramble();
  }
  return scramble;
}

const scrambleArray: Ref<Array<string>> = ref(goToScrambleIndex());

const scrambles: Ref<Array<Array<string>>> = ref([]);

function generateScramble() {
  const scramble: Array<string> = [];
  let currentComputedIndex = 0;
  let previousComputedIndex = 0;
  let currentMoveSet = null; 

  for (let i = 0; i < numberOfMoves; i++) {
    while (currentComputedIndex === previousComputedIndex) {
      currentSeed.value = generateSeededRandom(currentSeed.value);
      currentComputedIndex = currentSeed.value % 6;
    }
    currentMoveSet = moves[currentComputedIndex];
    
    scramble.push(
      // on fait generateSeededRandom *2 pour pas toujours avoir le meme index choisi
      currentMoveSet[generateSeededRandom(generateSeededRandom(currentSeed.value)) % 3]
      // currentMoveSet[generateSeededRandom(currentSeed.value) % 3]
    );

    previousComputedIndex = currentComputedIndex;
  }
  return scramble;
}

function generateSeededRandom(a: number) {
  var t = (a += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return Math.floor((t ^ (t >>> 14)) >>> 0);
  // return Math.floor((((t ^ (t >>> 14)) >>> 0) / 4294967296) * 1000);
}

function computedScramble (scrambleArray: Array<string>) {
  return scrambleArray.join(" ");
}

function goToNextScramble() {
  scrambleArray.value = generateScramble();
  scrambles.value.push(scrambleArray.value);
  scrambleIndex++;
}

</script>

<template>
  <main>
    <div>my seed : {{ baseSeed }}</div>
    <div>current seed : {{ currentSeed }}</div>
    <div>mélange # : {{ scrambleIndex }}</div>
    <div>my mélange : {{ computedScramble(scrambleArray) }}</div>
    <div>previous mélanges</div>
    <div v-for="(scramble, index) in scrambles" :key="index"> {{ computedScramble(scramble) }}</div>
    <button @click="goToNextScramble">scramble</button>
  </main>
</template>
