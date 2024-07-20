<template>
  <div class="flex flex-wrap gap-2">
    <cube-image-2d
      :scramble="[]"
      :revealed-stickers-values="
        Object.values({ ...cornerPositionIndexes, ...edgePositionIndexes })
      "
      :sticker-class="stickerClass"
      @click="goToLetterSchemeView"
    />
  </div>
</template>

<script setup lang="ts">
import CubeImage2d from "@/components/CubeImage2d/index.vue";
import constants from "@/constants";

import { useRouter } from "vue-router";
const router = useRouter();

const { cornerPositionIndexes, edgePositionIndexes } = constants;
const stickerClass = "w-4 h-4 text-[10px]";

function goToLetterSchemeView() {
  router.push(`/settings/letter-scheme`);
}
</script>
