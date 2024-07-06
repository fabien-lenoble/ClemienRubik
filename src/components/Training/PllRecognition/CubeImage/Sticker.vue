<template>
  <div
    :class="props.sticker"
    class="sticker w-6 h-6 md:w-4 md:h-4 xl:w-6 xl:h-6 border border-black text-black"
  ></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  sticker: string;
}>();
</script>

<style lang="scss">
.sticker {
  &.R {
    background-color: #b71234;
  }
  &.G {
    background-color: #009b48;
  }
  &.O {
    background-color: #ff5800;
  }
  &.B {
    background-color: #0046ad;
  }
  &.Y {
    background-color: #ffd500;
  }
}
</style>
