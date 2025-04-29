<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { NotificationProps } from "./type";
import { addUnit, typeIconMap, RenderVnode } from "@toy-element/utils";
import { bind, delay } from "lodash-es";
import { useEventListener, useOffset } from "@toy-element/hooks";
import ErIcon from "../Icon/Icon.vue";
import { getLastBottomOffset } from "./method";

defineOptions({
  name: "ErNotification",
});

const props = withDefaults(defineProps<NotificationProps>(), {
  type: "info",
  duration: 3000,
  offset: 20,
  transitionName: "fade",
  showClose: true,
  position: "top-right",
});

const visible = ref(false);
const notificationRef = ref<HTMLDivElement>();
const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");

// div 的高度
const boxHeight = ref(0);

const { topOffset, bottomOffset } = useOffset({
  // 绑定this指针
  getLastBottomOffset: bind(getLastBottomOffset, props),
  offset: props.offset,
  boxHeight,
});

const horizontalClass = computed(() =>
  props.position.endsWith("right") ? "right" : "left",
);
const verticalProperty = computed(() =>
  props.position.startsWith("top") ? "top" : "bottom",
);

const cssStyle = computed(() => ({
  [verticalProperty.value]: addUnit(topOffset.value),
  zIndex: props.zIndex,
}));

let timer: number;
function startTimmer() {
  if (props.duration === 0) return;
  timer = delay(close, props.duration);
}

function clearTimer() {
  clearTimeout(timer);
}

function close() {
  visible.value = false;
}

onMounted(() => {
  visible.value = true;
  startTimmer();
});

// 按下esc关闭消息
useEventListener(document, "keydown", (e: Event) => {
  const { code } = e as KeyboardEvent;
  if (code === "Escape") {
    close();
  }
});

watch(visible, (val) => {
  if (!val) boxHeight.value = -props.offset; // 退出动画更流畅
});

defineExpose({
  bottomOffset,
  close,
});
</script>

<template>
  <Transition
    :name="transitionName"
    @enter="boxHeight = notificationRef!.getBoundingClientRect().height"
    @after-leave="!visible && props.onDestory()"
  >
    <div
      ref="notificationRef"
      class="er-notification"
      :class="{
        [`er-notification--${type}`]: type,
        'is-close': props.showClose,
        [horizontalClass]: true,
      }"
      :style="cssStyle"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimmer"
    >
      <er-icon class="er-notification__icon" :icon="iconName" />
      <div class="er-notification__text">
        <div class="er-notification__title">{{ props.title }}</div>
        <div class="er-notification__content">
          <slot>
            <!-- 只有message可能传递一个方法，所以需要通过renderVnode来进行处理 -->
            <render-vnode v-if="props.message" :vNode="props.message" />
          </slot>
        </div>
      </div>

      <div class="er-notification__close" v-if="props.showClose">
        <er-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import "./style.css";
</style>
