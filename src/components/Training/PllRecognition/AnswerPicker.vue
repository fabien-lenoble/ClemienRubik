<template>
  <div class="flex flex-wrap justify-center items-center h-full">
    <div class="flex basis-full text-end gap-x-3 px-3">
      <template v-if="isEditingMode">
        <div v-if="temporarySelectablePlls.length < 2" class="grow">
          select at least 2 plls
        </div>
        <div class="grow">
          <button>
            <i
              @click="toggleAllPlls()"
              class="fa-solid"
              :class="
                temporarySelectablePlls.length > 0
                  ? 'fa-square-check'
                  : 'fa-square'
              "
            ></i>
          </button>
        </div>
      </template>
      <div class="m-auto content-end">
        <button>
          <i
            @click="toggleEditingMode"
            class="fa-solid"
            :class="isEditingMode ? 'fa-check' : 'fa-edit'"
          ></i>
        </button>
      </div>
    </div>
    <div
      class="basis-1/3 relative"
      v-for="pll in pllCases"
      :key="pll.name"
      @click="handleClick(pll.name)"
    >
      <div
        class="cursor-pointer text-center py-2 mx-1 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        :class="{
          'border-green-500 bg-green-100 text-black':
            isPllSelected && pll.name === currentPllName,
          'border-red-500 bg-red-100 text-black':
            isPllSelected &&
            pll.name == selectedPllName &&
            pll.name !== currentPllName,
          'border-gray-300 text-my-text-secondary': !isPllSelected,
          'opacity-20': !isPllSelectable(pll.name),
        }"
      >
        {{ pll.name }}
      </div>
      <template v-if="isEditingMode">
        <div class="absolute right-[16px] bottom-[8px]">
          <i
            class="fa-solid"
            :class="isPllSelectable(pll.name) ? 'fa-square-check' : 'fa-square'"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettings } from "@/composables/settings";
import { useTraining } from "@/composables/training";
import { pllCases } from "@/composables/training/constants";
import { ref } from "vue";

const isEditingMode = ref(false);

const { isPllSelected, selectedPllName, currentPllName, pickNewRandomPll } =
  useTraining();
const { settings, setPllRecognition } = useSettings();

const emit = defineEmits<{
  (e: "select-pll", name: string): void;
}>();

const temporarySelectablePlls = ref(
  settings.value.pllRecognition.selectablePlls
);

function isPllSelectable(name: string) {
  return temporarySelectablePlls.value.includes(name);
}

function handleClick(name: string) {
  if (isEditingMode.value) {
    updateTemporarySelectablePlls(name);
  } else {
    emit("select-pll", name);
  }
}

function updateTemporarySelectablePlls(name: string) {
  if (temporarySelectablePlls.value.includes(name)) {
    temporarySelectablePlls.value = temporarySelectablePlls.value.filter(
      (pll) => pll !== name
    );
  } else {
    temporarySelectablePlls.value = [...temporarySelectablePlls.value, name];
  }
}

function toggleAllPlls() {
  if (temporarySelectablePlls.value.length > 0) {
    temporarySelectablePlls.value = [];
  } else {
    temporarySelectablePlls.value = pllCases.map((pll) => pll.name);
  }
}

function toggleEditingMode() {
  if (isPllSelected.value) {
    return;
  }
  if (isEditingMode.value) {
    // Ensure at least 2 PLLs are selectable
    if (temporarySelectablePlls.value.length <= 2) {
      return;
    }
    setPllRecognition({ selectablePlls: temporarySelectablePlls.value });
    pickNewRandomPll();
  }
  isEditingMode.value = !isEditingMode.value;
}
</script>
