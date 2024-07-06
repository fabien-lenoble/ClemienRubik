<template>
  <div class="h-screen flex flex-col pb-12 gap-2">
    <div class="h-[calc(100%-136px)] grid grid-cols-12">
      <div class="col-span-1 flex flex-col mt-8">
        <training-3bld-results-letter-navigator @click-letter="clickLetter" />
      </div>
      <div class="col-span-11 overflow-auto">
        <training-3bld-results-table :clicked-letter="clickedLetter" />
      </div>
    </div>

    <div class="flex">
      <div class="flex gap-2 w-full">
        <div class="flex basis-1/2 w-full">
          <training-3bld-results-view-mode-toggle />
        </div>
        <div class="flex basis-1/2">
          <button
            @click="resetCornerMemoResults"
            class="w-full bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            reset all
          </button>
        </div>
      </div>
    </div>
    <div class="flex">
      <button
        @click="goBack"
        class="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
      >
        Back
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Training3bldResultsLetterNavigator from "@/components/Training/3Bld/Results/LetterNavigator.vue";
import Training3bldResultsTable from "@/components/Training/3Bld/Results/Table.vue";
import Training3bldResultsViewModeToggle from "@/components/Training/3Bld/Results/ViewModeToggle.vue";
import { useTraining } from "@/composables/training";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { resetCornerMemoResults } = useTraining();

const clickedLetter = ref<string>("");

function clickLetter(letter: string) {
  clickedLetter.value = letter;
}

const router = useRouter();
function goBack() {
  router.push("/training/3bld");
}
</script>
