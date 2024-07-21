<template>
  <div class="flex gap-3">
    <face
      :face="cube[selectedFaceIndex]"
      :face-index="selectedFaceIndex"
      :revealed-stickers-values="Object.values(cornerPositionIndexes)"
      :sticker-class="stickerClass"
      class="border-2 rounded-md p-2"
      :class="{
        'opacity-100': selectedType === 'corner',
        'opacity-20': selectedType === 'edge',
        'bg-green-500': isFaceValid('corner'),
        'bg-red-500': !isFaceValid('corner'),
      }"
      @click="$emit('update:selectedType', 'corner')"
    />
    <face
      :face="cube[selectedFaceIndex]"
      :face-index="selectedFaceIndex"
      :revealed-stickers-values="Object.values(edgePositionIndexes)"
      :sticker-class="stickerClass"
      class="border-2 rounded-md p-2"
      :class="{
        'opacity-100': selectedType === 'edge',
        'opacity-20': selectedType === 'corner',
        'bg-green-500': isFaceValid('edge'),
        'bg-red-500': !isFaceValid('edge'),
      }"
      @click="$emit('update:selectedType', 'edge')"
    />
  </div>
</template>

<script setup lang="ts">
import Face from "@/components/CubeImage2d/Face.vue";
import { useScramble } from "@/composables/scramble";
import { useSettings } from "@/composables/settings";
import constants from "@/constants";
import { ref } from "vue";
const { computedLetterScheme } = useSettings();

const { solvedImageArray } = useScramble();
const cube = ref(solvedImageArray());

const { cornerPositionIndexes, edgePositionIndexes } = constants;

const props = defineProps<{
  selectedFaceIndex: number;
  selectedType: "corner" | "edge";
  stickerClass: string;
}>();

function isFaceValid(type: "corner" | "edge") {
  const letterScheme = computedLetterScheme.value;
  const faceCenter = cube.value[props.selectedFaceIndex][1][1];

  const faceStickers = Object.entries(letterScheme).filter(
    ([key, value]) => key[0] === faceCenter && value.type === type
  );
  return faceStickers.every(([_, value]) => !!value.letter);
}

defineEmits(["update:selectedType"]);
</script>
