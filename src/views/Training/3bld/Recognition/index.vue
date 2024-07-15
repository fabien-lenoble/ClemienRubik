<template>
  <div class="flex flex-col h-full">
    <div class="grow self-center content-center">
      <cube-image-3d
        :sticker-size="50"
        :ufr-colors="currentUfrColors"
        class="w-[250px] min-h-[250px] m-auto"
        :revealed-sticker-colors="currentSelectedPiece"
        :revealed-sticker-values="currentSelectedStickerIndex"
        :hint-sticker-values="currentSelectedStickerIndex"
      />
    </div>
    <div>
      <answer-picker />
    </div>
    <div class="flex flex-wrap justify-center items-center pt-4 pb-12">
      <button
        @click="chooseNextSticker"
        :disabled="!isStickerSelected"
        class="w-full px-6 py-2 font-semibold rounded-lg shadow border-2 transition-colors duration-300"
        :class="{
          'border-green-500 bg-green-100': isStickerSelected,
          'text-my-text-secondary': !isStickerSelected,
          'text-black': isStickerSelected,
        }"
      >
        next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import CubeImage3d from "@/components/CubeImage3d.vue";
import AnswerPicker from "@/components/Training/3bld/Recognition/AnswerPicker.vue";
import { useTraining } from "@/composables/training";

const props = defineProps<{
  poolType: "edges" | "corners";
}>();

const {
  setPool,
  pickNewRandomSticker,
  chooseNextSticker,
  currentUfrColors,
  currentSelectedPiece,
  currentSelectedStickerIndex,
  isStickerSelected,
  // currentSelectedStickerValue
} = useTraining();

onMounted(() => {
  setPool(props.poolType);
  isStickerSelected.value = false;
  pickNewRandomSticker();

  // const res: Record<string, number> = {};
  // const n = 100000;
  // for (let i = 0; i < n; i++) {
  //   pickNewRandomSticker();
  //   res[currentSelectedStickerValue.value] =
  //     (res[currentSelectedStickerValue.value] || 0) + 1;
  // }
  // // log the percentage of each hint text
  // for (const key in res) {
  //   res[key] = (res[key] / n) * 100;
  // }
  // console.log(res);
});
</script>
