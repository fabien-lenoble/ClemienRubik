<template>
  <div class="flex flex-row min-h-[100px]">
    <div class="basis-1/3" v-for="index in 3" :key="index">
      <pll-recognition-cube-image
        :is-main-image="false"
        :y-turn="currentRandomYTurn"
        :u-turn="getUTurn(index)"
        :current-pll-algorithm="currentPllAlgorithm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PllRecognitionCubeImage from "@/components/Training/PllRecognition/CubeImage.vue";
import { useTraining } from "@/composables/training";
const {
  currentRandomYTurn,
  currentRandomUTurnIndex,
  uTurns,
  currentPllAlgorithm,
} = useTraining();

function getUTurn(index: number) {
  return uTurns[(currentRandomUTurnIndex.value + index) % 4];
}
</script>
