<script setup lang="ts">
import SettingsThemes from "@/components/Settings/Themes.vue";
import SettingsToggles from "@/components/Settings/Toggles.vue";
import SettingsTimerFormat from "@/components/Settings/TimerFormat.vue";
import { useScramble } from "@/composables/scramble";
const { testScramblesRandomness } = useScramble();

function test() {
  console.log(testScramblesRandomness());
}
</script>

<template>
  <div class="flex flex-col gap-y-2 h-48 text-lg">
    <settings-themes />
    <settings-toggles />
    <settings-timer-format />
    <!-- <button @click="test">test</button> -->
  </div>
</template>
