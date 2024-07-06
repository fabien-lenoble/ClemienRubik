<template>
  <div class="flex flex-wrap justify-center items-center">
    <div
      v-for="pll in pllCases"
      :key="pll.name"
      @click="$emit('select-pll')"
      class="h-12 basis-1/4 cursor-pointer p-4 m-2 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-black"
      :class="{
        'border-green-500 bg-green-100':
          pllSelected && pll.name === currentPll.name,
        'border-gray-300': !pllSelected,
      }"
    >
      {{ pll.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { pllCases } from "@/composables/training/constants";
import { computed } from "vue";

const props = defineProps<{
  currentPllIndex: number;
  pllSelected: boolean;
}>();

const currentPll = computed(() => {
  return pllCases[props.currentPllIndex];
});
</script>
