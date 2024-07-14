import { pllCases } from "@/composables/training/constants";
import { computed, ref } from "vue";
import { useSettings } from "../settings";

const { settings } = useSettings();

const uTurns = ["", "U'", "U2", "U"];
const yTurns = ["", "y'", "y2", "y"];

const currentPllIndex = ref(0);
const lastPllIndex = ref(0);
const isPllSelected = ref(false);
const selectedPllName = ref("");
const currentRandomUTurnIndex = ref(0);
const currentRandomYTurnIndex = ref(0);
const currentRandomUTurn = computed(
  () => uTurns[currentRandomUTurnIndex.value]
);
const currentRandomYTurn = computed(
  () => yTurns[currentRandomYTurnIndex.value]
);

const filteredPllCases = computed(() =>
  pllCases.filter((pll) =>
    settings.value.pllRecognition.selectablePlls.includes(pll.name)
  )
);

function pickNewRandomPll() {
  do {
    currentPllIndex.value = Math.floor(
      Math.random() * filteredPllCases.value.length
    );
  } while (lastPllIndex.value === currentPllIndex.value);

  currentRandomUTurnIndex.value = Math.floor(Math.random() * uTurns.length);
  currentRandomYTurnIndex.value = Math.floor(Math.random() * yTurns.length);
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
  return filteredPllCases.value[currentPllIndex.value].algorithm;
});

export default {
  currentPllIndex,
  lastPllIndex,
  isPllSelected,
  selectedPllName,
  currentRandomUTurn,
  currentRandomYTurn,
  currentRandomUTurnIndex,
  currentRandomYTurnIndex,
  uTurns,
  yTurns,
  pickNewRandomPll,
  chooseNextPll,
  selectPll,
  currentPllAlgorithm,
  currentPllName,
  filteredPllCases,
};
