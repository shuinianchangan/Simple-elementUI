<script setup lang="ts">
import type { ButtonGroupProps } from "./type";
import { provide, reactive, toRef } from "vue";
import { BUTTON_GROUP_CTX_KEY } from "./constant";

defineOptions({
  name: "ErButtonGroup",
});

const props = defineProps<ButtonGroupProps>();

// toRef 创建了与原始 props 的响应式引用
// 注入，且交互式统一管理，在父组件变换时，子组件也跟着变换
provide(
  BUTTON_GROUP_CTX_KEY,
  reactive({
    size: toRef(props, "size"),
    type: toRef(props, "type"),
    disabled: toRef(props, "disabled"),
  }),
);
</script>

<template>
  <div class="er-button-group">
    <slot></slot>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
