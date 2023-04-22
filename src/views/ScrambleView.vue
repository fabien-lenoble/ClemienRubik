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
  initSeedValues(Number(route.params.seed));
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
  <main class="container mx-auto h-full">
    <div class="flex justify-center h-full">
      <current-scramble />
    </div>
  </main>
</template>
