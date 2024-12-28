import { type Ref } from "vue";
import useEventListener from "./useEventListener.ts";

export default function useClickOutside(
  elementRef: Ref<HTMLElement | void>,
  callback: (e: MouseEvent) => void
) {
  // 如果点击在元素外，则调用callback函数
  useEventListener(document, "click", (e: Event) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e as MouseEvent);
      }
    }
  });
}
