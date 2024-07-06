import { useSettings } from "@/composables/settings";
import { threeBldCornerPairs } from "@/composables/training/constants";
import { computed, ref, type Ref } from "vue";
import type { CornerMemoResult } from "./types";

const { settings, hasMaximumRecognitionTime } = useSettings();

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
  return Object.entries(pairs).map(([key, value]) => {
    const result = cornerMemoResults.value.find((r) => r.key === key);
    if (!result) {
      return {
        key,
        text: value,
        ratio: 0,
        total: 0,
        averageTime: NaN,
      };
    }
    const rightResults =
      result.results?.filter((r) => r.result === "right") || [];
    const timedRightResults = rightResults.filter((r) => r.time);
    const resultsLength = result.results?.length || 0;

    return {
      ...result,
      ratio: (rightResults.length / resultsLength) * 100,
      total: resultsLength,
      averageTime:
        timedRightResults.reduce((acc, r) => acc + r.time!, 0) /
        timedRightResults.length,
    };
  });
});

function addCornerMemoResult(
  key: string,
  text: string,
  result: "right" | "wrong",
  time: number
) {
  const sameKeyEntry = cornerMemoResults.value.find(
    (result) => result.key === key
  );
  const newResultEntry = {
    result,
    time:
      result === "right" && hasMaximumRecognitionTime.value ? time : undefined,
  };

  if (sameKeyEntry) {
    if (sameKeyEntry.text === text) {
      // if the same key already exists, add the new result to the existing entry
      sameKeyEntry.results?.push(newResultEntry);
    } else {
      // if the same key exists but the text is different, overwrite the results
      sameKeyEntry.results = [newResultEntry];
    }
  } else {
    cornerMemoResults.value.push({
      key,
      text,
      results: [newResultEntry],
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
    mode.value === "key" ||
    (mode.value === "alternate" && isKeyRound.value)
  ) {
    return pairsKeys[currentRandomIndex.value];
  } else {
    return pairsValues[currentRandomIndex.value];
  }
});
const currentHiddenText = computed(() => {
  if (
    mode.value === "key" ||
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

  if (mode.value === "alternate" && roundCounter.value % 4 === 0) {
    isKeyRound.value = !isKeyRound.value;
  }
  // Increment round counter and toggle between key/value rounds every 4 rounds for "alternate" mode
  roundCounter.value++;
}

function handleResult(result: "right" | "wrong" | "skip") {
  if (
    !isHiddenTextShown.value ||
    // if the user clicks on right after the time is up, don't add the result
    (isFullDurationUsed.value && result === "right")
  ) {
    return;
  }
  if (result !== "skip") {
    addCornerMemoResult(
      pairsKeys[currentRandomIndex.value],
      pairsValues[currentRandomIndex.value],
      result,
      elapsedTime.value
    );
  }
  resetTimeBarAnimation();

  isHiddenTextShown.value = false;
  selectRandomPair();
}

const startTime = ref(0);
const elapsedTime = ref(0);
const isFullDurationUsed = ref(false);
const timeBarPlayState = ref("running");
const timeBarAnimationKey = ref(0);

function resetTimeBarAnimation() {
  timeBarAnimationKey.value++;
  elapsedTime.value = 0;
  isFullDurationUsed.value = false;
  timeBarPlayState.value = "running";
}

function handleTimeBarAnimationStart() {
  startTime.value = Date.now();
}

function handleTimeBarAnimationEnd(_isFullDurationUsed: boolean) {
  if (timeBarPlayState.value !== "paused") {
    isFullDurationUsed.value = _isFullDurationUsed;
    timeBarPlayState.value = "paused";
    const endTime = Date.now();
    elapsedTime.value = _isFullDurationUsed
      ? settings.value.blindfoldedTraining.maximumRecognitionTime
      : (endTime - startTime.value) / 1000;
  }
}

selectRandomPair();

export default {
  currentHintText,
  currentHiddenText,
  roundCounter,
  selectRandomPair,
  isHiddenTextShown,
  handleResult,
  computedCornerMemoResults,
  resetCornerMemoResults,
  handleTimeBarAnimationStart,
  handleTimeBarAnimationEnd,
  timeBarPlayState,
  timeBarAnimationKey,
  elapsedTime,
  isFullDurationUsed,
};
