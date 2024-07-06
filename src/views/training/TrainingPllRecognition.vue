<template>
  <pll-recognition-cube-image
    :current-pll-index="currentPllIndex"
    :current-front-side-index="currentFrontSideIndex"
    :current-number-of-u-turns="currentNumberOfUTurns"
  />
  <pll-recognition-answer-picker
    :current-pll-index="currentPllIndex"
    :pll-selected="pllSelected"
    @select-pll="pllSelected = true"
  />
  <div class="flex flex-wrap justify-center items-center pt-4">
    <button
      @click="chooseNextPll"
      :disabled="!pllSelected"
      class="w-1/3 px-6 py-2 text-black font-semibold rounded-lg shadow border transition-colors duration-300"
      :class="{
        'border-green-500 bg-green-100': pllSelected,
      }"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { pllCases } from "@/composables/training/constants";
import { onMounted, ref } from "vue";

import PllRecognitionAnswerPicker from "@/components/Training/PllRecognition/AnswerPicker.vue";
import PllRecognitionCubeImage from "@/components/Training/PllRecognition/CubeImage/index.vue";

const currentPllIndex = ref(0);
const lastPllIndex = ref(0);
const currentFrontSideIndex = ref(0);
const currentNumberOfUTurns = ref(0);
const pllSelected = ref(false);

function pickNewRandomPll() {
  do {
    currentPllIndex.value = Math.floor(Math.random() * pllCases.length);
  } while (lastPllIndex.value === currentPllIndex.value);

  lastPllIndex.value = currentPllIndex.value;
  currentFrontSideIndex.value = Math.floor(Math.random() * 4);
  currentNumberOfUTurns.value = Math.floor(Math.random() * 4);
}

function chooseNextPll() {
  if (pllSelected.value === true) {
    pickNewRandomPll();
    pllSelected.value = false;
  }
}

onMounted(() => {
  pickNewRandomPll();
});
</script>
