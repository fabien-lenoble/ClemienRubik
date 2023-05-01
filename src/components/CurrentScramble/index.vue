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

function goToSolves() {
  router.push("/solves");
}
</script>

<template>
  <scramble-info
    v-if="!isTimerStarted"
    @update-route-scramble-index="updateRouteScrambleIndex"
  />
  <timer
    :class="{ 'pt-12': !isTimerStarted }"
    @update-route-scramble-index="updateRouteScrambleIndex"
  />
  <div class="flex gap-x-3 md:px-3 pb-12" v-if="!isTimerStarted">
    <cube-image :scramble="currentScramble" />
    <div class="flex-grow text-center" @click="goToSolves">
      <last-averages />
    </div>
  </div>
</template>
