<script setup lang="ts">
import { onMounted } from "vue";
import QRCode from "qrcode";
import { useShare } from "@/composables/share";
const { shareUrl } = useShare();

onMounted(() => {
  const canvas = document.getElementById("canvas");
  QRCode.toCanvas(canvas, shareUrl.value, () => {});
});
</script>

<template>
  <div class="sm:flex sm:items-start">
    <div
      class="mx-auto flex h-12 w-12 items-center justify-center sm:mx-0 sm:h-10 sm:w-10"
    ></div>
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <div class="mt-2 w-fit mx-auto">
        <canvas id="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<style>
canvas {
  width: 200px !important;
  height: 200px !important;
}
</style>
