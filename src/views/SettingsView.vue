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
  <div class="flex flex-col gap-y-2 h-72 text-lg">
    <settings-themes />
    <settings-toggles />
    <settings-timer-format />
    <settings-3-bld-training-select />
    <!-- <button @click="test">test</button> -->
  </div>
</template>
