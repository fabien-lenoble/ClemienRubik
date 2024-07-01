<script setup lang="ts">
const links = [
  {
    text: "3BLD",
    to: "/training/3bld",
  },
  {
    text: "Pll Recognition",
    to: "/training/pll-recognition",
  },
];
</script>

<template>
  <div class="h-screen p-10 grid grid-cols-2 grid-rows-5 gap-4">
    <router-link
      v-for="(link, index) in links"
      :key="index"
      :to="link.to"
      class="rounded-lg flex justify-center items-center transition text-center"
      :class="'bg-tertiary text-my-text-secondary'"
    >
      <div class="text-xl font-semibold">{{ link.text }}</div>
    </router-link>
  </div>
</template>
