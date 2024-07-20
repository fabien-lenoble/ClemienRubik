<template>
  <div class="flex flex-wrap gap-3 justify-center">
    <cube-image-2d
      :scramble="[]"
      :revealed-stickers-values="
        Object.values({
          ...cornerPositionIndexes,
          ...edgePositionIndexes,
        })
      "
      :sticker-class="stickerClass"
    />
    <div class="flex content-center justify-center gap-2 basis-full">
      <sticker
        v-for="(cornerPosition, index) in stickers"
        :key="cornerPosition"
        :sticker-position="cornerPosition"
        sticker-type="corner"
        class="opacity-20"
        :class="{ 'opacity-100': index === selectedFaceIndex }"
        @click="selectedFaceIndex = index"
      />
    </div>
    <div class="flex basis-full justify-center">
      <corners-or-edges-picker
        @update:selected-type="selectedType = $event"
        :selected-face-index="selectedFaceIndex"
        :selected-type="selectedType"
        :sticker-class="stickerClass"
      />
    </div>
    <div class="basis-full">letter presets</div>
    <div class="flex">
      <letter-presets-picker @select-preset="selectPreset" />
    </div>
    <hr class="w-full" />
    <div class="basis-full">custom letters</div>
    <div class="flex">
      <custom-picker />
    </div>
  </div>
</template>

<script setup lang="ts">
import CubeImage2d from "@/components/CubeImage2d/index.vue";
import Sticker from "@/components/PickerSticker.vue";
import CornersOrEdgesPicker from "@/components/Settings/3bldTraining/LetterScheme/CornersOrEdgesPicker.vue";
import CustomPicker from "@/components/Settings/3bldTraining/LetterScheme/CustomPicker.vue";
import LetterPresetsPicker from "@/components/Settings/3bldTraining/LetterScheme/LetterPresetsPicker.vue";
import type { StickerValue } from "@/composables/scramble/types";
import { useSettings } from "@/composables/settings";
import type {
  CornerPosition,
  EdgePosition,
} from "@/composables/training/types";
import constants from "@/constants";
import { copyObj } from "@/helpers";
import { computed, ref, type Ref } from "vue";
const { settings, computedLetterScheme, setLetterScheme } = useSettings();

const { cornerPositionIndexes, edgePositionIndexes } = constants;
const stickers: CornerPosition[] = ["ULB", "LBU", "FLU", "RFU", "BRU", "DLF"];

const selectedFaceIndex = ref(0);
const selectedType: Ref<"corner" | "edge"> = ref("corner");

const currentSelectedStickerPositions = computed(() => {
  return Object.entries(computedLetterScheme.value).filter(
    ([stickerPosition, value]) => {
      return (
        value.position[0] === selectedFaceIndex.value &&
        value.type === selectedType.value
      );
    }
  );
});

const stickerClass = "w-4 h-4 text-[10px]";

function selectPreset(preset: StickerValue[]) {
  const letterSchemeCopy = copyObj(settings.value.letterScheme);
  console.log(currentSelectedStickerPositions.value);
  if (selectedType.value === "corner") {
    letterSchemeCopy.corners = Object.fromEntries(
      Object.entries(letterSchemeCopy.corners).map(
        ([stickerPosition, value]) => {
          console.log(value);

          if (preset.includes(value)) {
            value = "";
          }
          return [stickerPosition as CornerPosition, value];
        }
      )
    );
  } else {
    letterSchemeCopy.edges = Object.fromEntries(
      Object.entries(letterSchemeCopy.edges).map(([stickerPosition, value]) => {
        if (preset.includes(value.letter)) {
          value.letter = "";
        }
        return [stickerPosition as CornerPosition, value];
      })
    );
  }
  currentSelectedStickerPositions.value.forEach(
    ([stickerPosition, value], index) => {
      if (selectedType.value === "corner") {
        letterSchemeCopy.corners[stickerPosition as CornerPosition] =
          preset[index];
      } else {
        letterSchemeCopy.edges[stickerPosition as EdgePosition] = preset[index];
      }
    }
  );

  setLetterScheme(letterSchemeCopy);
  console.log(letterSchemeCopy);
  console.log(preset, computedLetterScheme.value);
}
</script>
