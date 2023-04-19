<script setup lang="ts">
import { ref, onMounted } from "vue";
import QRCode from "qrcode";
import { useShare } from "@/composables/share";
const { isShareModalOpen } = useShare();
onMounted(() => {
  const canvas = document.getElementById("canvas");
  QRCode.toCanvas(canvas, window.location.href, () => {});
});
const copyLinkClicked = ref(false);

function copyUrl() {
  navigator.clipboard.writeText(window.location.href);
  copyLinkClicked.value = true;
}

function hasGetUserMedia() {
  const nav = navigator as any;
  return !!(
    nav.getUserMedia ||
    nav.webkitGetUserMedia ||
    nav.mozGetUserMedia ||
    nav.msGetUserMedia ||
    nav.mediaDevices?.getUserMedia
  );
}

async function getMedia() {
  try {
    if (hasGetUserMedia()) {
      // Not showing vendor prefixes.
      (navigator as any).mediaDevices?.getUserMedia(
        { video: true },
        function (localMediaStream: Blob) {
          var video = document.querySelector("video");
          if (video) {
            video.src = window.URL.createObjectURL(localMediaStream);

            // Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
            // See crbug.com/110938.
            video.onloadedmetadata = function (e) {
              // Ready to go. Do some stuff.
            };
          }
        }
      );
    } else {
      alert("getUserMedia() is not supported in your browser");
    }
    /* use the stream */
  } catch (err) {
    /* handle the error */
  }
}
</script>

<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 items-center justify-center sm:mx-0 sm:h-10 sm:w-10"
              ></div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div class="mt-2">
                  <canvas id="canvas"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="copyUrl"
            >
              {{ copyLinkClicked ? "Copied" : "Copy link" }}
            </button>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <video autoplay></video>
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="getMedia()"
            >
              Join session
            </button>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
