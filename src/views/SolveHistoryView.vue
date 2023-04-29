<script setup lang="ts">
import { ref, computed } from "vue";
import { useSession } from "@/composables/session";
import { useRouter } from "vue-router";
import Solve from "@/components/SolveHistory/Solve.vue";
import CubeImage from "@/components/CurrentScramble/CubeImage/index.vue";

const { countingSessionSolves } = useSession();
const router = useRouter();

const currentSelectedSolveIndex = ref(0);

const reversedSolves = computed(() => {
  return [...countingSessionSolves.value].reverse();
});
const currentSelectedSolve = computed(
  () => reversedSolves.value?.[currentSelectedSolveIndex.value]
);

function goBack() {
  router.go(-1);
}
</script>

<template>
  <div>
    <button type="button" @click="goBack">back</button>
  </div>
  <div v-if="reversedSolves.length > 0">
    <div>
      #{{ currentSelectedSolveIndex }}
      {{ currentSelectedSolve.displayScramble }}
    </div>
    <div class="flex justify-between">
      <div class="flex text-4xl">
        {{ currentSelectedSolve.displayTime }}
      </div>
      <div class="flex">
        <cube-image :scramble="currentSelectedSolve.scramble" />
      </div>
    </div>
    <div class="grid grid-cols-3 py-8">
      <solve
        v-for="(solve, index) in reversedSolves"
        :key="index"
        :solve="solve"
        :index="index"
        :selected="index === currentSelectedSolveIndex"
        @update-selected-solve="currentSelectedSolveIndex = $event"
      />
    </div>
  </div>
</template>
