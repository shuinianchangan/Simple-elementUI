<!-- todo -->
<!-- 虚拟触发并没有完成，定位准确但是并事件触发不正确 -->

<script setup lang="ts">
import { isNil, omit } from "lodash-es";
import { computed, provide, ref, watch } from "vue";
import type { DropdownEmits, DropdownItemProps, DropdownProps } from "./type";
import { ErButton, ErButtonGroup } from "../Button/index";
import { ErTooltip } from "../Tooltip/index";
import { ErDropdownItem } from "./index";
import type { ButtonInstance } from "../Button/type";
import type { TooltipInstance } from "../Tooltip/type";
import { DROPDOWN_CTX_KEY } from "./constant";
import { useDisabledStyle } from "@toy-element/hooks";

defineOptions({
  name: "ErDropdown",
});

const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true,
  items: () => [] as DropdownItemProps[],
});
const tooltipProps = computed(() =>
  omit(props, ["type", "size", "splitButton", "hideOnClick", "items"])
);

// 控制tooltips的显示和隐藏
const tooltipRef = ref<TooltipInstance>();
// 控制虚拟触发
const triggerRef = ref<ButtonInstance>();
const emit = defineEmits<DropdownEmits>();

function handleItemClick(item: DropdownItemProps) {
  if (props.hideOnClick) {
    tooltipRef.value?.hide();
  }
  if (!isNil(item.command)) emit("command", item.command);
}

// 使用钩子，自动修改禁用样式
useDisabledStyle();

provide(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size),
});

const virtualTriggerEl = computed(() => {
  return triggerRef.value?.ref;
});

// 检查引用链
// watch(
//   () => triggerRef.value?.ref?.value,
//   (newVal) => {
//     console.log("triggerRef:", triggerRef.value); // 检查 ButtonInstance
//     console.log("triggerRef.ref:", triggerRef.value?.ref); // 检查 ref 属性
//     console.log("triggerRef.ref.value:", newVal); // 检查最终的 DOM 元素
//   }
// );

defineExpose({
  open: () => tooltipRef?.value?.show(),
  close: () => tooltipRef?.value?.hide(),
});
</script>

<template>
  <div class="er-dropdown" :class="{ 'is-disabled': props.disabled }">
    <!-- template中ref自动解包? -->
    <er-tooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="props.splitButton"
      :virtual-ref="virtualTriggerEl"
      @visible-change="$emit('visible-change', $event)"
    >
      <!-- 使用splitButton时，会分为两个按钮，使用一个按钮组包装 -->
      <er-button-group
        :type="props.type"
        :size="props.size"
        :disabled="props.disabled"
        v-if="props.splitButton"
      >
        <er-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </er-button>
        <er-button ref="triggerRef" icon="angle-down" />
      </er-button-group>
      <!-- 未使用splitButton，直接使用默认插槽 -->
      <slot v-else name="default"></slot>

      <template #content>
        <ul class="er-dropdown__menu">
          <!-- dropdown插槽 -->
          <slot name="dropdown">
            <template v-for="item in props.items" :key="item.command">
              <er-dropdown-item v-bind="item" />
            </template>
          </slot>
        </ul>
      </template>
    </er-tooltip>
  </div>
</template>

<style scoped>
@import "./style.css";

:deep(.er-button-group) {
  & > :last-child {
    padding: 5px 7px;
  }
}
</style>
