<template>
  <div class="flex flex-col h-full">
    <div class="flex basis-1/4 self-center content-center w-full">
      <div class="shrink content-center min-w-[150px]">
        <pll-recognition-cube-image
          :is-main-image="true"
          :u-turn="currentRandomUTurn"
          :y-turn="currentRandomYTurn"
        />
      </div>
      <div class="grow flex-col content-center">
        <div class="basis-1/2">
          <pll-recognition-revealed-cube-images />
        </div>
        <div v-if="isPllSelected">
          {{ currentPllAlgorithm }}
        </div>
      </div>
    </div>
    <div class="grow">
      <pll-recognition-answer-picker @select-pll="selectPll($event)" />
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
import { useTraining } from "@/composables/training";
import { onMounted } from "vue";

import PllRecognitionAnswerPicker from "@/components/Training/PllRecognition/AnswerPicker.vue";
import PllRecognitionCubeImage from "@/components/Training/PllRecognition/CubeImage.vue";
import PllRecognitionRevealedCubeImages from "@/components/Training/PllRecognition/RevealedCubeImages.vue";

const {
  isPllSelected,
  currentRandomUTurn,
  currentRandomYTurn,
  pickNewRandomPll,
  chooseNextPll,
  selectPll,
  currentPllAlgorithm,
} = useTraining();

onMounted(() => {
  pickNewRandomPll();
});
</script>
