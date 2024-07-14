<template>
  <div class="wrap" v-show="shouldShowImage">
    <div class="cube" :class="cubeClass">
      <face
        class="top"
        :class="faceClass"
        :sticker-class="stickerClass"
        :face="cube[0]"
        :face-index="0"
      />
      <face
        class="left"
        :class="faceClass"
        :sticker-class="stickerClass"
        :face="cube[1]"
        :face-index="1"
      />
      <face
        class="front"
        :class="faceClass"
        :sticker-class="stickerClass"
        :face="cube[2]"
        :face-index="2"
      />
      <face
        class="right"
        :class="faceClass"
        :sticker-class="stickerClass"
        :face="cube[3]"
        :face-index="3"
      />
      <face
        class="back"
        :class="faceClass"
        :sticker-class="stickerClass"
        :face="cube[4]"
        :face-index="4"
      />
      <face
        class="bottom"
        :class="faceClass"
        :sticker-class="stickerClass"
        :face="cube[5]"
        :face-index="5"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Face from "@/components/CubeImage/Face.vue";
import { useScramble } from "@/composables/scramble";
import type { Move, Scramble } from "@/composables/scramble/types";
import { useTraining } from "@/composables/training";
import { computed } from "vue";

const { getScrambledImage } = useScramble();

const props = defineProps<{
  isMainImage: boolean;
  uTurn: string;
  yTurn: string;
  currentPllAlgorithm: string;
  stickerSize: number;
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
  let borderSize = 3;
  if (isSmall.value) {
    borderSize = 2;
  } else if (isBig.value) {
    borderSize = 4;
  }
  return `w-[${props.stickerSize}px] h-[${props.stickerSize}px] border-[${borderSize}px]`;
});

const reversedPllAlgorithm = computed(
  () =>
    props.currentPllAlgorithm
      .split(" ")
      .reverse()
      .map((move) => {
        if (move.includes("'")) {
          return move.replace("'", "");
        } else {
          return `${move}'`;
        }
      }) as Scramble
);

const cube = computed(() => {
  return getScrambledImage(
    ["x2" as Move]
      .concat(reversedPllAlgorithm.value)
      .concat([props.uTurn as Move])
      .concat([props.yTurn as Move])
  );
});

const { isPllSelected } = useTraining();

const shouldShowImage = computed(() => {
  if (props.isMainImage) {
    return true;
  } else {
    return isPllSelected.value;
  }
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
