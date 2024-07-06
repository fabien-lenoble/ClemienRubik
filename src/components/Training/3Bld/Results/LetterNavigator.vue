<template>
  <div
    v-for="letter in alphabet"
    :key="letter"
    class="flex justify-center basis-full text-xs items-center"
    @click="clickLetter(letter)"
  >
    {{ letter }}
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
const emit = defineEmits(["clickLetter"]);
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function clickLetter(letter: string) {
  emit("clickLetter", letter);
}
</script>
