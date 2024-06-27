<script setup lang="ts">
import CurrentScramble from "@/components/CurrentScramble/index.vue";
import { useScramble } from "@/composables/scramble";
import { useSeed } from "@/composables/seed";
import { useSession } from "@/composables/session";
import { onMounted, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";

const { initSeedValues } = useSeed();
const { initScrambleValues } = useScramble();
const { startNewSession, sessionSolves } = useSession();
const route = useRoute();
const router = useRouter();

function init() {
  initSeedValues(route.params.seed as string);
  initScrambleValues(sessionSolves.value);

  if (route.name === "join") {
    if (confirm("Do you wish to reset your solve history?")) {
      startNewSession();
    }
    router.push(route.fullPath.replace("join", "scramble"));
  }
}

onMounted(() => init());
onUpdated(() => init());
</script>

<template>
  <current-scramble />
</template>
