<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-wrap grow content-center">
      <div class="basis-1/2" v-for="i in 4" :key="i">
        <cube-image-3d
          class="w-[170px] min-h-[170px]"
          :sticker-size="34"
          :u-turn="computeUTurn(i - 1)"
          :y-turn="currentYTurn"
          ufr-colors="YBR"
          :case="currentPllAlgorithm"
        />
      </div>
    </div>
    <div class="flex flex-wrap content-center justify-center gap-2">
      <div
        class="sticker border border-black bg-white text-black text-center font-semibold text-2xl w-8 h-8"
        @click="currentUTurnIndex += 1"
      >
        &lt;
      </div>
      <div
        class="sticker border border-black bg-white text-black text-center font-semibold text-2xl w-8 h-8"
        @click="currentUTurnIndex += 3"
      >
        &gt;
      </div>
    </div>
    <div
      class="flex flex-wrap grow content-center min-w-[100px] m-auto justify-center gap-2"
    >
      <sticker
        sticker="L"
        class="w-8 h-8"
        @click="currentYTurnIndex = 0"
      ></sticker>
      <sticker
        sticker="P"
        class="w-8 h-8"
        @click="currentYTurnIndex = 1"
      ></sticker>
      <sticker
        sticker="T"
        class="w-8 h-8"
        @click="currentYTurnIndex = 2"
      ></sticker>
      <sticker
        sticker="H"
        class="w-8 h-8"
        @click="currentYTurnIndex = 3"
      ></sticker>
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
import Sticker from "@/components/CubeImage2d/Sticker.vue";
import CubeImage3d from "@/components/CubeImage3d.vue";
import PllRecognitionLearnPllPicker from "@/components/Training/PllRecognition/Learn/PllPicker.vue";
import {
  antiClockWiseUTurns,
  antiClockWiseYTurns,
  clockWiseUTurns,
  pllCases,
} from "@/composables/training/constants";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const currentUTurnIndex = ref<number>(0);
const currentUTurn = computed(
  () => antiClockWiseUTurns[currentUTurnIndex.value % 4]
);

const currentYTurnIndex = ref<number>(0);
const currentYTurn = computed(
  () => antiClockWiseYTurns[currentYTurnIndex.value % 4]
);

function computeUTurn(index: number) {
  return clockWiseUTurns[(currentYTurnIndex.value + index) % 4];
}

const currentPllName = ref<string>("Aa");

const currentPllAlgorithm = computed(() => {
  const pll = pllCases.find((pll) => pll.name === currentPllName.value);
  return (pll?.algorithm + " " + currentUTurn.value) as string;
});

const router = useRouter();
function goToPlayView() {
  router.push("/training/pll-recognition/play");
}

function selectPll(name: string) {
  currentPllName.value = name;
}
</script>
