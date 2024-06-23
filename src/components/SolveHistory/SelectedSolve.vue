<script setup lang="ts">
import CubeImage from "@/components/CurrentScramble/CubeImage/index.vue";
import { useScramble } from "@/composables/scramble";
import { useSession } from "@/composables/session";
import type { SavedSolve } from "@/composables/session/types";
import { useSettings } from "@/composables/settings";
import { computed } from "vue";
const { updateSolveState } = useSession();
const props = defineProps<{
  solve: SavedSolve;
}>();
const { generateMemo, getScrambledImage } = useScramble();
const blindfoldedMode = useSettings().settings.value.blindfoldedMode;

const blindMemo = computed(() =>
  generateMemo(getScrambledImage(props.solve.scramble))
);
</script>

<template>
  <div>
    {{ solve.displayScramble }}
  </div>
  <div
    class="grid grid-rows-2 grid-flow-col gap-3 mb-2 top-element justify-between"
  >
    <div class="row-span-1 col-span-2 text-2xl">
      {{ solve.displayTime }}
    </div>
    <div v-if="blindfoldedMode" class="text-[8px]">
      <div>Edges: {{ blindMemo.edgesMemo }}</div>
      <div>Corners: {{ blindMemo.cornerMemo }}</div>
    </div>
    <div class="row-span-1 col-span-2 gap-x-1 grid grid-cols-3">
      <button
        class="col-span-1 justify-center border-2 rounded-md"
        :class="{
          'border-selected text-selected': props.solve.state === 'solved',
          'border-my-text-secondary text-my-text-secondary':
            props.solve.state !== 'solved',
        }"
        @click="updateSolveState(props.solve.index, 'solved')"
      >
        OK
      </button>
      <button
        class="col-span-1 justify-center border-2 rounded-md"
        :class="{
          'border-selected text-selected': props.solve.state === 'DNF',
          'border-my-text-secondary text-my-text-secondary':
            props.solve.state !== 'DNF',
        }"
        @click="updateSolveState(props.solve.index, 'DNF')"
      >
        DNF
      </button>
      <button
        class="col-span-1 justify-center border-2 rounded-md"
        :class="{
          'border-selected text-selected': props.solve.state === '+2',
          'border-my-text-secondary text-my-text-secondary':
            props.solve.state !== '+2',
        }"
        @click="updateSolveState(props.solve.index, '+2')"
      >
        +2
      </button>
      <button
        class="flex text-danger-700 justify-center"
        @click="updateSolveState(props.solve.index, 'deleted')"
      >
        DEL
      </button>
    </div>
    <div class="flex row-span-3 pb-3">
      <cube-image :scramble="solve.scramble" />
    </div>
  </div>
</template>
<style lang="scss">
.top-element {
  box-shadow: 0px 15px 10px -15px rgba(0, 0, 0, 0.75);
  /* The first two values control the horizontal and vertical offset of the shadow */
  /* The third value controls the blur radius of the shadow */
  /* The fourth value controls the spread radius of the shadow, and can be used to adjust the size of the shadow */
}
</style>
