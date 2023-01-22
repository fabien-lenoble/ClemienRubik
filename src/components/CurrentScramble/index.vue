<script setup lang="ts">
import CubeImage from "./CubeImage.vue";
import ScrambleInfo from "./ScrambleInfo.vue";
import Timer from "./Timer.vue";
</script>

<template>
  <div>
    <scramble-info />
    <timer />
    <cube-image />
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  justify-content: space-around;
}
.columns {
  flex-direction: column;
}
.column {
  flex: 50%;
}
</style>
