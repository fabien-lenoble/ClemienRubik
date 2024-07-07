<template>
  <div class="flex flex-wrap justify-center items-center h-full">
    <div class="basis-1/3" v-for="pll in pllCases" :key="pll.name">
      <div
        @click="$emit('select-pll')"
        class="cursor-pointer text-center py-2 m-1 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-black"
        :class="{
          'border-green-500 bg-green-100':
            pllSelected && pll.name === currentPll.name,
          'border-gray-300': !pllSelected,
        }"
      >
        {{ pll.name }}
      </div>
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
