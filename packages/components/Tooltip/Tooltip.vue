<script setup lang="ts">
import { computed, onUnmounted, ref, watch, watchEffect, type Ref } from "vue";
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./type";
import { bind, debounce, type DebouncedFunc } from "lodash-es";
import { createPopper, type Instance } from "@popperjs/core";
import { useClickOutside } from "@toy-element/hooks";
import { useEvenstToTriggerNode } from "./useEventToTriggerNode";
import type { ButtonInstance } from "../Button/type";

defineOptions({
  name: "ErTooltip",
});

interface _TooltipProps extends TooltipProps {
  // 启用虚拟触发功能。如果为true，Tooltip 的触发行为不再是默认的"hover"或者 "click"
  // 而是通过 virtual-ref 指定的参考元素来实现。
  virtualTriggering?: boolean;
  // 指定虚拟触发的参考元素
  virtualRef?: HTMLElement | ButtonInstance | void;
}

const props = withDefaults(defineProps<_TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
  transition: "fade",
  showTimeout: 0,
  hideTimeout: 200,
});

const visible = ref(false);

const emit = defineEmits<TooltipEmits>();

const events: Ref<Record<string, EventListener>> = ref({});
const outerEvents: Ref<Record<string, EventListener>> = ref({});
const dropdownEvents: Ref<Record<string, EventListener>> = ref({});

const containerNode = ref<HTMLElement>();
const _triggerNode = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();

const triggerNode = computed(() => {
  if (props.virtualTriggering)
    return (props.virtualRef as HTMLElement) ?? _triggerNode.value;
  return _triggerNode.value as HTMLElement;
});

const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
  ],
  ...props.popperOptions,
}));

// 只有"hover"需要延时，防止在文本和弹出之间出现闪烁
const openDelay = computed(() =>
  props.trigger === "hover" ? props.showTimeout : 0,
);
const closeDelay = computed(() =>
  props.trigger === "hover" ? props.hideTimeout : 0,
);

let openDebounce: DebouncedFunc<() => void> | void;
let closeDebounce: DebouncedFunc<() => void> | void;

// 延时打开和关闭
function openFinal() {
  closeDebounce?.cancel();
  openDebounce?.();
}

function closeFinal() {
  openDebounce?.cancel();
  closeDebounce?.();
}

function toggleVisible() {
  visible.value ? closeFinal() : openFinal();
}

function setVisible(value: boolean) {
  if (props.disabled) return;
  visible.value = value;
  emit("visible-change", value);
}

const triggerStrategyMap: Map<string, () => void> = new Map();

// 设置不同状态下的事件
triggerStrategyMap.set("hover", () => {
  events.value["mouseenter"] = openFinal;
  outerEvents.value["mouseleave"] = closeFinal;
  dropdownEvents.value["mouseenter"] = openFinal;
});
triggerStrategyMap.set("click", () => {
  events.value["click"] = toggleVisible;
});
triggerStrategyMap.set("contextmenu", () => {
  events.value["contextmenu"] = (e) => {
    e.preventDefault();
    openFinal();
  };
});

function attachEvents(trigger: string) {
  if (props.manual || props.disabled) return;
  triggerStrategyMap.get(trigger)?.();
}

if (!props.manual) {
  attachEvents(props.trigger);
}

let popperInstance: Instance | null = null;
function destroyPopperInstance() {
  popperInstance?.destroy();
  popperInstance = null;
}

function resetEvents() {
  events.value = {};
  outerEvents.value = {};
  dropdownEvents.value = {};
  attachEvents(props.trigger);
}

useEvenstToTriggerNode(props, triggerNode, events, () => {
  openDebounce?.cancel();
  // 直接关闭，而不使用closeFinal，因为closeFinal会触发openDebounce
  setVisible(false);
});

// 直接引用型，用于监听ref对象
watch(
  visible,
  (value) => {
    if (!value) return;
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value,
      );
    }
  },
  { flush: "post" },
);

// getter函数方式 (() => props.manual)，
// 当监听的是
// props的属性
// 计算属性
// 响应式对象的属性
// 复杂的表达式
watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events.value = {};
      outerEvents.value = {};
      dropdownEvents.value = {};
      return;
    }
    attachEvents(props.trigger);
  },
);

watch(
  () => props.trigger,
  () => resetEvents(),
);

watch(
  () => props.disabled,
  (val, oldVal) => {
    if (val === oldVal) return;

    openDebounce?.cancel();
    visible.value = false;
    emit("visible-change", false);
    resetEvents();
  },
);

// 初始化openDelay并且监听变化，随时修改
watchEffect(() => {
  // 自动追踪里面所有的响应式依赖，例如openDelay和closeDelay，直接执行函数，不会给出新值
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
});

const show: TooltipInstance["show"] = openFinal;
const hide: TooltipInstance["hide"] = () => {
  openDebounce?.cancel();
  setVisible(false);
};

useClickOutside(containerNode, () => {
  emit("click-outside");
  if (props.trigger === "click") {
    setVisible(false);
  }
});

defineExpose({
  show,
  hide,
});

onUnmounted(() => {
  destroyPopperInstance();
});
</script>

<template>
  <div class="er-tooltip" ref="containerNode" v-on="outerEvents">
    <div class="er-tooltip__trigger" ref="_triggerNode" v-on="events">
      <slot></slot>
    </div>
    <!-- <slot name="default" v-else></slot> -->
    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div
        class="er-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvents"
        v-if="visible"
      >
        <slot name="content">
          {{ props.content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
