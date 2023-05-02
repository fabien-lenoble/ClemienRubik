<script setup lang="ts">
import NavigationButton from "@/components/NavigationBar/Button.vue";
</script>

<template>
  <div
    class="w-[calc(100%-32px)] left-4 m-0 inline-flex absolute bottom-8"
    role="group"
  >
    <navigation-button
      class="rounded-l"
      :route-push="'/'"
      :is-active-check="'scramble'"
      >rumix</navigation-button
    >
    <navigation-button
      class="rounded-r"
      :route-push="'/solves'"
      :is-active-check="'solves'"
      >solves</navigation-button
    >
  </div>
</template>
