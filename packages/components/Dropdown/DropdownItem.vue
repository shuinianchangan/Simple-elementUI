<script setup lang="ts">
import type { DropdownItemProps } from "./type";
import { DROPDOWN_CTX_KEY } from "./constant";
import { inject, computed } from "vue";
import { useId } from "@toy-element/hooks";

defineOptions({
  name: "ErDropdownItem",
});

const props = withDefaults(defineProps<DropdownItemProps>(), {
  disabled: false,
  divided: false,
  command: useId().value,
});

const ctx = inject(DROPDOWN_CTX_KEY);
const size = computed(() => ctx?.size.value);

const handleClick = () => {
  if (props.disabled) return;
  ctx?.handleItemClick(props);
};
</script>

<template>
  <li v-if="props.divided" role="separator" class="divided-placeholder"></li>
  <li
    :id="`dropdown-item-${props.command || useId().value}`"
    class="er-dropdown__item"
    :class="{
      ['er-dropdown__item--' + size]: size,
      'is-disabled': props.disabled,
      'id-divided': props.divided,
    }"
    @click="handleClick"
  >
    <slot>
      {{ props.label }}
    </slot>
  </li>
</template>

<style scoped>
@import "./style.css";
</style>
