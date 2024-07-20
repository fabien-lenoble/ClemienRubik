<template>
  <div
    class="h-screen p-10 grid grid-cols-2 grid-rows-5 gap-4 font-semibold text-xs"
  >
    <router-link
      class="rounded-lg flex justify-center items-center transition text-center bg-tertiary text-my-text-secondary flex-wrap"
      to="/training/3bld/recognition/edges"
    >
      <cube-image-3d
        :sticker-size="20"
        ufr-colors="GRW"
        class="w-[100px] scale-75 h-20"
        :revealed-sticker-colors="[
          [0, 2, 1],
          [2, 0, 1],
        ]"
        :hint-stickers-values="[[2, 0, 1]]"
        :revealed-stickers-values="[[2, 0, 1]]"
      />
      <div>3bld edges recognition</div> </router-link
    ><router-link
      class="rounded-lg flex justify-center items-center transition text-center bg-tertiary text-my-text-secondary flex-wrap"
      to="/training/3bld/recognition/corners"
    >
      <cube-image-3d
        :sticker-size="20"
        ufr-colors="RBW"
        class="w-[100px] scale-75 h-20"
        :revealed-sticker-colors="[
          [0, 2, 2],
          [2, 0, 2],
          [3, 0, 0],
        ]"
        :hint-stickers-values="[[2, 0, 2]]"
        :revealed-stickers-values="[[2, 0, 2]]"
      />
      <div>3bld corners recognition</div>
    </router-link>
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
      to="/training/pll-recognition/play"
    >
      <cube-image-3d
        y-turn="y2"
        u-turn="U2"
        :case="pllCases[7].algorithm"
        :stickerSize="20"
        ufr-colors="YBR"
        class="w-[100px] scale-75 h-20"
      />
      <div>PLL recognition</div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import CubeImage3d from "@/components/CubeImage3d.vue";
import constants from "@/constants";
const { pllCases } = constants;
</script>
