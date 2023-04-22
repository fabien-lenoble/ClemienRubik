<script setup lang="ts">
import { computed } from "vue";
import Face from "./Face.vue";

import { useScramble } from "@/composables/scramble";

const { getScrambledImage, currentScramble } = useScramble();
const cube = computed(() => getScrambledImage(currentScramble.value));
</script>

<template>
  <div id="cube-image">
    <div id="line1" class="flex">
      <div class="basis-1/4 m-px md:m-0.5 lg:m-1"></div>
      <div class="basis-1/4">
        <face :face="cube[0]" :face-index="0" />
      </div>
      <div class="basis-1/4 m-px md:m-0.5 lg:m-1"></div>
      <div class="basis-1/4 m-px md:m-0.5 lg:m-1"></div>
    </div>

    <div id="line2" class="flex">
      <div v-for="n in 4" :key="n" class="basis-1/4">
        <face :face="cube[n]" :face-index="n" />
      </div>
    </div>

    <div id="line3" class="flex">
      <div class="basis-1/4 m-px md:m-0.5 lg:m-1"></div>
      <div class="basis-1/4">
        <face :face="cube[5]" :face-index="5" />
      </div>
      <div class="basis-1/4 m-px md:m-0.5 lg:m-1"></div>
      <div class="basis-1/4 m-px md:m-0.5 lg:m-1"></div>
    </div>
  </div>
</template>
