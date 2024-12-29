<script setup lang="ts">
import type { PopconfirmEmits, PopconfirmProps } from "./type";
import ErButton from "../Button/Button.vue";
import ErIcon from "../Icon/Icon.vue";
import ErTooltip from "../Tooltip/Tooltip.vue";
import type { TooltipInstance } from "toy-element";
import { addUnit } from "@toy-element/utils";
import { computed, ref } from "vue";

defineOptions({
  name: "ErPopconfirm",
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
  confirmButtonText: "Yes",
  cancelButtonText: "No",
  confirmButtonType: "primary",
  icon: "question-circle",
  iconColor: "#f90",
  hideAfter: 200,
  width: 150,
});

const style = computed(() => {
  return {
    width: addUnit(props.width),
  };
});

const emits = defineEmits<PopconfirmEmits>();
const tooltipRef = ref<TooltipInstance>();

function hidePopper() {
  tooltipRef.value?.hide();
}

function handleConfirm(e: MouseEvent) {
  emits("confirm", e);
  hidePopper();
}

function handleCancel(e: MouseEvent) {
  emits("cancel", e);
  hidePopper();
}
</script>

<template>
  <!-- 封装到文字提示的内容插槽中 -->
  <er-tooltip ref="tooltipRef" trigger="click" :hide-timeout="props.hideAfter">
    <template #content>
      <div class="er-popconfirm" :style="style">
        <div class="er-popconfirm__main">
          <er-icon
            v-if="!props.hideIcon && props.icon"
            :icon="props.icon"
            :color="props.iconColor"
          />
          {{ props.title }}
        </div>
        <div class="er-popconfirm__action">
          <er-button
            size="small"
            class="er-popconfirm__cancel"
            :type="props.cancelButtonType"
            @click="handleCancel"
          >
            <!-- TODO: 国际化 -->
            {{ props.cancelButtonText }}
          </er-button>
          <er-button
            size="small"
            class="er-popconfirm__confirm"
            :type="props.confirmButtonType"
            @click="handleConfirm"
          >
            {{ props.confirmButtonText }}
          </er-button>
        </div>
      </div>
    </template>

    <!-- 条件性渲染插槽的方式，可以避免在没有内容时渲染空的插槽容器。 -->
    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>
  </er-tooltip>
</template>

<style scoped>
@import "./style.css";
</style>
