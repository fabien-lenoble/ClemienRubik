<script setup lang="ts">
import NavigationButton from "@/components/NavigationBar/Button.vue";
</script>

<template>
  <div
    class="w-[calc(100%-32px)] left-4 m-0 inline-flex absolute bottom-8"
    role="group"
  >
    <navigation-button :route-push="'/'" :is-active-check="'scramble'"
      >lesgo</navigation-button
    >
    <navigation-button :route-push="'/solves'" :is-active-check="'solves'"
      >history</navigation-button
    >
  </div>
</template>
