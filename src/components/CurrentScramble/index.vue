<script setup lang="ts">
import CubeImage from "./CubeImage.vue";
import ScrambleInfo from "./ScrambleInfo.vue";
</script>

<template>
  <div>
    <scramble-info />
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
