<template>
  <div
    class="h-screen p-10 grid grid-cols-2 grid-rows-5 gap-4 font-semibold text-xs"
  >
    <router-link
      class="rounded-lg flex justify-center items-center transition text-center bg-tertiary text-my-text-secondary flex-wrap"
      to="/training/3bld/memo/corners"
    >
      <div class="self-center content-center h-20 text-xl">
        <div>KG</div>
        <div>=</div>
        <div>KanGaroo</div>
      </div>
      <div>3bld corners memo</div>
    </router-link>
    <router-link
      class="rounded-lg flex justify-center items-center transition text-center bg-tertiary text-my-text-secondary flex-wrap"
      to="/training/3bld/recognition/corners"
    >
      <div class="self-center content-center h-20">
        <corner-image current-sticker="K" :size="28" />
      </div>
      <div>3bld corners recognition</div>
    </router-link>
    <router-link
      class="rounded-lg flex justify-center items-center transition text-center bg-tertiary text-my-text-secondary flex-wrap"
      to="/training/pll-recognition/play"
    >
      <pll-recognition-cube-image
        :is-main-image="true"
        y-turn="y2"
        u-turn="U2"
        :current-pll-algorithm="pllCases[7].algorithm"
        :stickerSize="20"
        class="w-[100px] scale-75 h-20"
      />
      <div>PLL recognition</div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import CornerImage from "@/components/Training/3bld/Recognition/Corners/CornerImage.vue";
import PllRecognitionCubeImage from "@/components/Training/PllRecognition/CubeImage.vue";
import { pllCases } from "@/composables/training/constants";
</script>
