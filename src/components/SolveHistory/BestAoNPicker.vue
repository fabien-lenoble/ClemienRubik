<script setup lang="ts">
import { useSession } from "@/composables/session";

const { validSessionSolves, bestAoNIndex, mean, getAoN } = useSession();

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
  return getAoN(validSessionSolves.value.slice(index, index + n), n, n !== 1);
}
</script>

<template>
  <div class="flex flex-col mt-auto justify-end">
    <div class="flex flex-col text-center pb-12">
      <div class="flex">
        <div
          class="basis-full relative mr-1 mb-1 justify-center flex h-[32px] cursor-pointer items-center rounded-md border px-[12px] py-0 text-[13px]"
          @click="updateSelectedBestAoN(5)"
        >
          <div class="text-xs">Best Ao5</div>
          <div class="">{{ getNSolvesFromIndex(5) || "-" }}</div>
        </div>
        <div
          class="basis-full relative ml-1 mb-1 justify-center flex h-[32px] cursor-pointer items-center rounded-md border px-[12px] py-0 text-[13px]"
          @click="updateSelectedBestAoN(12)"
        >
          <div class="text-xs">Best Ao12</div>
          <div class="">{{ getNSolvesFromIndex(12) || "-" }}</div>
        </div>
      </div>
      <div class="flex h-full">
        <div
          class="basis-full relative mr-1 justify-center flex h-[32px] cursor-pointer items-center rounded-md border px-[12px] py-0 text-[13px]"
          @click="updateSelectedBestAoN(1)"
        >
          <div class="text-xs">Personal Best</div>
          <div class="">{{ getNSolvesFromIndex(1) || "-" }}</div>
        </div>
        <div
          class="basis-full relative ml-1 justify-center flex h-[32px] cursor-pointer items-center rounded-md border px-[12px] py-0 text-[13px]"
          @click="updateSelectedBestAoN(0)"
        >
          <div class="text-xs">Mean</div>
          <div class="">{{ mean || "-" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
