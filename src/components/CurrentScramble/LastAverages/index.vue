<script setup lang="ts">
import { useSession } from "@/composables/session";

const { lastAo5, lastAo12, mean, getPersonalBest } = useSession();
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex h-full">
      <div class="basis-full self-center">
        <div class="text-xs">Ao5</div>
        <div class="">{{ lastAo5 || "-" }}</div>
      </div>
      <div class="basis-full self-center">
        <div class="text-xs">Ao12</div>
        <div class="">{{ lastAo12 || "-" }}</div>
      </div>
    </div>
    <div class="flex h-full">
      <div class="basis-full self-center">
        <div class="text-xs">Best</div>
        <div class="">{{ getPersonalBest?.displayTime || "-" }}</div>
      </div>
      <div class="basis-full self-center">
        <div class="text-xs">Average</div>
        <div class="">{{ mean || "-" }}</div>
      </div>
    </div>
  </div>
</template>
