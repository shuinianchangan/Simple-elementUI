import { isFunction } from "lodash-es";
import { getCurrentInstance, ref, type Ref } from "vue";
import useEventListener from "./useEventListener";

interface UseFocusControllerOptions {
  afterFocus?(): void;
  beforeBlur?(event: FocusEvent): boolean | void;
  afterBlur?(): void;
}

export function useFocusController<T extends HTMLElement | { focus(): void }>(
  target: Ref<T | void>,
  options: UseFocusControllerOptions = {},
) {
  const { afterFocus, beforeBlur, afterBlur } = options;
  const instance = getCurrentInstance()!;
  const { emit } = instance;
  const wrapper = ref<HTMLElement>();
  const isFocused = ref(false);

  const handleFocus = (e: FocusEvent) => {
    if (isFocused.value) return;
    isFocused.value = true;
    emit("focus", e);
    afterFocus?.();
  };

  const handleBlur = (e: FocusEvent) => {
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(e) : false;
    if (
      cancelBlur ||
      // 防止在同一个包装器内部元素之间切换焦点时触发完整的失焦（blur）逻辑
      // 实际应用场景
      // <div class="wrapper"> // 这是 wrapper
      // <input />          // 当前焦点在这里
      // <button />         // 用户点击这里
      // </div>
      //   仍然在一个wrapper中，不应该触发失焦
      (e.relatedTarget && wrapper.value?.contains(e.relatedTarget as Node))
    )
      return;
    isFocused.value = false;
    emit("blur", e);
    afterBlur?.();
  };

  const handleClick = () => {
    target.value?.focus();
  };

  useEventListener(wrapper, "click", handleClick);

  return {
    wrapper,
    isFocused,
    handleFocus,
    handleBlur,
  };
}

export default useFocusController;
