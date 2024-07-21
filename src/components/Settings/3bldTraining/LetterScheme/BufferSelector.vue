<template>
  <div class="flex flex-wrap basis-full">
    <div class="basis-1/2 flex gap-2">
      <div class="my-auto">Edge buffer</div>
      <div
        class="cursor-pointer text-center p-1 border-2 rounded-lg border-gray-300 text-my-text-secondary"
      >
        {{ edgeBuffer }}
      </div>
    </div>
    <div class="basis-1/2 flex gap-2">
      <div class="my-auto">Corner buffer</div>
      <div
        class="cursor-pointer text-center p-1 border-2 rounded-lg border-gray-300 text-my-text-secondary"
      >
        {{ cornerBuffer }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSettings } from "@/composables/settings";
const { settings } = useSettings();

const edgeBuffer = settings.value.blindfolded.edgeBuffer;
const cornerBuffer = settings.value.blindfolded.cornerBuffer;
</script>
