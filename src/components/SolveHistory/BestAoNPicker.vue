<script setup lang="ts">
const emit = defineEmits<{
  (e: "updateSelectedBestAoN", type: number): void;
}>();

function updateSelectedBestAoN(type: number) {
  emit("updateSelectedBestAoN", type);
}
</script>

<template>
  <button class="flex basis-1/4" @click="updateSelectedBestAoN(0)">All</button>
  <button class="flex basis-1/4" @click="updateSelectedBestAoN(1)">
    Personal best
  </button>
  <button class="flex basis-1/4" @click="updateSelectedBestAoN(5)">
    Best of 5
  </button>
  <button class="flex basis-1/4" @click="updateSelectedBestAoN(12)">
    Best of 12
  </button>
</template>
