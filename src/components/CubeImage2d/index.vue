<script setup lang="ts">
import { computed } from "vue";
import Face from "./Face.vue";

import { useScramble } from "@/composables/scramble";
import type { Scramble } from "@/composables/scramble/types";

const props = defineProps<{
  scramble: Scramble;
  revealedStickersValues?: [number, number, number][];
  stickerClass?: string;
}>();

const { getScrambledImage } = useScramble();
const cube = computed(() => getScrambledImage(props.scramble));
</script>

<template>
  <div id="cube-image" class="flex">
    <div class="shrink">
      <div id="line1" class="flex">
        <div class="basis-1/4 m-px md:m-0.5 lg:m-1"></div>
        <div class="basis-1/4">
          <face
            :face="cube[0]"
            :face-index="0"
            :revealed-stickers-values="revealedStickersValues"
            :sticker-class="stickerClass"
          />
        </div>
        <div class="basis-1/4 m-px md:m-0.5 lg:m-1"></div>
        <div class="basis-1/4 m-px md:m-0.5 lg:m-1"></div>
      </div>

      <div id="line2" class="flex">
        <div v-for="n in 4" :key="n" class="basis-1/4">
          <face
            :face="cube[n]"
            :face-index="n"
            :revealed-stickers-values="revealedStickersValues"
            :sticker-class="stickerClass"
          />
        </div>
      </div>

      <div id="line3" class="flex">
        <div class="basis-1/4 m-px md:m-0.5 lg:m-1"></div>
        <div class="basis-1/4">
          <face
            :face="cube[5]"
            :face-index="5"
            :revealed-stickers-values="revealedStickersValues"
            :sticker-class="stickerClass"
          />
        </div>
        <div class="basis-1/4 m-px md:m-0.5 lg:m-1"></div>
        <div class="basis-1/4 m-px md:m-0.5 lg:m-1"></div>
      </div>
    </div>
  </div>
</template>
