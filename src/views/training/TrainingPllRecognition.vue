<template>
  <div class="flex flex-col h-full">
    <div class="basis-1/4 self-center content-center">
      <pll-recognition-cube-image
        :current-pll-index="currentPllIndex"
        :current-front-side-index="currentFrontSideIndex"
        :current-number-of-u-turns="currentNumberOfUTurns"
      />
    </div>
    <div class="grow">
      <pll-recognition-answer-picker
        :current-pll-index="currentPllIndex"
        :pll-selected="pllSelected"
        @select-pll="pllSelected = true"
      />
    </div>
    <div class="flex flex-wrap justify-center items-center pt-4 pb-12">
      <button
        @click="chooseNextPll"
        :disabled="!pllSelected"
        class="w-full px-6 py-2 text-black font-semibold rounded-lg shadow border-2 transition-colors duration-300"
        :class="{
          'border-green-500 bg-green-100': pllSelected,
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
