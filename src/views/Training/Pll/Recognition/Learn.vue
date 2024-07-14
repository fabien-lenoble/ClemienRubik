<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-wrap grow content-center">
      <div class="basis-1/2" v-for="i in 4" :key="i">
        <pll-recognition-cube-image
          class="w-[170px] min-h-[170px]"
          :sticker-size="34"
          :is-main-image="true"
          :u-turn="uTurns[i - 1]"
          :y-turn="currentYTurn"
          :current-pll-algorithm="currentPllAlgorithm"
        />
      </div>
    </div>
    <div
      class="flex flex-wrap grow content-center min-w-[100px] m-auto justify-center gap-2"
    >
      <sticker sticker="L" class="w-8 h-8" @click="selectYTurn(0)"></sticker>
      <sticker sticker="P" class="w-8 h-8" @click="selectYTurn(1)"></sticker>
      <sticker sticker="T" class="w-8 h-8" @click="selectYTurn(2)"></sticker>
      <sticker sticker="H" class="w-8 h-8" @click="selectYTurn(3)"></sticker>
    </div>
    <div>
      <pll-recognition-learn-pll-picker
        @select-pll="selectPll($event)"
        :current-pll-name="currentPllName"
      />
    </div>
    <div class="flex items-center pt-4 pb-12 pr-2">
      <div class="basis-1/2">
        <button
          @click="goToPlayView"
          class="w-full px-6 py-2 font-semibold rounded-lg shadow border-2 transition-colors duration-300"
        >
          play
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTraining } from "@/composables/training";
import { useRouter } from "vue-router";

import Sticker from "@/components/CubeImage/Sticker.vue";
import PllRecognitionCubeImage from "@/components/Training/PllRecognition/CubeImage.vue";
import PllRecognitionLearnPllPicker from "@/components/Training/PllRecognition/Learn/PllPicker.vue";
import { pllCases } from "@/composables/training/constants";
import { computed, ref } from "vue";

const { uTurns, yTurns } = useTraining();

const currentYTurn = ref<string>("");
function selectYTurn(index: number) {
  if (currentYTurn.value === yTurns[index]) {
    return;
  }
  currentYTurn.value = yTurns[index];
}

const currentPllName = ref<string>("Aa");

const currentPllAlgorithm = computed(() => {
  const pll = pllCases.find((pll) => pll.name === currentPllName.value);
  return pll?.algorithm as string;
});

const router = useRouter();
function goToPlayView() {
  router.push("/training/pll-recognition/play");
}

function selectPll(name: string) {
  currentPllName.value = name;
}
</script>
