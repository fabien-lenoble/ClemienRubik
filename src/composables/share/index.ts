import { ref, computed } from "vue";
import type { Ref } from "vue";
import { useRoute } from "vue-router";

const isShareModalOpen: Ref<boolean> = ref(false);

const shareUrl: Ref<string> = computed(() => {
  const route = useRoute();
  return route.fullPath.replace("scramble", "join");
});

export function useShare() {
  return {
    isShareModalOpen,
    shareUrl,
  };
}
