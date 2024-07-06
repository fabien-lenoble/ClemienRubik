<template>
  <div class="flex flex-col h-full">
    <settings-3-bld-training-select />
    <hint-and-answer-reveal />
    <div class="shrink pb-12 align text-end">
      <button
        class="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
        @click="goToResults"
      >
        Results
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTraining } from "@/composables/training";
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";

import Settings3BldTrainingSelect from "@/components/Settings/3BldTrainingSelect.vue";
import HintAndAnswerReveal from "@/components/Training/3Bld/HintAndAnswerReveal.vue";

const router = useRouter();
const { isHiddenTextShown } = useTraining();

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.code === "Space") {
    event.preventDefault(); // Prevent the default action (scrolling) when space is pressed
    isHiddenTextShown.value = true;
  }
};

function goToResults() {
  router.push("/training/3bld/results");
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>
