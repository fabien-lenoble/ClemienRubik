<template>
  <div
    @touchend="checkMyAnswer"
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
      <result-handler class="pb-12" />
      <time-bar
        :duration="settings.blindfoldedTraining.maximumRecognitionTime"
      />
      <p class="text-center" v-if="elapsedTime && hasMaximumRecognitionTime">
        {{ elapsedTime.toFixed(2) }}s
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import { useTraining } from "@/composables/training";
import { onBeforeUnmount, onMounted } from "vue";

import ResultHandler from "@/components/Training/3Bld/ResultHandler.vue";
import TimeBar from "@/components/Training/3Bld/TimeBar.vue";

const { settings, hasMaximumRecognitionTime } = useSettings();
const {
  currentHintText,
  currentHiddenText,
  roundCounter,
  selectRandomPair,
  isHiddenTextShown,
  handleTimeBarAnimationEnd,
  elapsedTime,
} = useTraining();

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.code === "Space") {
    event.preventDefault(); // Prevent the default action (scrolling) when space is pressed
    checkMyAnswer();
  }
};

function checkMyAnswer() {
  handleTimeBarAnimationEnd(false);
  isHiddenTextShown.value = true;
}

onMounted(() => {
  selectRandomPair();
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>
