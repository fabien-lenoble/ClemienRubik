<template>
  <div class="basis-1/3" v-for="type in letterTypes" :key="type">
    <button
      type="button"
      class="w-full inline-block border-2 py-[1px] text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out"
      :class="{
        'border-selected text-selected': selectedLetterType === type,
        'border-my-text-secondary text-my-text-secondary':
          selectedLetterType === 'custom',
      }"
      @click="selectedLetterType = type"
    >
      {{ type }}
    </button>
  </div>
  <div class="flex">
    <letter-presets-picker
      v-if="selectedLetterType === 'presets'"
      @select-preset="selectPreset"
    />
    <custom-picker v-else />
  </div>
</template>

<script setup lang="ts">
import CustomPicker from "@/components/Settings/3bldTraining/LetterScheme/LetterPicker/CustomPicker.vue";
import LetterPresetsPicker from "@/components/Settings/3bldTraining/LetterScheme/LetterPicker/LetterPresetsPicker.vue";
import type { StickerValue } from "@/composables/scramble/types";
import { useSettings } from "@/composables/settings";
import type { Settings } from "@/composables/settings/types";
import type {
  CornerPosition,
  EdgePosition,
} from "@/composables/training/types";
import { copyObj } from "@/helpers";
import { computed, ref } from "vue";
const { settings, computedLetterScheme, setLetterScheme } = useSettings();

const letterTypes: Array<"presets" | "custom"> = ["presets", "custom"];
const selectedLetterType = ref<"presets" | "custom">("presets");

const props = defineProps<{
  selectedFaceIndex: number;
  selectedType: "corner" | "edge";
}>();

const currentSelectedStickerPositions = computed(() => {
  return Object.entries(computedLetterScheme.value).filter(([_, value]) => {
    return (
      value.positionIndexes[0] === props.selectedFaceIndex &&
      value.type === props.selectedType
    );
  });
});

function removeValuesFromLetterScheme(stickerValues: StickerValue[]) {
  const letterSchemeCopy = copyObj(
    settings.value.blindfolded.letterScheme
  ) as Settings["blindfolded"]["letterScheme"];
  if (props.selectedType === "corner") {
    letterSchemeCopy.corners = Object.fromEntries(
      Object.entries(letterSchemeCopy.corners).map(
        ([stickerPosition, value]) => {
          if (stickerValues.includes(value)) {
            value = "" as StickerValue;
          }
          return [stickerPosition as CornerPosition, value];
        }
      )
    ) as Settings["blindfolded"]["letterScheme"]["corners"];
  } else {
    letterSchemeCopy.edges = Object.fromEntries(
      Object.entries(letterSchemeCopy.edges).map(([stickerPosition, value]) => {
        if (stickerValues.includes(value)) {
          value = "" as StickerValue;
        }
        return [stickerPosition as EdgePosition, value];
      })
    ) as Settings["blindfolded"]["letterScheme"]["edges"];
  }
  return letterSchemeCopy;
}

function selectPreset(preset: StickerValue[]) {
  const letterSchemeCopy = removeValuesFromLetterScheme(preset);
  currentSelectedStickerPositions.value.forEach(([stickerPosition], index) => {
    if (props.selectedType === "corner") {
      letterSchemeCopy.corners[stickerPosition as CornerPosition] =
        preset[index];
    } else {
      letterSchemeCopy.edges[stickerPosition as EdgePosition] = preset[index];
    }
  });

  setLetterScheme(letterSchemeCopy);
}
</script>
