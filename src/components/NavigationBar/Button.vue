<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const isActive = computed(() => {
  return props.isActiveCheck === route.name;
});

const props = defineProps<{
  routePush: string;
  isActiveCheck: string;
}>();
</script>
<template>
  <button
    type="button"
    class="w-1/2 inline-block border-2 px-6 py-[1px] text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out"
    :class="{
      'border-selected text-selected': isActive,
      'border-my-text-secondary text-my-text-secondary': !isActive,
    }"
    @click="router.push(routePush)"
  >
    <slot />
  </button>
</template>
