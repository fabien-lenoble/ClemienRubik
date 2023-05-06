<script setup lang="ts">
import AoNElement from "./AoNElement.vue";

defineProps<{
  selectedBestAoN: number;
}>();

const emit = defineEmits<{
  (e: "updateSelectedBestAoN", type: number): void;
}>();

function updateSelectedBestAoN(n: number) {
  emit("updateSelectedBestAoN", n);
}
</script>

<template>
  <div class="grid grid-cols-3 mt-auto justify-end text-center pb-12 gap-1">
    <ao-n-element
      :ao-n-value="1"
      :is-selected="selectedBestAoN === 1"
      @update-selected-best-ao-n="updateSelectedBestAoN($event)"
    >
      <img class="w-6 pr-1 left-1" src="../../assets/medal2_1.svg" />
    </ao-n-element>
    <ao-n-element
      :ao-n-value="5"
      :is-selected="selectedBestAoN === 5"
      @update-selected-best-ao-n="updateSelectedBestAoN($event)"
    >
      <img class="w-6 pr-1 left-1" src="../../assets/medal2_5.svg" />
    </ao-n-element>
    <ao-n-element
      :ao-n-value="12"
      :is-selected="selectedBestAoN === 12"
      @update-selected-best-ao-n="updateSelectedBestAoN($event)"
    >
      <img class="w-6 pr-1 left-1" src="../../assets/medal2_12.svg" />
    </ao-n-element>
    <ao-n-element
      :ao-n-value="0"
      :is-selected="selectedBestAoN === 0"
      @update-selected-best-ao-n="updateSelectedBestAoN($event)"
    >
      <img class="w-6 pr-1 left-1" src="../../assets/medal2_all.svg" />
    </ao-n-element>
  </div>
</template>
