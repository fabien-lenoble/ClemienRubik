<script setup lang="ts">
import CubeImage from "@/components/CubeImage/index.vue";
import { useScramble } from "@/composables/scramble";
import { useSeed } from "@/composables/seed";
import { useSettings } from "@/composables/settings";
import { useTimer } from "@/composables/timer";
import { computed } from "vue";
import { useRouter } from "vue-router";
import LastAverages from "./LastAverages/index.vue";
import ScrambleInfo from "./ScrambleInfo/index.vue";
import Timer from "./Timer.vue";

const { isTimerStarted } = useTimer();
const router = useRouter();
const { baseSessionSeed } = useSeed();
const {
  currentScrambleIndex,
  currentScramble,
  generateMemo,
  getScrambledImage,
} = useScramble();

const blindMemo = computed(() =>
  generateMemo(getScrambledImage(currentScramble.value))
);

const blindfoldedMode = useSettings().settings.value.blindfoldedMode;

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
    class="z-[2]"
    v-if="!isTimerStarted"
    @update-route-scramble-index="updateRouteScrambleIndex"
  />
  <div class="flex-grow"></div>
  <div
    v-if="blindfoldedMode"
    class="z-[1] relative"
    :class="{
      'text-[10px]': !isTimerStarted,
      'bottom-[40px] left-[20px] text-[20px]': isTimerStarted,
    }"
  >
    Edges: {{ blindMemo.edgesMemo }}
    <br />
    Corners: {{ blindMemo.cornerMemo }}
  </div>
  <div class="z-[1] flex gap-x-3 md:px-3 pb-12" v-if="!isTimerStarted">
    <cube-image :scramble="currentScramble" />
    <div class="flex-grow text-center" @click="goToSolves">
      <last-averages />
    </div>
  </div>
  <timer
    class="z-0 absolute content-center text-center"
    :class="{
      'h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)]': !isTimerStarted,
      'h-[100%] w-[100%]': isTimerStarted,
    }"
    @update-route-scramble-index="updateRouteScrambleIndex"
  />
</template>
