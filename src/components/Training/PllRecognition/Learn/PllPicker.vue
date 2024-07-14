<template>
  <div class="grid grid-rows-3 grid-cols-7 gap-2 h-full">
    <div
      class="relative"
      v-for="pll in pllCases"
      :key="pll.name"
      @click="handleClick(pll.name)"
    >
      <div
        class="cursor-pointer p-1 text-center border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        :class="{
          'border-green-500 bg-green-100 text-black':
            pll.name === currentPllName,
        }"
      >
        {{ pll.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pllCases } from "@/composables/training/constants";

defineProps<{
  currentPllName: string;
}>();

const emit = defineEmits<{
  (e: "select-pll", name: string): void;
}>();

function handleClick(name: string) {
  emit("select-pll", name);
}
</script>
