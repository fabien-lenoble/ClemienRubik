<template>
  <img
    v-show="shouldShowImage"
    :src="src"
    @load="$emit('image-loaded')"
    class="m-auto"
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

defineEmits<{
  (e: "image-loaded"): void;
}>();

const props = defineProps<{
  isMainImage: boolean;
  uTurn: string;
  yTurn: string;
  currentPllAlgorithm: string;
  loader?: boolean;
}>();

const { isPllSelected } = useTraining();

const shouldShowImage = computed(() => {
  if (props.isMainImage) {
    return !props.loader;
  } else {
    return isPllSelected.value;
  }
});

const src = computed(() => {
  const size = props.isMainImage ? 250 : 100;
  const fullAlgorithm = `${props.uTurn}${props.yTurn}${props.currentPllAlgorithm}`;
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
