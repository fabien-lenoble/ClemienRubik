<template>
  <div class="flex gap-3">
    <face
      :face="cube[selectedFaceIndex]"
      :face-index="selectedFaceIndex"
      :revealed-stickers-values="Object.values(cornerPositionIndexes)"
      :sticker-class="stickerClass"
      class="opacity-20"
      :class="{ 'opacity-100': selectedType === 'corner' }"
      @click="$emit('update:selectedType', 'corner')"
    />
    <face
      :face="cube[selectedFaceIndex]"
      :face-index="selectedFaceIndex"
      :revealed-stickers-values="Object.values(edgePositionIndexes)"
      :sticker-class="stickerClass"
      class="opacity-20"
      :class="{ ' opacity-100': selectedType === 'edge' }"
      @click="$emit('update:selectedType', 'edge')"
    />
  </div>
</template>

<script setup lang="ts">
import Face from "@/components/CubeImage2d/Face.vue";
import { useScramble } from "@/composables/scramble";
import constants from "@/constants";
import { ref } from "vue";

const { solvedImageArray } = useScramble();
const cube = ref(solvedImageArray());

const { cornerPositionIndexes, edgePositionIndexes } = constants;

defineProps<{
  selectedFaceIndex: number;
  selectedType: "corner" | "edge";
  stickerClass: string;
}>();

defineEmits(["update:selectedType"]);
</script>
