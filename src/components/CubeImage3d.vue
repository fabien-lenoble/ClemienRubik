<template>
  <div class="wrap">
    <div class="cube" :class="cubeClass">
      <face
        class="top"
        :class="faceClass"
        :sticker-class="stickerClass"
        :face="cube[0]"
        :face-index="0"
        :revealed-stickers-values="revealedStickersValues"
        :hint-stickers-values="hintStickersValues"
      />
      <face
        class="left"
        :class="faceClass"
        :sticker-class="stickerClass"
        :face="cube[1]"
        :face-index="1"
        :revealed-stickers-values="revealedStickersValues"
        :hint-stickers-values="hintStickersValues"
      />
      <face
        class="front"
        :class="faceClass"
        :sticker-class="stickerClass"
        :face="cube[2]"
        :face-index="2"
        :revealed-stickers-values="revealedStickersValues"
        :hint-stickers-values="hintStickersValues"
      />
      <face
        class="right"
        :class="faceClass"
        :sticker-class="stickerClass"
        :face="cube[3]"
        :face-index="3"
        :revealed-stickers-values="revealedStickersValues"
        :hint-stickers-values="hintStickersValues"
      />
      <face
        class="back"
        :class="faceClass"
        :sticker-class="stickerClass"
        :face="cube[4]"
        :face-index="4"
        :revealed-stickers-values="revealedStickersValues"
        :hint-stickers-values="hintStickersValues"
      />
      <face
        class="bottom"
        :class="faceClass"
        :sticker-class="stickerClass"
        :face="cube[5]"
        :face-index="5"
        :revealed-stickers-values="revealedStickersValues"
        :hint-stickers-values="hintStickersValues"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Face from "@/components/CubeImage2d/Face.vue";
import { useScramble } from "@/composables/scramble";
import type { Move, Scramble } from "@/composables/scramble/types";
import type { CornerColor, PiecePosition } from "@/composables/training/types";
import { computed } from "vue";

const { getScrambledImage, getInitialRotation } = useScramble();

const props = defineProps<{
  uTurn?: string;
  yTurn?: string;
  ufrColors?: CornerColor;
  case?: string;
  algorithm?: string;
  stickerSize: number;
  revealedStickerColors?: [number, number, number][];
  revealedStickersValues?: [number, number, number][];
  hintStickersValues?: [number, number, number][];
}>();

const isSmall = computed(() => props.stickerSize < 30);
const isBig = computed(() => props.stickerSize >= 50);
const faceClass = computed(() => {
  if (isSmall.value) {
    return "is-small";
  } else if (isBig.value) {
    return "is-big";
  } else {
    return "";
  }
});

const cubeClass = computed(
  () => `top-[${props.stickerSize}px] left-[${props.stickerSize}px]`
);

const stickerClass = computed(() => {
  let textSize = "base";
  let borderSize = 3;
  if (isSmall.value) {
    borderSize = 2;
    textSize = "xs";
  } else if (isBig.value) {
    borderSize = 4;
    textSize = "2xl";
  }
  return `w-[${props.stickerSize}px] h-[${props.stickerSize}px] border-[${borderSize}px] text-${textSize}`;
});

const computedCase = computed(() => {
  if (!props.case) {
    return [];
  }
  return props.case
    .split(" ")
    .reverse()
    .map((move) => {
      if (move.includes("'")) {
        return move.replace("'", "");
      } else if (!move.includes("2")) {
        return `${move}'`;
      } else {
        return move;
      }
    }) as Scramble;
});

const computedAlgorithm = computed(() => {
  if (!props.algorithm) {
    return [];
  }
  return props.algorithm.split(" ") as Scramble;
});

const cube = computed(() => {
  const scramble = props.algorithm
    ? computedAlgorithm.value
    : computedCase.value;

  let initialRotation: Move[] = [];
  if (props.ufrColors) {
    initialRotation = getInitialRotation(props.ufrColors);
  }

  const computedCube = getScrambledImage(
    initialRotation
      .concat(scramble)
      .concat([(props.uTurn || "") as Move])
      .concat([(props.yTurn || "") as Move])
  );

  if (props.revealedStickerColors) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          if (
            !props.revealedStickerColors.some(
              (sticker) =>
                sticker[0] === i && sticker[1] === j && sticker[2] === k
            )
          ) {
            computedCube[i][j][k] = "" as PiecePosition;
          }
        }
      }
    }
  }

  return computedCube;
});
</script>

<style scoped>
.wrap {
  perspective: 600px;
}
.cube {
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(-30deg);
}
.cube div {
  position: absolute;
}
.back {
  transform: translateZ(-51px) rotateY(180deg);
  &.is-small {
    transform: translateZ(-30px) rotateY(180deg);
  }
  &.is-big {
    transform: translateZ(-75px) rotateY(180deg);
  }
}
.right {
  transform-origin: top right;
  transform: rotateY(-270deg) translateX(51px);
  &.is-small {
    transform: rotateY(-270deg) translateX(30px);
  }
  &.is-big {
    transform: rotateY(-270deg) translateX(75px);
  }
}
.left {
  transform-origin: center left;
  transform: rotateY(270deg) translateX(-51px);
  &.is-small {
    transform: rotateY(270deg) translateX(-30px);
  }
  &.is-big {
    transform: rotateY(270deg) translateX(-75px);
  }
}
.top {
  transform-origin: top center;
  transform: rotateX(90deg) translateY(-51px);
  &.is-small {
    transform: rotateX(90deg) translateY(-30px);
  }
  &.is-big {
    transform: rotateX(90deg) translateY(-75px);
  }
}
.bottom {
  transform-origin: bottom center;
  transform: rotateX(-90deg) translateY(51px);
  &.is-small {
    transform: rotateX(-90deg) translateY(30px);
  }
  &.is-big {
    transform: rotateX(-90deg) translateY(75px);
  }
}
.front {
  transform: translateZ(51px);
  &.is-small {
    transform: translateZ(30px);
  }
  &.is-big {
    transform: translateZ(75px);
  }
}
</style>
