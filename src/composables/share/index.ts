import { ref } from "vue";
import type { Ref } from "vue";
const isShareModalOpen: Ref<boolean> = ref(false);
const isJoinModalOpen: Ref<boolean> = ref(false);
const shareUrl: Ref<string> = ref(
  window.location.href.replace("scramble", "join")
);
export function useShare() {
  return {
    isShareModalOpen,
    isJoinModalOpen,
    shareUrl,
  };
}
