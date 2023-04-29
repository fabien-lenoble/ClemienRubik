<script setup lang="ts">
import { useScramble } from "@/composables/scramble";
import { useSeed } from "@/composables/seed";
import { useTimer } from "@/composables/timer";
import { useRouter } from "vue-router";
import CubeImage from "./CubeImage/index.vue";
import LastAverages from "./LastAverages/index.vue";
import ScrambleInfo from "./ScrambleInfo/index.vue";
import Timer from "./Timer.vue";
const { isTimerStarted } = useTimer();
const router = useRouter();
const { baseSessionSeed } = useSeed();
const { currentScrambleIndex, currentScramble } = useScramble();

function updateRouteScrambleIndex() {
  currentScrambleIndex.value++;
  router.push(
    `/scramble/${baseSessionSeed.value}/${currentScrambleIndex.value}`
  );
}
</script>

<template>
  <div class="flex flex-col gap-y-5 text-center py-2 md:py-5">
    <scramble-info
      v-if="!isTimerStarted"
      @update-route-scramble-index="updateRouteScrambleIndex"
    />
    <timer @update-route-scramble-index="updateRouteScrambleIndex" />
    <div class="flex gap-x-3 px-2 md:px-5" v-if="!isTimerStarted">
      <cube-image :scramble="currentScramble" />
      <div class="border-2 border-black rounded-md flex-grow">
        <last-averages />
      </div>
    </div>
  </div>
</template>
