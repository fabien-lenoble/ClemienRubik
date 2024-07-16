import { useSettings } from "@/composables/settings";
import type {
  ComputedCornerMemoResult,
  CornerMemoResult,
  Threshold,
} from "@/composables/training/types";
import { computed, ref, type Ref } from "vue";

const { settings, hasMaximumRecognitionTime } = useSettings();

const isHiddenTextShown = ref(false);
const roundCounter = ref(0);
const isKeyRound = ref(true); // Start with keys
const mode = computed(() => settings.value.blindfoldedTraining.mode);
const thresholdLevels = {
  time: [3, 2],
  ratio: [50, 80],
};
const thresholds: Ref<Record<string, Threshold>> = ref({
  unknown: {
    ratioChecker: (result: ComputedCornerMemoResult) => result.total === 0,
    timeChecker: (result: ComputedCornerMemoResult) =>
      isNaN(result.averageTime),
    color: "gray-300",
    active: true,
  },
  bad: {
    ratioChecker: (result: ComputedCornerMemoResult) =>
      result.total > 0 && result.ratio < thresholdLevels.ratio[0],
    timeChecker: (result: ComputedCornerMemoResult) =>
      result.averageTime > thresholdLevels.time[0],
    color: "red-300",
    active: true,
  },
  medium: {
    ratioChecker: (result: ComputedCornerMemoResult) =>
      result.total > 0 &&
      result.ratio < thresholdLevels.ratio[1] &&
      result.ratio >= thresholdLevels.ratio[0],
    timeChecker: (result: ComputedCornerMemoResult) =>
      result.averageTime >= thresholdLevels.time[1] &&
      result.averageTime < thresholdLevels.time[0],
    color: "yellow-100",
    active: true,
  },
  good: {
    ratioChecker: (result: ComputedCornerMemoResult) =>
      result.total > 0 && result.ratio >= thresholdLevels.ratio[1],
    timeChecker: (result: ComputedCornerMemoResult) =>
      result.averageTime <= thresholdLevels.time[1],
    color: "green-300",
    active: true,
  },
});

const cornerMemoResults: Ref<CornerMemoResult[]> = ref(
  JSON.parse(
    localStorage.getItem("cornerMemoResults") || "[]"
  ) as CornerMemoResult[]
);

function resetCornerMemoResults() {
  if (confirm("Are you sure you want to reset the results?")) {
    cornerMemoResults.value = [];
    localStorage.removeItem("cornerMemoResults");
  }
}

const computedCornerMemoResults: Ref<ComputedCornerMemoResult[]> = computed(
  () => {
    return Object.entries(pairs.value)
      .map(([key, value]) => {
        value = value.trim();
        const result = cornerMemoResults.value.find(
          (r) => r.key === key && r.text.trim() === value.trim()
        );
        if (!result) {
          return {
            key,
            text: value,
            ratio: 0,
            total: 0,
            averageTime: NaN,
            score: 1,
          };
        }
        const hintFilteredResults = result.results?.filter(
          (r) =>
            r.hintType === settings.value.blindfoldedTraining.resultsViewMode
        );

        const rightResults =
          hintFilteredResults?.filter((r) => r.result === "right") || [];
        const timedRightResults = rightResults.filter((r) => r.time);
        const resultsLength = hintFilteredResults?.length || 0;
        const ratio =
          resultsLength === 0 ? 0 : (rightResults.length / resultsLength) * 100;
        const averageTime =
          timedRightResults.reduce((acc, r) => acc + r.time!, 0) /
          timedRightResults.length;

        const finalResult = {
          ...result,
          ratio,
          total: resultsLength,
          averageTime,
        };

        return {
          ...finalResult,
          score: computeScore(finalResult),
        };
      })
      .sort((a, b) => (b.score > a.score ? 1 : -1));
  }
);

function computeScore(result: Omit<ComputedCornerMemoResult, "score">) {
  let score = 1;

  if (thresholds.value.bad.ratioChecker(result)) {
    score += 0.5;
  }
  if (thresholds.value.bad.timeChecker(result)) {
    score += 0.5;
  }

  if (thresholds.value.medium.ratioChecker(result)) {
    score += 0.25;
  }
  if (thresholds.value.medium.timeChecker(result)) {
    score += 0.25;
  }

  if (thresholds.value.good.ratioChecker(result)) {
    score -= 0.25;
  }
  if (thresholds.value.good.timeChecker(result)) {
    score -= 0.25;
  }

  return score;
}

