<script setup lang="ts">
import { useScramble } from "@/composables/scramble";
import { useSession } from "@/composables/session";
import { useRouter } from "vue-router";

const router = useRouter();

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
</script>

<template>
  <div class="text-center px-3">
    <div class="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
      {{ stringifiedScramble(currentScramble) }}
    </div>
    <div class="flex gap-5">
      <div class="basis-1/2 text-end">
        <button @click="goToNextScramble" @keydown.space.prevent>
          scramble
        </button>
      </div>
      <div class="basis-1/2 text-start">
        <button @click="startNewSession" @keydown.space.prevent>
          new session
        </button>
      </div>
    </div>
  </div>
</template>
