<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const isActive = computed(() => {
  return (route?.name as string)?.includes(props.isActiveCheck);
});

const props = defineProps<{
  routePush: string;
  isActiveCheck: string;
}>();
</script>
<template>
  <button
    type="button"
    class="w-full inline-block border-2 py-[1px] text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out"
    :class="{
      'border-selected text-selected': isActive,
      'border-my-text-secondary text-my-text-secondary': !isActive,
    }"
    @click="router.push(routePush)"
  >
    <slot />
  </button>
</template>
