<template>
  <div class="flex flex-wrap justify-center items-center h-full">
    <div class="basis-1/3" v-for="(pll, index) in pllCases" :key="pll.name">
      <div
        @click="$emit('select-pll', index)"
        class="cursor-pointer text-center py-2 mx-1 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        :class="{
          'border-green-500 bg-green-100 text-black':
            isPllSelected && index === currentPllIndex,
          'border-red-500 bg-red-100 text-black':
            isPllSelected &&
            index == selectedPllIndex &&
            index !== currentPllIndex,
          'border-gray-300 text-my-text-secondary': !isPllSelected,
        }"
      >
        {{ pll.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTraining } from "@/composables/training";
import { pllCases } from "@/composables/training/constants";

const { currentPllIndex, isPllSelected, selectedPllIndex } = useTraining();
</script>
