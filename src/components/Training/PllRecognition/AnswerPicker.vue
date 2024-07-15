<template>
  <div class="grid grid-rows-4 grid-cols-7 gap-2 h-full">
    <div class="flex col-span-7 text-end gap-x-3 px-3 justify-end">
      <template v-if="isEditingMode">
        <div v-if="temporaryPllPool.length < 2" class="grow">
          select at least 2 plls
        </div>
        <div class="grow">
          <button>
            <i
              @click="toggleAllPlls()"
              class="fa-solid fa-check-double"
              :class="
                temporaryPllPool.length > 0 ? 'fa-square-check' : 'fa-square'
              "
            ></i>
          </button>
        </div>
      </template>
      <div>
        <button>
          <i
            @click="toggleEditingMode"
            class="fa-solid"
            :class="isEditingMode ? 'fa-close' : 'fa-edit'"
          ></i>
        </button>
      </div>
    </div>
    <div
      class="relative"
      v-for="pll in pllCases"
      :key="pll.name"
      @click="handleClick(pll.name)"
    >
      <div
        class="cursor-pointer p-1 text-center border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        :class="{
          'border-yellow-500 ': isEditingMode && isPllSelectable(pll.name),
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

const temporaryPllPool = ref(settings.value.pllRecognition.pllPool);

function isPllSelectable(name: string) {
  return temporaryPllPool.value.includes(name);
}

function handleClick(name: string) {
  if (isEditingMode.value) {
    updateTemporarySelectablePlls(name);
  } else if (isPllSelectable(name)) {
    emit("select-pll", name);
  }
}

function updateTemporarySelectablePlls(name: string) {
  if (temporaryPllPool.value.includes(name)) {
    temporaryPllPool.value = temporaryPllPool.value.filter(
      (pll) => pll !== name
    );
  } else {
    temporaryPllPool.value = [...temporaryPllPool.value, name];
  }
}

function toggleAllPlls() {
  if (temporaryPllPool.value.length > 0) {
    temporaryPllPool.value = [];
  } else {
    temporaryPllPool.value = pllCases.map((pll) => pll.name);
  }
}

function toggleEditingMode() {
  if (isPllSelected.value) {
    return;
  }
  if (isEditingMode.value) {
    // Ensure at least 2 PLLs are selectable
    if (temporaryPllPool.value.length < 2) {
      return;
    }
    setPllRecognition({ pllPool: temporaryPllPool.value });
    pickNewRandomPll();
  }
  isEditingMode.value = !isEditingMode.value;
}
</script>
