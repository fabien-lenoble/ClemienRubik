<template>
  <div class="flex flex-col h-full">
    <div class="grow content-center">
      <pll-recognition-cube-image
        :is-main-image="true"
        :u-turn="currentRandomUTurn"
        :y-turn="currentRandomYTurn"
        @image-loaded="setLoader(false)"
        :current-pll-algorithm="currentPllAlgorithm"
        :loader="loader"
      />
      <pll-recognition-revealed-cube-images />
    </div>
    <div>
      <pll-recognition-answer-picker @select-pll="selectPll($event)" />
    </div>
    <div class="flex items-center pt-4 pb-12 gap-x-2">
      <div class="basis-1/2">
        <button
          @click="goToLearnView"
          class="w-full px-6 py-2 font-semibold rounded-lg shadow border-2 transition-colors duration-300"
        >
          learn
        </button>
      </div>
      <div class="basis-1/2">
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
  </div>
</template>

<script setup lang="ts">
import { useTraining } from "@/composables/training";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

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
  setLoader,
  currentPllAlgorithm,
  loader,
} = useTraining();

onMounted(() => {
  pickNewRandomPll();
});

const router = useRouter();
function goToLearnView() {
  router.push("/training/pll-recognition/learn");
}
</script>
