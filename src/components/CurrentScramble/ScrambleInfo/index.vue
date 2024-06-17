<script setup lang="ts">
import { useScramble } from "@/composables/scramble";
import PlayWithFriendsPopup from "./PlayWithFriendsPopup.vue";
import { useShare } from "@/composables/share";
const { isShareModalOpen } = useShare();

const emit = defineEmits<{
  (e: "updateRouteScrambleIndex"): void;
}>();

const { stringifiedScramble, currentScramble } = useScramble();

function goToNextScramble() {
  useScramble().goToNextScramble();
  emit("updateRouteScrambleIndex");
}

function share() {
  isShareModalOpen.value = true;
}
</script>

<template>
  <div class="text-center">
    <div class="flex justify-between items-center gap-5">
      <div class="w-10/12 text-lg md:text-2xl lg:text-3xl xl:text-4xl">
        {{ stringifiedScramble(currentScramble) }}
      </div>
      <div class="w-2/12">
        <button
          @click="goToNextScramble"
          @keydown.space.prevent
          type="button"
          class="flex justify-end"
        >
          <img
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            src="../../../assets/scramble.png"
          />
        </button>
      </div>
    </div>
    <div class="flex gap-5 text-my-text-secondary basis-full">
      <div class="basis-full">
        <button @click="share" @keydown.space.prevent type="button">
          play with friends
        </button>
      </div>
      <play-with-friends-popup
        v-if="isShareModalOpen"
      ></play-with-friends-popup>
    </div>
  </div>
</template>

<style lang="scss">
.word-spacing {
  word-spacing: 5px;
}
</style>
