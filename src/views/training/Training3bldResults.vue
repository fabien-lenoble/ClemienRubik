<template>
  <div class="flex flex-col h-full gap-1">
    <div class="h-[calc(100%-140px)] grid grid-cols-12">
      <div class="col-span-1 flex flex-col mt-8 border rounded-md mr-1">
        <training-3bld-results-letter-navigator @click-letter="clickLetter" />
      </div>
      <div class="col-span-11 overflow-auto">
        <training-3bld-results-table :clicked-letter="clickedLetter" />
      </div>
    </div>

    <div class="flex">
      <div class="flex gap-1 w-full">
        <div class="flex">
          <training-3bld-results-view-mode-toggle />
        </div>
        <div class="grow">
          <training-3bld-results-levels />
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-1">
      <div class="flex grow">
        <button
          @click="goBack"
          class="w-full text-white px-6 py-2 font-semibold rounded-lg shadow border-2"
        >
          back
        </button>
      </div>
      <div class="flex basis-1/6">
        <button
          @click="import3BldCornerPairs"
          class="w-full bg-blue-500 text-white font-bold py-2 rounded-lg transition duration-150 ease-in-out"
        >
          <i class="fa-solid fa-upload"></i>
        </button>
      </div>
      <div class="flex basis-1/6">
        <button
          @click="resetCornerMemoResults"
          class="w-full bg-red-500 text-white font-bold py-2 rounded-lg transition duration-150 ease-in-out"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Training3bldResultsLetterNavigator from "@/components/Training/3Bld/Results/LetterNavigator.vue";
import Training3bldResultsLevels from "@/components/Training/3Bld/Results/Levels.vue";
import Training3bldResultsTable from "@/components/Training/3Bld/Results/Table.vue";
import Training3bldResultsViewModeToggle from "@/components/Training/3Bld/Results/ViewModeToggle.vue";
import { useSettings } from "@/composables/settings";
import { useTraining } from "@/composables/training";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { resetCornerMemoResults } = useTraining();
const { import3BldCornerPairs } = useSettings();

const clickedLetter = ref<string>("");

function clickLetter(letter: string) {
  clickedLetter.value = letter;
}

const router = useRouter();
function goBack() {
  router.push("/training/3bld");
}
</script>
