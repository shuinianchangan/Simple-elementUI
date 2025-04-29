import { each, isElement } from "lodash-es";
import { onMounted, onUnmounted, watch } from "vue";
import type { ComputedRef, Ref, WatchStopHandle } from "vue";
import type { TooltipProps } from "./type";

// 监听虚拟触发节点的变化，并动态绑定事件
// 在 Tooltip 组件中
// const events = ref({
//   mouseenter: handleMouseEnter,
//   mouseleave: handleMouseLeave
// });

// // 动态更新事件
// events.value = {
//   click: handleClick
// };  // hook 会自动处理事件的重新绑定

export function useEvenstToTriggerNode(
  props: TooltipProps & { virtualTriggering?: boolean },
  triggerNode: ComputedRef<HTMLElement | undefined>,
  events: Ref<Record<string, EventListener>>,
  closeMethod: () => void,
) {
  // 存储watch停止函数
  let watchEventsStopHandle: WatchStopHandle | void;
  let watchTriggerNodeStopHandle: WatchStopHandle | void;

  const _eventHandleMap = new Map();

  const _bindEventToVirtualTiggerNode = (el?: HTMLElement) => {
    isElement(el) &&
      each(events.value, (fn, event) => {
        _eventHandleMap.set(event, fn);
        el?.addEventListener(event as keyof HTMLElementEventMap, fn);
      });
  };

  const _unbindEventToVirtualTiggerNode = (el?: HTMLElement) => {
    isElement(el) &&
      each(
        ["mouseenter", "click", "contextmenu"],
        (key) =>
          _eventHandleMap.has(key) &&
          el?.removeEventListener(key, _eventHandleMap.get(key)),
      );
  };

  onMounted(() => {
    // watch返回停止函数
    // 监听触发节点的变化
    watchTriggerNodeStopHandle = watch(
      triggerNode,
      (newNode, oldNode) => {
        if (props.virtualTriggering) {
          if (oldNode) {
            _unbindEventToVirtualTiggerNode(oldNode);
            console.log("clear oldNode event", oldNode);
          }
          _bindEventToVirtualTiggerNode(newNode);
        }
      },
      { immediate: true },
    );

    // 监听事件映射表的变化
    watchEventsStopHandle = watch(
      events,
      () => {
        if (!props.virtualTriggering) return;
        _unbindEventToVirtualTiggerNode(triggerNode.value);
        _bindEventToVirtualTiggerNode(triggerNode.value);
        closeMethod();
      },
      { deep: true },
    );
  });

  onUnmounted(() => {
    watchTriggerNodeStopHandle?.();
    watchEventsStopHandle?.();
    _unbindEventToVirtualTiggerNode(triggerNode.value);
  });
}

export default useEvenstToTriggerNode;
