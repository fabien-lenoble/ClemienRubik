<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";

const solvedImageArray: Ref<string[][][]> = ref([
  [
    ["U", "U", "U"],
    ["U", "U", "U"],
    ["U", "U", "U"],
  ],
  [
    ["L", "L", "L"],
    ["L", "L", "L"],
    ["L", "L", "L"],
  ],
  [
    ["F", "F", "F"],
    ["F", "F", "F"],
    ["F", "F", "F"],
  ],
  [
    ["R", "R", "R"],
    ["R", "R", "R"],
    ["R", "R", "R"],
  ],
  [
    ["B", "B", "B"],
    ["B", "B", "B"],
    ["B", "B", "B"],
  ],
  [
    ["D", "D", "D"],
    ["D", "D", "D"],
    ["D", "D", "D"],
  ],
]);
</script>

<template>
  <div id="cube-image" class="container columns">
    <div id="line1" class="container line">
      <div class="face-slot"></div>
      <div id="cube-face-0" class="face-slot">
        <div
          id="face-line"
          v-for="(faceLine, faceLineIndex) in solvedImageArray[0]"
          :key="`0-${faceLineIndex}`"
          class="container line"
        >
          <div
            v-for="(sticker, stickerIndex) in faceLine"
            :key="stickerIndex"
            :class="`sticker ${sticker}`"
          />
        </div>
      </div>
      <div class="face-slot"></div>
      <div class="face-slot"></div>
    </div>

    <div id="line2" class="container line">
      <div v-for="n in 4" :key="n" :id="`cube-face-${n}`" class="face-slot">
        <div
          id="face-line"
          v-for="(faceLine, faceLineIndex) in solvedImageArray[n]"
          :key="`${n}-${faceLineIndex}`"
          class="container line"
        >
          <div
            v-for="(sticker, stickerIndex) in faceLine"
            :key="stickerIndex"
            :class="`sticker ${sticker}`"
          />
        </div>
      </div>
    </div>

    <div id="line3" class="container line">
      <div class="face-slot"></div>
      <div id="cube-face-5" class="face-slot">
        <div
          id="face-line"
          v-for="(faceLine, faceLineIndex) in solvedImageArray[5]"
          :key="`5-${faceLineIndex}`"
          class="container line"
        >
          <div
            v-for="(sticker, stickerIndex) in faceLine"
            :key="stickerIndex"
            :class="`sticker ${sticker}`"
          />
        </div>
      </div>
      <div class="face-slot"></div>
      <div class="face-slot"></div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  justify-content: space-around;
}
.columns {
  flex-direction: column;
}
.column {
  flex: 50%;
}
.face-slot {
  flex: 25%;
}
.sticker {
  height: 32px;
  width: 32px;
  margin: 4px;
  &.U {
    background-color: rgb(225, 216, 216);
  }
  &.L {
    background-color: orange;
  }
  &.F {
    background-color: green;
  }
  &.R {
    background-color: red;
  }
  &.B {
    background-color: blue;
  }
  &.D {
    background-color: yellow;
  }
}
</style>
