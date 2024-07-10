<script setup lang="ts">
import Settings3bldTrainingMemoFileUploader from "@/components/Settings/3bldTraining/MemoFileUploader.vue";
import Settings3bldTrainingSelect from "@/components/Settings/3bldTraining/Select.vue";
import SettingsFooter from "@/components/Settings/Footer.vue";
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
      <settings-3bld-training-select />
      <settings-3bld-training-memo-file-uploader />
    </div>
    <div class="grow"></div>
    <div class="pb-12 text-xs">
      <settings-footer />
    </div>
    <!-- <button @click="test">test scramble randomness</button> -->
  </div>
</template>
