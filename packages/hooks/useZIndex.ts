import { computed, ref } from "vue";

// 各个组件共享的zIndex
const zIndex = ref(0);
export function useZIndex(defaultZIndex: number = 2000) {
  const _defaultZIndex = ref(defaultZIndex);
  const currentZIndex = computed(() => zIndex.value + _defaultZIndex.value);

  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };

  return { zIndex, currentZIndex, nextZIndex };
}

export default useZIndex;
