<script setup lang="ts">
import Settings3BldTrainingSelect from "@/components/Settings/3BldTrainingSelect.vue";
import SettingsThemes from "@/components/Settings/Themes.vue";
import SettingsTimerFormat from "@/components/Settings/TimerFormat.vue";
import SettingsToggles from "@/components/Settings/Toggles.vue";
import { useScramble } from "@/composables/scramble";
const { testScramblesRandomness } = useScramble();

function test() {
  console.log(testScramblesRandomness());
}
</script>

<template>
  <div class="flex flex-col gap-y-6 h-full">
    <div>
      <p class="text-2xl">Appearance</p>
      <settings-themes />
    </div>
    <div>
      <p class="text-2xl">Solving</p>
      <settings-toggles />
      timer format
      <settings-timer-format />
    </div>
    <div>
      <p class="text-2xl">Training</p>
      <p class="text">Blindfolded</p>
      <settings-3-bld-training-select />
    </div>
    <!-- <button @click="test">test scramble randomness</button> -->
  </div>
</template>
