<script setup lang="ts">
import { useSeed } from "@/composables/seed";
import { useScramble } from "@/composables/scramble";
import { useSession } from "@/composables/session";

const { baseSessionSeed, currentScrambleSeed } = useSeed();

const { startNewSession } = useSession();

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
    <div class="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
      {{ stringifiedScramble(currentScramble) }}
    </div>
    <div class="flex gap-5">
      <div class="basis-1/2 text-end">
        <button @click="goToNextScramble" @keydown.space.prevent>
          scramble
        </button>
      </div>
      <div class="basis-1/2 text-start">
        <button @click="startNewSession" @keydown.space.prevent>
          new session
        </button>
      </div>
    </div>
  </div>
</template>
