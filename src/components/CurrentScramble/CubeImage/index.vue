<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import type { FaceInitial } from "@/composables/scramble/types";
import Face from "./Face.vue";

const solvedImageArray: Ref<FaceInitial[][][]> = ref([
  [
    ["U", "U", "U"],
    ["U", "U", "U"],
    ["U", "U", "U"],
  ],
  [
    ["L", "L", "L"],
    ["L", "L", "L"],
    ["L", "L", "L"],
  ],
  [
    ["F", "F", "F"],
    ["F", "F", "F"],
    ["F", "F", "F"],
  ],
  [
    ["R", "R", "R"],
    ["R", "R", "R"],
    ["R", "R", "R"],
  ],
  [
    ["B", "B", "B"],
    ["B", "B", "B"],
    ["B", "B", "B"],
  ],
  [
    ["D", "D", "D"],
    ["D", "D", "D"],
    ["D", "D", "D"],
  ],
] as FaceInitial[][][]);
</script>

<template>
  <div id="cube-image" class="container columns fit-content">
    <div id="line1" class="container">
      <div class="flex-3"></div>
      <div class="flex-3">
        <face :face="solvedImageArray[0]" :face-index="0" />
      </div>
      <div class="flex-3"></div>
      <div class="flex-3"></div>
    </div>

    <div id="line2" class="container">
      <div v-for="n in 4" :key="n" class="flex-3">
        <face :face="solvedImageArray[n]" :face-index="n" />
      </div>
    </div>

    <div id="line3" class="container">
      <div class="flex-3"></div>
      <div id="cube-face-5" class="flex-3">
        <face :face="solvedImageArray[5]" :face-index="5" />
      </div>
      <div class="flex-3"></div>
      <div class="flex-3"></div>
    </div>
  </div>
</template>
