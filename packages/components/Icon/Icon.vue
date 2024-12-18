<script setup lang="ts">
import { computed } from "vue";
import type { IconProps } from "./type";
import { omit } from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// inheritAttrs 处理未声明为 props 的属性
// Props 透传处理已声明的 props, 透传给子组件，也就是font-awesome-icon

defineOptions({
  name: "ErIcon",
  //   未定义的属性不会自动应用到根元素中，而是通过手动处理，$attrs手动绑定剩余属性
  inheritAttrs: false,
});

const props = defineProps<IconProps>();

// 抽离出两个自定义的属性，返回一个新对象
const filterProps = computed(() => omit(props, ["type", "color"]));

const customProps = computed(() => ({ color: props.color ?? void 0 }));
</script>

<template>
  <i
    class="er-icon"
    :class="{ [`er-icon-${props.type}`]: props.type }"
    :style="customProps"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style scoped>
@import "./style.css";
</style>
