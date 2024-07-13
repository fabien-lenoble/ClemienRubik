<script setup lang="ts">
import CornerImage from "@/components/Training/3bld/Recognition/Corners/CornerImage.vue";
</script>

<template>
  <div class="h-screen p-10 grid grid-cols-2 grid-rows-5 gap-4">
    <router-link
      class="rounded-lg flex justify-center items-center transition text-center bg-tertiary text-my-text-secondary flex-wrap"
      to="/training/3bld/memo/corners"
    >
      <div class="self-center content-center h-20 text-xl">
        <div>KG</div>
        <div>=</div>
        <div>KanGaroo</div>
      </div>
      <div class="text-xs font-semibold">3bld corners memo</div>
    </router-link>
    <router-link
      class="rounded-lg flex justify-center items-center transition text-center bg-tertiary text-my-text-secondary flex-wrap"
      to="/training/3bld/recognition/corners"
    >
      <div class="self-center content-center h-20">
        <corner-image current-sticker="K" :size="28" />
      </div>
      <div class="text-xs font-semibold">3bld corners recognition</div>
    </router-link>
    <router-link
      class="rounded-lg flex justify-center items-center transition text-center bg-tertiary text-my-text-secondary flex-wrap"
      to="/training/pll-recognition/play"
    >
      <div class="self-center content-center">
        <img width="80" src="../assets/pll-recognition.png" />
      </div>
      <div class="text-xs font-semibold">PLL recognition</div>
    </router-link>
  </div>
</template>
