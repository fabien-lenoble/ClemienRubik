<template>
  <div class="flex flex-col h-full">
    <div class="grow">
      worse results (last 20)
      <div
        v-for="(result, index) in sub80percentResults"
        :key="index"
        class="flex space-x-4"
      >
        {{ result.key }}/{{ result.text }}: {{ result.ratio.toFixed(0) }}% ({{
          result.right
        }}/{{ result.total }})
      </div>
    </div>
    <div class="shrink pb-2 align text-end">
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
import { useTraining } from "@/composables/training";
import { computed } from "vue";
import { useRouter } from "vue-router";

const { computedCornerMemoResults, resetCornerMemoResults } = useTraining();

const sub80percentResults = computed(() =>
  computedCornerMemoResults.value
    .filter((result) => result.ratio < 80)
    .slice(-20)
);

const router = useRouter();
function goBack() {
  router.go(-1);
}
</script>
