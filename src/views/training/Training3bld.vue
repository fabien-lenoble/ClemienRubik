<template>
  <div
    @touchend="toggleShowMapping"
    class="flex flex-col items-center justify-center h-screen"
  >
    <div class="text-4xl mb-4 basis-full content-end">{{ currentPair }}</div>
    <div class="text-2xl basis-full">
      <template v-if="showMapping">
        {{ pairs[currentPair] }}
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { threeBldCornerPairs } from "@/composables/training/constants";
import { onBeforeUnmount, onMounted, ref } from "vue";

// get pair keys but filter out those that have an empty string as value
const pairs = Object.fromEntries(
  Object.entries(threeBldCornerPairs).filter(([_, value]) => value !== "")
);
const pairKeys = Object.keys(pairs);

const currentPair = ref("");
const showMapping = ref(false);
const lastPair = ref("");

function selectRandomPair() {
  let randomIndex, newPair;
  do {
    randomIndex = Math.floor(Math.random() * pairKeys.length);
    newPair = pairKeys[randomIndex];
  } while (newPair === lastPair.value);

  currentPair.value = newPair;
  lastPair.value = newPair;
  showMapping.value = false; // Assurez-vous de réinitialiser cette valeur ici si nécessaire
}

function toggleShowMapping() {
  if (showMapping.value) {
    selectRandomPair(); // Sélectionne une nouvelle paire si le mapping est déjà affiché
  } else {
    showMapping.value = true; // Sinon, affiche le mapping
  }
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
