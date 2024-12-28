<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import type { AlertEmits, AlertProps, AlertInstance } from "./type";
import { typeIconMap } from "@toy-element/utils";
import ErIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ErAlert",
});

const props = withDefaults(defineProps<AlertProps>(), {
  effect: "light",
  type: "info",
  closable: true,
});

const emits = defineEmits<AlertEmits>();
const visible = ref(true);
const slots = useSlots();

function close() {
  visible.value = false;
  //   向父组件触发事件，事件向上原则
  emits("close");
}
function open() {
  visible.value = true;
}

defineExpose<AlertInstance>({
  close,
  open,
});

const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");
const withDescription = computed(() => props.description || slots.default);
</script>

<template>
  <transition name="er-alert-fade">
    <div
      v-show="visible"
      class="er-alert"
      role="alert"
      :class="{
        [`er-alert__${type}`]: type,
        [`er-alert__${effect}`]: effect,
        'text-center': center,
      }"
    >
      <er-icon
        v-if="props.showIcon"
        class="er-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />
      <div class="er-alert__content">
        <span
          class="er-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !props.showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ props.title }}</slot>
        </span>
        <p class="er-alert__description">
          <slot>{{ props.description }}</slot>
        </p>
        <div class="er-alert__close" v-if="props.closable">
          <er-icon @click.stop="close" icon="xmark" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
@import "./style.css";
</style>
