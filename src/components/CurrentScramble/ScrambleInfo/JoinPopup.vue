<script setup lang="ts">
import { useShare } from "@/composables/share";
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import QrcodeScanner from "./QrcodeScanner.vue";
const { isShareModalOpen } = useShare();
const router = useRouter();
function updateDecodedValue(stream: string) {
  if (stream.match(/join\/[0-9]+\/[0-9]+$/)) {
    isShareModalOpen.value = false;
    router.push(stream);
  }
}
const seedValue: Ref<string> = ref("");
function joinSeed() {
  isShareModalOpen.value = false;
  router.push({
    name: "join",
    params: { seed: seedValue.value.toLowerCase().trim(), scrambleIndex: "1" },
  });
}
</script>

<template>
  <div>flash QR Code</div>
  <qrcode-scanner
    class="bg-gray-50 py-3 sm:flex sm:flex-row-reverse sm:px-6"
    @update-decoded-value="updateDecodedValue"
  ></qrcode-scanner>
  <div>Or input room "password" manually</div>
  <div class="flex gap-2">
    <input
      v-model="seedValue"
      type="text"
      id="seed_value"
      class="flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="clubsandwich2002"
      required
    />
    <button
      type="button"
      class="mt-3 flex justify-center rounded-md border border-gray-300 bg-my-text-primary px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      @click="joinSeed"
    >
      Go
    </button>
  </div>
</template>
