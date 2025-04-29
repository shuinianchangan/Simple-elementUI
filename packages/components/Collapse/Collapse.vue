<script setup lang="ts">
import { provide, ref, watch } from "vue";
import type { CollapseEmits, CollapseItemName, CollapseProps } from "./type";
import { COLLAPSE_CTX_KEY } from "./constants";
import { debugWarn } from "@toy-element/utils";

defineOptions({
  name: "ErCollapse",
});

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();
// 一个数组,存放所有激活的名字
const activeNames = ref<CollapseItemName[]>(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    // 确保外部触发(比如说按钮点击，然后修改activeName)更新状态时，依然可以改变 父组件更新 modelValue -> watch -> updateActiveName
    activeNames.value = val;
    if (props.accordion && Array.isArray(val) && val.length > 1) {
      debugWarn(
        "ErCollapse",
        "accordion mode should only have one active item",
      );
      return;
    }
  },
  { immediate: true },
);

function handleItemClick(item: CollapseItemName) {
  let _activeName = [...activeNames.value];
  if (props.accordion) {
    // 如果是手风琴模式，则更改成只包含一个数的数组
    _activeName = [_activeName[0] === item ? "" : item];
    // 内部触发事件(用户点击 -> handleItemClick -> updateActiveName)
    updateActiveName(_activeName);
    return;
  }

  const index = _activeName.indexOf(item);
  if (index > -1) {
    // 如果存在，则删除自身
    _activeName.splice(index, 1);
  } else {
    _activeName.push(item);
  }

  updateActiveName(_activeName);
}

function updateActiveName(_activeName: CollapseItemName[]) {
  activeNames.value = _activeName;
  emits("update:modelValue", _activeName);
  emits("change", _activeName);
}

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
});
</script>

<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<style>
@import "./style.css";
</style>
