<template>
  <img
    v-show="shouldShowImage"
    :src="src"
    @load="$emit('image-loaded')"
    :class="{
      'border-2': shouldShowBorder,
    }"
  />
  <div
    v-show="isMainImage && loader"
    class="flex justify-center items-center h-full"
  >
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { useTraining } from "@/composables/training";
import { computed } from "vue";

const props = defineProps<{
  isMainImage: boolean;
  uTurn: string;
  yTurn: string;
}>();

const { currentPllAlgorithm, loader, isPllSelected, uTurns, yTurns } =
  useTraining();

const shouldShowBorder = computed(() => {
  // the algorithm is based on the case uTurn = "" and yTurn = "".
  // but if we offset by one U, three Y, we get the same case.
  // same for two U, two Y
  // same for three U, one Y
  // same for four U, zero Y
  // so we can just check if the sum of the indexes is divisible by 4
  const uTurnIndex = uTurns.indexOf(props.uTurn);
  const yTurnIndex = yTurns.indexOf(props.yTurn);
  return isPllSelected.value && (uTurnIndex + yTurnIndex) % 4 === 0;
});

const shouldShowImage = computed(() => {
  if (props.isMainImage) {
    return !loader.value;
  } else {
    return isPllSelected.value;
  }
});

const src = computed(() => {
  const size = props.isMainImage ? 150 : 80;
  const fullAlgorithm = `${props.uTurn}${props.yTurn}${currentPllAlgorithm.value}`;
  return (
    `https://cube.rider.biz/visualcube.php?fmt=png&bg=t&r=y25x-34` +
    `&size=${size}` +
    `&case=${fullAlgorithm}`
  );
});
</script>

<style scoped>
.loader {
  border: 4px solid rgba(255, 255, 255, 0.6); /* Light grey border */
  border-top: 4px solid #3498db; /* Blue border */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
