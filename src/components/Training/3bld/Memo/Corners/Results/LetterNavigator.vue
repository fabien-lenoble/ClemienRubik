<template>
  <div
    v-for="letter in alphabet"
    :key="letter"
    :class="{
      'text-blue-500 bg-slate-100 transition duration-150 ease-in-out':
        currentVisibleLetter === letter,
    }"
    class="flex justify-center basis-full text-xs items-center"
    @click="clickLetter(letter)"
  >
    {{ letter }}
  </div>
</template>
<script setup lang="ts">
import { useTraining } from "@/composables/training";
import { nextTick, onMounted, ref, watch } from "vue";

const emit = defineEmits(["clickLetter"]);
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const currentVisibleLetter = ref<string | null>(null);
const { displayedCornerResults } = useTraining();

function clickLetter(letter: string) {
  emit("clickLetter", letter);
}

let observer: IntersectionObserver;

onMounted(() => {
  initObserver();
});

watch(displayedCornerResults, () => {
  if (observer) {
    observer.disconnect();
  }
  nextTick(() => {
    initObserver();
  });
});

function initObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentVisibleLetter.value = entry.target.id;
        }
      });
    },
    { threshold: 0.5 }
  );

  alphabet.forEach((letter) => {
    const element = document.getElementById(letter);
    if (element) {
      observer.observe(element);
    }
  });
}
</script>
