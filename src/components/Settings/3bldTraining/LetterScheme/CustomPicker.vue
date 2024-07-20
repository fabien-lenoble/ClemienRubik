<template>
  <div class="grid grid-rows-3 grid-cols-9 gap-2">
    <div
      v-for="(letter, index) in alphabet"
      :key="index"
      @click="selectSticker(letter)"
    >
      <div
        class="cursor-pointer text-center p-1 border-2 rounded-lg border-gray-300 text-my-text-secondary"
      >
        {{ letter }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function selectSticker(letter: string) {
  console.log(letter);
}
</script>
