<script setup lang="ts">
import { useScramble } from "@/composables/scramble";
import { useSession } from "@/composables/session";
import { useRouter, useRoute } from "vue-router";
import SharePopup from "./SharePopup.vue";
import JoinPopup from "./JoinPopup.vue";
import { useShare } from "@/composables/share";
const { isShareModalOpen, isJoinModalOpen } = useShare();

const router = useRouter();
const route = useRoute();

const emit = defineEmits<{
  (e: "updateRouteScrambleIndex"): void;
}>();

const { stringifiedScramble, currentScramble } = useScramble();

function goToNextScramble() {
  useScramble().goToNextScramble();
  emit("updateRouteScrambleIndex");
}

function startNewSession() {
  useSession().startNewSession();
  router.push("/");
}

function share() {
  isShareModalOpen.value = true;
}
function join() {
  isJoinModalOpen.value = true;
}
</script>

<template>
  <div class="text-center">
    <div class="word-spacing text-xl md:text-2xl lg:text-3xl xl:text-4xl">
      {{ stringifiedScramble(currentScramble) }}
    </div>
    <div class="flex gap-5 text-my-text-secondary">
      <div class="basis-1/4">
        <button @click="goToNextScramble" @keydown.space.prevent type="button">
          scramble
        </button>
      </div>
      <div class="basis-1/4">
        <button @click="startNewSession" @keydown.space.prevent type="button">
          new session
        </button>
      </div>
      <div class="basis-1/4">
        <button @click="share" @keydown.space.prevent type="button">
          share
        </button>
      </div>
      <div class="basis-1/4">
        <button @click="join" @keydown.space.prevent type="button">join</button>
      </div>
      <share-popup v-if="isShareModalOpen"></share-popup>
      <join-popup v-if="isJoinModalOpen"></join-popup>
    </div>
  </div>
</template>

<style lang="scss">
.word-spacing {
  word-spacing: 5px;
}
</style>
