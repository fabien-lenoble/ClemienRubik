<script setup lang="ts">
import { Ripple, initTE } from "tw-elements";
import { useRoute, useRouter } from "vue-router";
initTE({ Ripple });
const route = useRoute();
const router = useRouter();

function isActive(name: string) {
  return name === route.name;
}
</script>

<template>
  <div class="w-[calc(100%-52px)] inline-flex absolute bottom-8" role="group">
    <button
      type="button"
      class="w-1/2 inline-block rounded-l border-2 border-white px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out"
      :class="{
        'border-primary-700 active:text-primary-700 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10':
          isActive('scramble'),
      }"
      data-te-ripple-init
      data-te-ripple-color="light"
      @click="router.push('/')"
    >
      lesgo
    </button>
    <button
      type="button"
      class="w-1/2 -ml-0.5 inline-block rounded-r border-2 border-white px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out"
      :class="{
        'border-primary-700 active:text-primary-700 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10':
          isActive('solves'),
      }"
      data-te-ripple-init
      data-te-ripple-color="light"
      @click="router.push('/solves')"
    >
      solves
    </button>
  </div>
</template>

<style lang="scss">
// .active {
//     back
// }
</style>
