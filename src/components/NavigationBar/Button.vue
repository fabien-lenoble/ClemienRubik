<script setup lang="ts">
import { computed } from "vue";
import { Ripple, initTE } from "tw-elements";
import { useRoute, useRouter } from "vue-router";
initTE({ Ripple });
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
    class="w-1/2 inline-block rounded-l border-2 border-white px-6 py-[1px] text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out"
    :class="{
      'border-primary-700 active:text-primary-700': isActive,
    }"
    data-te-ripple-init
    data-te-ripple-color="light"
    @click="router.push(routePush)"
  >
    <slot />
  </button>
</template>
