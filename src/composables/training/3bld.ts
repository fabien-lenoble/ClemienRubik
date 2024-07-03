import { useSettings } from "@/composables/settings";
import { threeBldCornerPairs } from "@/composables/training/constants";
import { computed, ref, type Ref } from "vue";
import type { CornerMemoResult } from "./types";

const { settings } = useSettings();

const cornerMemoResults: Ref<CornerMemoResult[]> = ref(
  JSON.parse(
    localStorage.getItem("cornerMemoResults") || "[]"
  ) as CornerMemoResult[]
);

function resetCornerMemoResults() {
  cornerMemoResults.value = [];
  localStorage.removeItem("cornerMemoResults");
}

const computedCornerMemoResults = computed(() => {
  return cornerMemoResults.value
    .map((result) => ({
      ...result,
      ratio: (result.right / (result.right + result.wrong)) * 100,
      total: result.right + result.wrong,
    }))
    .sort((a, b) => (b.key > a.key ? -1 : 1))
    .sort((a, b) => b.ratio - a.ratio);
});

function addCornerMemoResult(
  key: string,
  text: string,
  result: "right" | "wrong"
) {
  const sameKeyTextIndex = cornerMemoResults.value.find(
    (result) => result.key === key && result.text === text
  );
  if (sameKeyTextIndex) {
    if (result === "right") {
      sameKeyTextIndex.right++;
    } else {
      sameKeyTextIndex.wrong++;
    }
  } else {
    cornerMemoResults.value.push({
      key,
      text,
      right: result === "right" ? 1 : 0,
      wrong: result === "wrong" ? 1 : 0,
    });
  }

  localStorage.setItem(
    "cornerMemoResults",
    JSON.stringify(cornerMemoResults.value)
  );
}

const mode = computed(() => settings.value.blindfoldedTraining.mode);

const pairs = Object.fromEntries(
  Object.entries(threeBldCornerPairs).filter(
    ([_, value]) => !["", "-"].includes(value)
  )
);
const pairsKeys = Object.keys(pairs);
const pairsValues = Object.values(pairs);

const currentRandomIndex = ref(-1);
const currentHintText = computed(() => {
  if (
    mode.value === "pairs" ||
    (mode.value === "alternate" && isKeyRound.value)
  ) {
    return pairsKeys[currentRandomIndex.value];
  } else {
    return pairsValues[currentRandomIndex.value];
  }
});
const currentHiddenText = computed(() => {
  if (
    mode.value === "pairs" ||
    (mode.value === "alternate" && isKeyRound.value)
  ) {
    return pairsValues[currentRandomIndex.value];
  } else {
    return pairsKeys[currentRandomIndex.value];
  }
});
const isHiddenTextShown = ref(false);
const roundCounter = ref(0);
const isKeyRound = ref(true); // Start with keys

function selectRandomPair() {
  let randomIndex = 0;
  do {
    randomIndex = Math.floor(Math.random() * pairsKeys.length);
  } while (currentRandomIndex.value === randomIndex);

  currentRandomIndex.value = randomIndex;

  // Increment round counter and toggle between key/value rounds every 4 rounds for "alternate" mode
  roundCounter.value++;
  if (mode.value === "alternate" && roundCounter.value % 4 === 0) {
    isKeyRound.value = !isKeyRound.value;
  }
}

function handleResult(result: "right" | "wrong" | "skip") {
  if (!isHiddenTextShown.value) {
    return;
  }

  if (result !== "skip") {
    addCornerMemoResult(
      pairsKeys[currentRandomIndex.value],
      pairsValues[currentRandomIndex.value],
      result
    );
  }

  isHiddenTextShown.value = false;
  selectRandomPair();
}

export default {
  currentHintText,
  currentHiddenText,
  roundCounter,
  selectRandomPair,
  isHiddenTextShown,
  handleResult,
  computedCornerMemoResults,
  resetCornerMemoResults,
};
