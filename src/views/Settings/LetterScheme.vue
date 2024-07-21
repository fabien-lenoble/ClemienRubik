<template>
  <div class="flex flex-wrap gap-3 justify-center">
    <cube-image-2d
      class="border-2 rounded-md p-4"
      :class="
        isLetterSchemeValid(settings.blindfolded.letterScheme)
          ? 'bg-green-500'
          : 'bg-red-500'
      "
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
      <face-picker
        :selected-face-index="selectedFaceIndex"
        @update:selected-face-index="selectedFaceIndex = $event"
      />
    </div>
    <div class="flex basis-full justify-center">
      <div class="flex gap-3">
        <button
          @click="rotateQuarterTurn"
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center text-sm"
        >
          <i class="fa-solid fa-rotate"></i>
        </button>
        <corners-or-edges-picker
          @update:selected-type="selectedType = $event"
          :selected-face-index="selectedFaceIndex"
          :selected-type="selectedType"
          :sticker-class="stickerClass"
        />
      </div>
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
import CornersOrEdgesPicker from "@/components/Settings/3bldTraining/LetterScheme/CornersOrEdgesPicker.vue";
import CustomPicker from "@/components/Settings/3bldTraining/LetterScheme/CustomPicker.vue";
import FacePicker from "@/components/Settings/3bldTraining/LetterScheme/FacePicker.vue";
import LetterPresetsPicker from "@/components/Settings/3bldTraining/LetterScheme/LetterPresetsPicker.vue";
import type { StickerValue } from "@/composables/scramble/types";
import { useSettings } from "@/composables/settings";
import type { Settings } from "@/composables/settings/types";
import type {
  CornerPosition,
  EdgePosition,
  PiecePosition,
} from "@/composables/training/types";
import constants from "@/constants";
import { copyObj } from "@/helpers";
import { computed, ref, type Ref } from "vue";
const { settings, computedLetterScheme, setLetterScheme, isLetterSchemeValid } =
  useSettings();

const { cornerPositionIndexes, edgePositionIndexes } = constants;

const selectedFaceIndex = ref(0);
const selectedType: Ref<"corner" | "edge"> = ref("corner");

const currentSelectedStickerPositions = computed(() => {
  return Object.entries(computedLetterScheme.value).filter(([_, value]) => {
    return (
      value.positionIndexes[0] === selectedFaceIndex.value &&
      value.type === selectedType.value
    );
  });
});

const stickerClass = "w-4 h-4 text-[10px]";

function removeValuesFromLetterScheme(stickerValues: StickerValue[]) {
  const letterSchemeCopy = copyObj(
    settings.value.blindfolded.letterScheme
  ) as Settings["blindfolded"]["letterScheme"];
  if (selectedType.value === "corner") {
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
    if (selectedType.value === "corner") {
      letterSchemeCopy.corners[stickerPosition as CornerPosition] =
        preset[index];
    } else {
      letterSchemeCopy.edges[stickerPosition as EdgePosition] = preset[index];
    }
  });

  setLetterScheme(letterSchemeCopy);
}

function rotateQuarterTurn() {
  const letterSchemeCopy = copyObj(
    settings.value.blindfolded.letterScheme
  ) as Settings["blindfolded"]["letterScheme"];
  const currentSelectedStickerPositionsCopy = copyObj(
    currentSelectedStickerPositions.value
  ) as [
    PiecePosition,
    {
      letter: StickerValue;
      positionIndexes: [number, number, number];
      type: "center" | "corner" | "edge";
    }
  ][];
  currentSelectedStickerPositions.value.forEach(([stickerPosition], index) => {
    if (selectedType.value === "corner") {
      letterSchemeCopy.corners[stickerPosition as CornerPosition] =
        currentSelectedStickerPositionsCopy[(index + 3) % 4][1].letter;
    } else {
      letterSchemeCopy.edges[stickerPosition as EdgePosition] =
        currentSelectedStickerPositionsCopy[(index + 3) % 4][1].letter;
    }
  });
  setLetterScheme(letterSchemeCopy);
}
</script>
