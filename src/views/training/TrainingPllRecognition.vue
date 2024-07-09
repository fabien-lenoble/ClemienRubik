<template>
  <div class="flex flex-col h-full">
    <div class="basis-1/4 self-center content-center">
      <pll-recognition-cube-image
        :current-pll-index="currentPllIndex"
        :loader="loader"
        @image-loaded="loader = false"
      />
    </div>
    <div class="grow">
      <pll-recognition-answer-picker
        :current-pll-index="currentPllIndex"
        :is-pll-selected="isPllSelected"
        :selected-pll-index="selectedPllIndex"
        @select-pll="selectPll($event)"
      />
    </div>
    <div class="flex flex-wrap justify-center items-center pt-4 pb-12">
      <button
        @click="chooseNextPll"
        :disabled="!isPllSelected"
        class="w-full px-6 py-2 font-semibold rounded-lg shadow border-2 transition-colors duration-300"
        :class="{
          'border-green-500 bg-green-100': isPllSelected,
          'text-my-text-secondary': !isPllSelected,
          'text-black': isPllSelected,
        }"
      >
        next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pllCases } from "@/composables/training/constants";
import { onMounted, ref } from "vue";

import PllRecognitionAnswerPicker from "@/components/Training/PllRecognition/AnswerPicker.vue";
import PllRecognitionCubeImage from "@/components/Training/PllRecognition/CubeImage/index.vue";

const currentPllIndex = ref(0);
const lastPllIndex = ref(0);
const isPllSelected = ref(false);
const selectedPllIndex = ref();
const loader = ref(false);

function pickNewRandomPll() {
  loader.value = true;
  do {
    currentPllIndex.value = Math.floor(Math.random() * pllCases.length);
  } while (lastPllIndex.value === currentPllIndex.value);

  lastPllIndex.value = currentPllIndex.value;
}

function chooseNextPll() {
  if (isPllSelected.value === true) {
    pickNewRandomPll();
    isPllSelected.value = false;
  }
}

function selectPll(index: number) {
  if (isPllSelected.value === false) {
    isPllSelected.value = true;
    selectedPllIndex.value = index;
  }
}

onMounted(() => {
  pickNewRandomPll();
});
</script>
