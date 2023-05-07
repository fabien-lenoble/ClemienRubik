<script setup lang="ts">
import { useSession } from "@/composables/session";
import { computed } from "vue";

const { validSessionSolves, bestAoNIndex, getAoN, mean } = useSession();

const props = defineProps<{
  isSelected: boolean;
  aoNValue: number;
}>();

const emit = defineEmits<{
  (e: "updateSelectedBestAoN", type: number): void;
}>();

function updateSelectedBestAoN(n: number) {
  if (getNSolvesFromIndex(n) || n === 0) {
    emit("updateSelectedBestAoN", n);
  }
}

function getNSolvesFromIndex(n: number) {
  const index = bestAoNIndex(n, n !== 1);
  return getAoN(
    validSessionSolves.value.slice(index, index + n),
    n,
    n !== 1,
    n === 1
  );
}

const text = computed(() => {
  switch (props.aoNValue) {
    case 0:
      return `Overall average (${validSessionSolves.value.length} solves)`;
    case 1:
      return "Personal best";
    default:
      return `Best average of ${props.aoNValue}`;
  }
});

const displayTime = computed(() =>
  props.aoNValue === 0 ? mean.value : getNSolvesFromIndex(props.aoNValue)
);
</script>

<template>
  <div
    class="flex-row flex relative border border-my-text-primary justify-center h-[32px] cursor-pointer items-center rounded-md py-0 text-[13px]"
    :class="{ 'order-first col-span-4': isSelected }"
    @click="updateSelectedBestAoN(aoNValue)"
  >
    <div :class="{ 'flex flex-grow justify-center': isSelected }">
      <p v-if="isSelected" class="pr-1">
        {{ text }}
      </p>
    </div>
    <div class="flex" :class="{ 'basis-1/3 justify-center': isSelected }">
      <slot />
      <p>
        {{ displayTime || "-" }}
      </p>
    </div>
  </div>
</template>
