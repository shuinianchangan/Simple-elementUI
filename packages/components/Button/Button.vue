<script setup lang="ts">
import { computed, ref, inject } from "vue";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./type";
import { BUTTON_GROUP_CTX_KEY } from "./constant";
import { throttle } from "lodash-es";
import ErIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ErButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
});

const slots = defineSlots();
const _ref = ref<HTMLButtonElement>();
const buttonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, void 0);
const emits = defineEmits<ButtonEmits>();

const handClick = (e: MouseEvent) => emits("click", e);
// 节流函数会实现参数的透传，所以调用时传递的event参数，还是会放在handClick中
const handClickThrottle = throttle(handClick, props.throttleDuration);

// 去判断Button中有没有内容
const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0px",
}));

const size = computed(() => {
  return buttonGroupCtx?.size ?? props?.size ?? "";
});
const type = computed(() => {
  return buttonGroupCtx?.type ?? props?.type ?? "";
});

const disabled = computed(() => {
  return buttonGroupCtx?.disabled || props?.disabled || false;
});
defineExpose<ButtonInstance>({
  ref: _ref,
});
</script>

<template>
  <!-- :class动态类 -->
  <!-- void 0会让属性完全不存在，而不是有一个值占位 -->
  <!-- is-disable是控制动态样式，而disabled是直接控制按钮不能点击 -->
  <component
    :is="props.tag"
    ref="_ref"
    class="er-button"
    :class="{
      [`er-button--${type}`]: type,
      [`er-button--${size}`]: size,
      'is-plain': props.plain,
      'is-round': props.round,
      'is-circle': props.circle,
      'is-disabled': disabled,
      'is-loading': props.loading,
    }"
    :disabled="props.disabled || props.loading ? true : void 0"
    :type="props.tag === 'button' ? props.nativeType : void 0"
    @click="(e: MouseEvent) =>
        useThrottle ? handClickThrottle(e) : handClick(e)"
  >
    <template v-if="props.loading">
      <slot name="loading">
        <er-icon
          class="loading-icon"
          :icon="props.loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <er-icon
      v-if="props.icon && !props.loading"
      :icon="props.icon"
      size="1x"
      :style="iconStyle"
    />
    <slot></slot>
  </component>
</template>

<style lang="css">
@import "./style.css";
</style>
