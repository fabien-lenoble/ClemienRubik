<script setup lang="ts">
import { useScramble } from "@/composables/scramble";
import { useShare } from "@/composables/share";
import PlayWithFriendsPopup from "./PlayWithFriendsPopup.vue";
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
      <div
        class="w-11/12 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
        @click="goToNextScramble"
      >
        {{ stringifiedScramble(currentScramble) }}
      </div>
      <div>
        <img
          @click="share"
          @keydown.space.prevent
          type="button"
          width="45"
          src="../../../assets/scramble.png"
        />
      </div>
    </div>
    <div class="flex gap-5 text-my-text-secondary basis-full">
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
