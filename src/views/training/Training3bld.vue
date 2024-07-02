<template>
  <settings-3-bld-training-select />
  <div
    @touchend="toggleShowMapping"
    class="flex flex-col items-center justify-center h-screen text-2xl"
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
      <template v-if="showMapping">
        {{ hiddenText }}
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Settings3BldTrainingSelect from "@/components/Settings/3BldTrainingSelect.vue";
import { useSettings } from "@/composables/settings";
import { threeBldCornerPairs } from "@/composables/training/constants";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const { settings } = useSettings();
const mode = computed(() => settings.value.blindfoldedTraining.mode);

const pairs = Object.fromEntries(
  Object.entries(threeBldCornerPairs).filter(
    ([_, value]) => !["", "-"].includes(value)
  )
);
const pairKeys = Object.keys(pairs);
const pairValues = Object.values(pairs);

const currentHintText = ref("");
const showMapping = ref(false);
const lastHintText = ref("");
const roundCounter = ref(0);
const isKeyRound = ref(true); // Start with keys

const hiddenText = ref("");

function selectRandomPair() {
  let randomIndex = 0;
  let newHintText = "";
  do {
    randomIndex = Math.floor(Math.random() * pairKeys.length);
    if (
      mode.value === "pairs" ||
      (mode.value === "alternate" && isKeyRound.value)
    ) {
      newHintText = pairKeys[randomIndex];
    } else {
      newHintText = pairValues[randomIndex];
    }
  } while (newHintText === lastHintText.value);

  lastHintText.value = newHintText; // Update the lastHintText with the new one

  // Decide what to show based on the mode
  if (
    mode.value === "pairs" ||
    (mode.value === "alternate" && isKeyRound.value)
  ) {
    currentHintText.value = pairKeys[randomIndex];
    hiddenText.value = pairs[pairKeys[randomIndex]];
  } else {
    currentHintText.value = pairValues[randomIndex];
    // Find the key for the value to set as hiddenText
    const keyIndex = pairValues.findIndex(
      (value) => value === pairValues[randomIndex]
    );
    hiddenText.value = pairKeys[keyIndex];
  }

  // Increment round counter and toggle between key/value rounds every 4 rounds for "alternate" mode
  roundCounter.value++;
  if (mode.value === "alternate" && roundCounter.value % 4 === 0) {
    isKeyRound.value = !isKeyRound.value;
  }
}

function toggleShowMapping() {
  if (showMapping.value) {
    selectRandomPair();
  }

  showMapping.value = !showMapping.value;
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.code === "Space") {
    event.preventDefault(); // Prevent the default action (scrolling) when space is pressed
    toggleShowMapping();
  }
};

onMounted(() => {
  selectRandomPair();
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>
