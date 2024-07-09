<template>
  <img
    v-show="!loader"
    :src="`https://cube.rider.biz/visualcube.php?fmt=png&size=200&bg=t&r=y25x-34&case=${currentPllAlgorithm}`"
    @load="() => $emit('image-loaded')"
  />
  <div v-show="loader" class="flex justify-center items-center h-full">
    <div class="loader"></div>
  </div>
</template>

<script setup lang="ts">
import { pllCases } from "@/composables/training/constants";
import { computed } from "vue";

const props = defineProps<{
  currentPllIndex: number;
  loader: boolean;
}>();

const currentPllAlgorithm = computed(() => {
  const uTurns = ["", "U", "U2", "U'"];
  const randomUTurn = uTurns[Math.floor(Math.random() * uTurns.length)];
  const yTurns = ["", "y", "y2", "y'"];
  const randomYTurn = yTurns[Math.floor(Math.random() * yTurns.length)];

  return (
    pllCases[props.currentPllIndex].algorithm.replace(" ", "") +
    randomUTurn +
    randomYTurn
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
