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
import { onMounted, ref } from "vue";

const emit = defineEmits(["clickLetter"]);
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const currentVisibleLetter = ref<string | null>(null);

const { displayedCornerResults } = useTraining();

function clickLetter(letter: string) {
  emit("clickLetter", letter);
}

// TODO: fix letter highlight on scroll when displayedCornerResults changes
// because I unselect some thresholds
// watch(
//   () => displayedCornerResults,
//   () => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             currentVisibleLetter.value = entry.target.id;
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     alphabet.forEach((letter) => {
//       const element = document.getElementById(letter);
//       if (element) {
//         observer.observe(element);
//       }
//     });
//   }
// );

onMounted(() => {
  const observer = new IntersectionObserver(
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
});
</script>
