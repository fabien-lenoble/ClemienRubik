<template>
  <div class="flex flex-row">
    <div class="basis-1/3 min-h-[115px]" v-for="index in 3" :key="index">
      <cube-image-3d
        v-if="isPllSelected"
        :y-turn="currentRandomYTurn"
        :u-turn="getUTurn(index + 2)"
        :case="currentPllAlgorithm"
        :stickerSize="20"
        ufr-colors="YBR"
        class="w-[115px] min-h-[115px]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CubeImage3d from "@/components/CubeImage3d.vue";
import { useTraining } from "@/composables/training";
import constants from "@/constants";
const { clockWiseUTurns } = constants;
const {
  currentRandomYTurn,
  currentRandomAufUTurnIndex,
  currentPllAlgorithm,
  isPllSelected,
} = useTraining();

function getUTurn(index: number) {
  return clockWiseUTurns[(currentRandomAufUTurnIndex.value + index) % 4];
}
</script>
