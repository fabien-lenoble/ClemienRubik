<template>
  <div class="flex flex-col h-full">
    <div class="h-screen overflow-auto">
      <training-3bld-results-table />
    </div>
    <div class="shrink pt-4 pb-2 align text-end">
      <button
        @click="resetCornerMemoResults"
        class="w-1/4 bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out"
      >
        reset all
      </button>
    </div>
    <div class="shrink pb-12">
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
import Training3bldResultsTable from "@/components/Training/3Bld/Results/Table.vue";
import { useTraining } from "@/composables/training";
import { useRouter } from "vue-router";

const { resetCornerMemoResults } = useTraining();

const router = useRouter();
function goBack() {
  router.push("/training/3bld");
}
</script>
