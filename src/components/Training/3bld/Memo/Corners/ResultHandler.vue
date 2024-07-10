<template>
  <div class="basis-full flex justify-center space-x-4">
    <button
      @touchend.stop="handleResult('wrong')"
      class="bg-red-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
      :class="{ 'opacity-20': !isHiddenTextShown }"
      :disabled="!isHiddenTextShown"
    >
      <i class="fa-solid fa-xmark-circle"></i>
    </button>
    <button
      @touchend.stop="handleResult('skip')"
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center text-sm"
      :class="{ 'opacity-20': !isHiddenTextShown }"
      :disabled="!isHiddenTextShown"
    >
      <i class="fa-solid fa-rotate"></i>
    </button>
    <button
      @touchend.stop="handleResult('right')"
      class="bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
      :class="{ 'opacity-20': !isHiddenTextShown || isFullDurationUsed }"
      :disabled="!isHiddenTextShown || isFullDurationUsed"
    >
      <i class="fa-solid fa-circle-check"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTraining } from "@/composables/training";

const { isHiddenTextShown, handleResult, isFullDurationUsed } = useTraining();
</script>
