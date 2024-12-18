<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./type";
import { throttle } from "lodash-es";

defineOptions({
  name: "ErButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
});

const emits = defineEmits<ButtonEmits>();

const handClick = (e: MouseEvent) => emits("click", e);
// 节流函数会实现参数的透传，所以调用时传递的event参数，还是会放在handClick中
const handClickThrottle = throttle(handClick, props.throttleDuration);

const slot = defineSlots();
const _ref = ref<HTMLButtonElement>();

defineExpose<ButtonInstance>({
  ref: _ref,
});
</script>

<template>
  <!-- :class动态类 -->
  <!-- void 0会让属性完全不存在，而不是有一个值占位 -->
  <component
    :is="props.tag"
    ref="_ref"
    class="er-button"
    :class="{
      [`er-button--${props.type}`]: props.type,
      [`er-button--${props.size}`]: props.size,
      'is-plain': props.plain,
      'is-round': props.round,
      'is-circle': props.circle,
      'is-disabled': props.disabled,
      'is-loading': props.loading,
    }"
    :disabled="props.disabled || props.loading ? true : void 0"
    :type="props.tag === 'button' ? props.nativeType : void 0"
    @click="(e: MouseEvent) =>
        useThrottle ? handClickThrottle(e) : handClick(e)"
  >
    <slot></slot>
  </component>
</template>

<style lang="css">
@import "./style.css";
</style>