const scores = computed(() => {
  return computedCornerMemoResults.value.map((result) => result.score);
});

const totaledScores = computed(() => {
  return scores.value.reduce((acc, score) => acc + score, 0);
});

const displayedCornerResults = computed(() => {
  return computedCornerMemoResults.value
    .filter((result) => {
      for (const threshold of Object.values(thresholds.value)) {
        if (threshold.active) {
          if (threshold.ratioChecker(result) || threshold.timeChecker(result)) {
            return true;
          }
        }
      }
    })
    .sort((a, b) => (b.key > a.key ? -1 : 1));
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
  const hintType: "key" | "value" =
    (mode.value === "alternate" && !isKeyRound.value) || mode.value === "value"
      ? "value"
      : "key";

  const newResultEntry = {
    result,
    time:
      result === "right" && hasMaximumRecognitionTime.value ? time : undefined,
    hintType,
  };

  text = text.trim();

  if (sameKeyEntry) {
    if (sameKeyEntry.text.trim() === text) {
      // if the same key already exists, add the new result to the existing entry
      sameKeyEntry.results?.push(newResultEntry);
    } else {
      // if the same key exists but the text is different, update the text and overwrite the results
      sameKeyEntry.text = text;
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

const pairs = computed(() =>
  Object.fromEntries(
    Object.entries(
      settings.value.blindfoldedTraining.threeBldCornerPairs
    ).filter(([_, value]) => !["", "-"].includes(value))
  )
);
const pairsKeys = computed(() =>
  computedCornerMemoResults.value.map((r) => r.key)
);
const pairsValues = computed(() =>
  computedCornerMemoResults.value.map((r) => r.text)
);

const currentRandomIndex = ref(-1);
const currentHintText = computed(() => {
  if (
    mode.value === "key" ||
    (mode.value === "alternate" && isKeyRound.value)
  ) {
    return pairsKeys.value[currentRandomIndex.value];
  } else {
    return pairsValues.value[currentRandomIndex.value];
  }
});
const currentHiddenText = computed(() => {
  if (
    mode.value === "key" ||
    (mode.value === "alternate" && isKeyRound.value)
  ) {
    return pairsValues.value[currentRandomIndex.value];
  } else {
    return pairsKeys.value[currentRandomIndex.value];
  }
});

function selectNextPair() {
  let index = 0;
  let randomNumber = 0;
  const cumulativeDistributionFunction = scores.value.map(
    (
      (sum) => (value) =>
        (sum += value)
    )(0)
  );
  do {
    randomNumber = Math.random() * totaledScores.value;
    index = cumulativeDistributionFunction.findIndex(
      (score) => randomNumber <= score
    );
  } while (currentRandomIndex.value === index);

  currentRandomIndex.value = index;

  if (mode.value === "alternate" && roundCounter.value % 4 === 0) {
    isKeyRound.value = !isKeyRound.value;
  }
  // Increment round counter and toggle between key/value rounds every 4 rounds for "alternate" mode
  roundCounter.value++;
}

function weightedRandomTester() {
  const res: Record<string, number> = {};
  const n = 100000;
  for (let i = 0; i < n; i++) {
    selectNextPair();
    res[currentHintText.value] = (res[currentHintText.value] || 0) + 1;
  }
  // log the percentage of each hint text
  for (const key in res) {
    res[key] = (res[key] / n) * 100;
  }
  console.log(res);
}

// uncomment to test the weighted random function
// weightedRandomTester();

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
      pairsKeys.value[currentRandomIndex.value],
      pairsValues.value[currentRandomIndex.value],
      result,
      elapsedTime.value
    );
  }
  resetTimeBarAnimation();

  isHiddenTextShown.value = false;
  selectNextPair();
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

selectNextPair();

export default {
  currentHintText,
  currentHiddenText,
  roundCounter,
  selectNextPair,
  isHiddenTextShown,
  handleResult,
  displayedCornerResults,
  resetCornerMemoResults,
  handleTimeBarAnimationStart,
  handleTimeBarAnimationEnd,
  timeBarPlayState,
  timeBarAnimationKey,
  elapsedTime,
  isFullDurationUsed,
  pairs,
  thresholdLevels,
  thresholds,
};
