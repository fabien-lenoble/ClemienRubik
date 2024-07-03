<template>
  <div class="flex flex-col h-full">
    <settings-3-bld-training-select />
    <div
      @touchend="isHiddenTextShown = true"
      class="flex flex-col grow items-center justify-center text-2xl"
    >
      <div class="mb-4 basis-1/2 content-end">
        <template v-if="settings.blindfoldedTraining.mode === 'alternate'">
          {{ roundCounter % 4 || 4 }} / 4
        </template>
      </div>
      <div class="text-4xl mb-4 shrink content-end">
        {{ currentHintText }}
      </div>
      <div class="basis-full">
        <template
          class="basis-full flex justify-center space-x-4 pb-12"
          :class="{ 'text-transparent': !isHiddenTextShown }"
        >
          {{ currentHiddenText }}
        </template>
        <div class="basis-full flex justify-center space-x-4 pb-2">
          <button
            @touchend.stop="handleResult('wrong')"
            class="bg-red-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
            :class="{ 'opacity-20': !isHiddenTextShown }"
            :disabled="!isHiddenTextShown"
          >
            <i class="fa-solid fa-xmark-circle"></i>
          </button>
          <button
            @touchend.stop="handleResult('skip')"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center text-sm"
            :class="{ 'opacity-20': !isHiddenTextShown }"
            :disabled="!isHiddenTextShown"
          >
            <i class="fa-solid fa-rotate"></i>
          </button>
          <button
            @touchend.stop="handleResult('right')"
            class="bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
            :class="{ 'opacity-20': !isHiddenTextShown }"
            :disabled="!isHiddenTextShown"
          >
            <i class="fa-solid fa-circle-check"></i>
          </button>
        </div>
      </div>
    </div>
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
import { useSettings } from "@/composables/settings";
import { useTraining } from "@/composables/training";
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";

import Settings3BldTrainingSelect from "@/components/Settings/3BldTrainingSelect.vue";

const { settings } = useSettings();
const router = useRouter();
const {
  currentHintText,
  currentHiddenText,
  roundCounter,
  selectRandomPair,
  isHiddenTextShown,
  handleResult,
} = useTraining();

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
  selectRandomPair();
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>
