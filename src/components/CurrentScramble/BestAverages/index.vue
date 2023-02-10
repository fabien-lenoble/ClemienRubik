<script setup lang="ts"></script>

<template>
  <div class="flex h-full items-center">
    <div class="basis-full">
      <div v-for="n in 2" :key="n" class="flex flex-col basis-full">
        <div class="basis-full">AO5</div>
        <div class="basis-full">1:30.234</div>
      </div>
    </div>
    <div class="basis-full">
      <div v-for="n in 2" :key="n" class="flex flex-col basis-full">
        <div class="basis-full">AO5</div>
        <div class="basis-full">1:30.234</div>
      </div>
    </div>
  </div>
</template>
