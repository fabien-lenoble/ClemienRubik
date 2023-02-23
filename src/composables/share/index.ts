import { ref } from "vue";
import type { Ref } from "vue";
const isShareModalOpen: Ref<boolean> = ref(false);
export function useShare() {
  return {
    isShareModalOpen,
  };
}
