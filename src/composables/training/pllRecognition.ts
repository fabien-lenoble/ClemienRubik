import { pllCases } from "@/composables/training/constants";
import { computed, ref } from "vue";

const uTurns = ["", "U", "U2", "U'"];
const yTurns = ["", "y", "y2", "y'"];

const currentPllIndex = ref(0);
const lastPllIndex = ref(0);
const isPllSelected = ref(false);
const selectedPllIndex = ref();
const currentRandomUTurnIndex = ref(0);
const currentRandomYTurnIndex = ref(0);
const currentRandomUTurn = computed(
  () => uTurns[currentRandomUTurnIndex.value]
);
const currentRandomYTurn = computed(
  () => yTurns[currentRandomYTurnIndex.value]
);
const loader = ref(false);

function pickNewRandomPll() {
  loader.value = true;
  do {
    currentPllIndex.value = Math.floor(Math.random() * pllCases.length);
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

function selectPll(index: number) {
  if (isPllSelected.value === false) {
    isPllSelected.value = true;
    selectedPllIndex.value = index;
  }
}

const currentPllAlgorithm = computed(() => {
  return pllCases[currentPllIndex.value].algorithm.replace(" ", "");
});

function setLoader(value: boolean) {
  loader.value = value;
}

export default {
  currentPllIndex,
  lastPllIndex,
  isPllSelected,
  selectedPllIndex,
  currentRandomUTurn,
  currentRandomYTurn,
  currentRandomUTurnIndex,
  currentRandomYTurnIndex,
  loader,
  uTurns,
  yTurns,
  pickNewRandomPll,
  chooseNextPll,
  selectPll,
  currentPllAlgorithm,
  setLoader,
};
