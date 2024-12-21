<script setup lang="ts">
import { computed, inject } from "vue";
import ErIcon from "../Icon/Icon.vue";
import type { CollapseItemProps } from "./type";
import { COLLAPSE_CTX_KEY } from "./constants";

defineOptions({
  name: "ErCollapseItem",
});

const props = defineProps<CollapseItemProps>();
const ctx = inject(COLLAPSE_CTX_KEY);

const isActive = computed(() => {
  if (props.disabled) return false;
  return ctx?.activeNames.value?.includes(props.name);
});

function handleClick() {
  if (props.disabled) return;
  ctx?.handleItemClick(props.name);
}
</script>

<template>
  <div
    class="er-collapse-item"
    :class="{
      isdiabled: props.disabled,
    }"
  >
    <div
      class="er-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      @click="handleClick"
    >
      <span class="er-collapse-item__title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <er-icon icon="angle-right" class="header-angle" />
    </div>
  </div>
  <transition name="slide">
    <div class="er-collapse-item__wapper" v-show="isActive">
      <div class="er-collapse-item__content" :id="`item-content-${name}`">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style>
@import "./style.css";
</style>
