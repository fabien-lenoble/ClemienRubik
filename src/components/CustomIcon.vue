<script setup lang="ts">
defineProps<{
  src: string;
}>();
</script>

<template>
  <img
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    :src="src"
  />
</template>
