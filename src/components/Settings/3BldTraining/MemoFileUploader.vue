<template>
  <div class="pt-2 flex items-center gap-2">
    <button
      @click="import3BldCornerPairs"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded transition duration-150 ease-in-out transform"
    >
      <i class="fa-solid fa-upload"></i>
      Update Memo File
    </button>
    <div class="relative flex items-center">
      <span
        class="cursor-pointer text-gray-500 hover:text-gray-700"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false"
      >
        <!-- Font Awesome Information Icon -->
        <i class="fas fa-info-circle h-6 w-6"></i>
      </span>
      <div
        v-if="showTooltip"
        class="absolute bottom-full mb-2 w-48 p-2 bg-gray-700 text-white text-sm rounded shadow-lg"
      >
        Make sure your file is in .csv format before uploading (format
        "key,value").
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import { ref } from "vue";

const { import3BldCornerPairs } = useSettings();
const showTooltip = ref(false);
</script>
