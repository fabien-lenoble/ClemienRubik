<template>
  <div class="flex flex-col h-full">
    <settings-3bld-training-select />
    <hint-and-answer-reveal />
    <div class="shrink pb-12 text-center">
      <button
        class="w-full px-6 py-2 text-white font-semibold rounded-lg shadow border-2"
        @click="goToResults"
      >
        results
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Settings3bldTrainingSelect from "@/components/Settings/3bldTraining/Select.vue";
import { useTraining } from "@/composables/training";
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";

import HintAndAnswerReveal from "@/components/Training/3bld/Memo/Corners/HintAndAnswerReveal.vue";

const router = useRouter();
const { isHiddenTextShown } = useTraining();

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.code === "Space") {
    event.preventDefault(); // Prevent the default action (scrolling) when space is pressed
    isHiddenTextShown.value = true;
  }
};

function goToResults() {
  router.push("/training/3bld/memo/corners/results");
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>
