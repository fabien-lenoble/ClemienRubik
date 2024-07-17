<template>
  <div class="flex flex-row">
    <div
      class="basis-1/3 min-h-[115px]"
      v-for="index in 3"
      :key="index"
      :class="`-order-${index}`"
    >
      <cube-image-3d
        v-if="isPllSelected"
        :y-turn="currentRandomYTurn"
        :u-turn="antiClockWiseUTurns[(currentRandomAufUTurnIndex + index) % 4]"
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
import { antiClockWiseUTurns } from "@/composables/training/constants";
const {
  currentRandomAufUTurnIndex,
  currentRandomYTurn,
  currentPllAlgorithm,
  isPllSelected,
} = useTraining();
</script>
