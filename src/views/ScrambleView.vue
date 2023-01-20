<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useSeed } from "@/composables/seed";
import { useScramble } from "@/composables/scramble";

const { initSeedValues, baseSessionSeed, lastGeneratedSeed } = useSeed();
const {
  initScrambleValues,
  numberOfMoves,
  stringifiedScramble,
  currentScrambleIndex,
  goToNextScramble,
  currentScramble,
  lastNScrambles,
} = useScramble();

initSeedValues();
initScrambleValues();

const numberOfScrambles = 10;

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
  <main>
    <div class="container">
      <div class="column columns">
        <div>
          number of moves <input type="number" v-model="numberOfMoves" />
        </div>
        <div>my seed : {{ baseSessionSeed }}</div>
        <div>current seed : {{ lastGeneratedSeed }}</div>
        <div>mélange # : {{ currentScrambleIndex }}</div>
        <div>my mélange : {{ stringifiedScramble(currentScramble) }}</div>
        <button @click="goToNextScramble">scramble</button>

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
            <div
              v-for="n in 4"
              :key="n"
              :id="`cube-face-${n}`"
              class="face-slot"
            >
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
      </div>
      <div class="column">
        <div>previous {{ numberOfScrambles }} mélanges</div>
        <p
          v-for="(scramble, index) in lastNScrambles(numberOfScrambles)"
          :key="index"
        >
          #{{ currentScrambleIndex - 1 - index }}:
          {{ stringifiedScramble(scramble) }}
        </p>
      </div>
    </div>
  </main>
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
    background-color: white;
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
