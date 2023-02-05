<script setup lang="ts">
import { computed } from "vue";
import Face from "./Face.vue";

import { useScramble } from "@/composables/scramble";

const { getScrambledImage, currentScramble } = useScramble();
const cube = computed(() => getScrambledImage(currentScramble.value));
</script>

<template>
  <div id="cube-image" class="container columns fit-content">
    <div id="line1" class="container">
      <div class="flex-3"></div>
      <div class="flex-3 face">
        <face :face="cube[0]" :face-index="0" />
      </div>
      <div class="flex-3"></div>
      <div class="flex-3"></div>
    </div>

    <div id="line2" class="container">
      <div v-for="n in 4" :key="n" class="flex-3 face">
        <face :face="cube[n]" :face-index="n" />
      </div>
    </div>

    <div id="line3" class="container">
      <div class="flex-3"></div>
      <div id="cube-face-5" class="flex-3 face">
        <face :face="cube[5]" :face-index="5" />
      </div>
      <div class="flex-3"></div>
      <div class="flex-3"></div>
    </div>
  </div>
</template>
<style lang="scss">
.face {
  padding: 2px;
}
</style>
