<script setup lang="ts">
import { onMounted } from "vue";
import QRCode from "qrcode";
import { useShare } from "@/composables/share";
import JoinPopup from "./JoinPopup.vue";
import SharePopup from "./SharePopup.vue";
const { isShareModalOpen, shareUrl } = useShare();

onMounted(() => {
  const canvas = document.getElementById("canvas");
  QRCode.toCanvas(canvas, shareUrl.value, () => {});
});
</script>

<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-my-text-primary text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-my-text-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <share-popup></share-popup>
            <join-popup></join-popup>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-my-text-primary px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="isShareModalOpen = false"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
