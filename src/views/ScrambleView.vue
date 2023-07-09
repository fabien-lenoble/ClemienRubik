<script setup lang="ts">
import { onUpdated, onMounted } from "vue";
import { useSeed } from "@/composables/seed";
import { useScramble } from "@/composables/scramble";
import { useSession } from "@/composables/session";
import CurrentScramble from "@/components/CurrentScramble/index.vue";
import { useRoute, useRouter } from "vue-router";

const { initSeedValues } = useSeed();
const { initScrambleValues } = useScramble();
const { startNewSession } = useSession();
const route = useRoute();
const router = useRouter();

function init() {
  initSeedValues(route.params.seed as string);
  initScrambleValues();

  if (route.name === "join") {
    if (confirm("Do you wish to reset your session?")) {
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
