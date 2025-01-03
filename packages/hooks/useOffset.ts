import { computed, type ComputedRef, type Ref } from "vue";

interface UseOffsetOptions {
  offset: number;
  boxHeight: Ref<number>;
  getLastBottomOffset: () => number;
}

interface UseOffsetResult {
  topOffset: ComputedRef<number>;
  bottomOffset: ComputedRef<number>;
}

export function useOffset(options: UseOffsetOptions): UseOffsetResult {
  const { offset, boxHeight, getLastBottomOffset } = options;
  const lastBottomOffset = computed(() => getLastBottomOffset());
  const topOffset = computed(() => lastBottomOffset.value + offset);
  const bottomOffset = computed(() => boxHeight.value + topOffset.value);
  return { topOffset, bottomOffset };
}

export default useOffset;
