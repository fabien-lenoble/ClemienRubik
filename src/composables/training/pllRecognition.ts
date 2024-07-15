import {
  antiClockWiseUTurns,
  antiClockWiseYTurns,
  pllCases,
} from "@/composables/training/constants";
import { computed, ref } from "vue";
import { useSettings } from "../settings";

const { settings } = useSettings();

const currentPllIndex = ref(0);
const lastPllIndex = ref(0);
const isPllSelected = ref(false);
const selectedPllName = ref("");
const currentRandomUTurnIndex = ref(0);
const currentRandomAufUTurnIndex = ref(0);
const currentRandomYTurnIndex = ref(0);
const currentRandomUTurn = computed(
  () => antiClockWiseUTurns[currentRandomUTurnIndex.value]
);
const currentRandomAufUTurn = computed(
  () => antiClockWiseUTurns[currentRandomAufUTurnIndex.value]
);
const currentRandomYTurn = computed(
  () => antiClockWiseYTurns[currentRandomYTurnIndex.value]
);

const filteredPllCases = computed(() =>
  pllCases.filter((pll) =>
    settings.value.pllRecognition.pllPool.includes(pll.name)
  )
);

function pickNewRandomPll() {
  do {
    currentPllIndex.value = Math.floor(
      Math.random() * filteredPllCases.value.length
    );
  } while (lastPllIndex.value === currentPllIndex.value);

  currentRandomAufUTurnIndex.value = Math.floor(
    Math.random() * antiClockWiseUTurns.length
  );
  currentRandomUTurnIndex.value = Math.floor(
    Math.random() * antiClockWiseUTurns.length
  );
  currentRandomYTurnIndex.value = Math.floor(
    Math.random() * antiClockWiseYTurns.length
  );
  lastPllIndex.value = currentPllIndex.value;
}

function chooseNextPll() {
  if (isPllSelected.value === true) {
    pickNewRandomPll();
    isPllSelected.value = false;
  }
}

function selectPll(name: string) {
  if (isPllSelected.value === false) {
    isPllSelected.value = true;
    selectedPllName.value = name;
  }
}
const currentPllName = computed(() => {
  return filteredPllCases.value[currentPllIndex.value].name;
});

const currentPllAlgorithm = computed(() => {
  return (
    filteredPllCases.value[currentPllIndex.value].algorithm +
    " " +
    currentRandomUTurn.value
  );
});

export default {
  currentPllIndex,
  lastPllIndex,
  isPllSelected,
  selectedPllName,
  currentRandomAufUTurn,
  currentRandomYTurn,
  currentRandomAufUTurnIndex,
  currentRandomYTurnIndex,
  pickNewRandomPll,
  chooseNextPll,
  selectPll,
  currentPllAlgorithm,
  currentPllName,
  filteredPllCases,
};
