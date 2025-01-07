<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, type Ref, watch } from "vue";
import type { InputProps, InputEmits, InputInstance } from "./type";
import { noop } from "lodash-es";
import useFocusController from "@toy-element/hooks/useFocusController";
import ErIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ErInput",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
});
const emits = defineEmits<InputEmits>();

const innerValue = ref(props.modelValue);
const passwordVisible = ref(false);

const inputRef = ref<HTMLInputElement | null>();
const textareaRef = ref<HTMLTextAreaElement | null>();

const _ref = computed(() =>
  inputRef.value ? inputRef.value : textareaRef.value
) as Ref;

const { wrapper, isFocused, handleFocus, handleBlur } = useFocusController(
  _ref,
  {
    afterFocus: () => {
      // todo表单校验
      console.log("afterFocus");
    },
  }
);

const attrs = useAttrs();

const isDisabled = computed(() => props.disabled);
const showClear = computed(
  () =>
    props.clearable &&
    !!innerValue.value &&
    !isDisabled.value &&
    isFocused.value
);
const showPassword = computed(() => props.showPassword);
const showPasswordArea = computed(() => {
  return (
    props.type === "password" &&
    props.showPassword &&
    !isDisabled.value &&
    !!innerValue.value
  );
});

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleInput = () => {
  emits("update:modelValue", innerValue.value);
  emits("input", innerValue.value);
};
const handleChange = () => {
  emits("change", innerValue.value);
};

const clear: InputInstance["clear"] = () => {
  innerValue.value = "";
  emits("update:modelValue", innerValue.value);
  emits("input", innerValue.value);
  emits("change", innerValue.value);
  emits("clear");

  // todo 清空校验
};

const blur: InputInstance["blur"] = () => {
  _ref.value?.blur();
};
const focus: InputInstance["focus"] = async () => {
  await nextTick();
  _ref.value?.focus();
};
const select: InputInstance["select"] = () => {
  _ref.value?.select();
};

defineExpose({
  _ref,
  clear,
  blur,
  focus,
  select,
});

watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = value;
  }
);
</script>

<template>
  <div
    class="er-input"
    :class="{
      [`er-input--${props.type}`]: props.type,
      [`er-input--${props.size}`]: props.size,
      'is-disabled': isDisabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocused,
    }"
  >
    <!-- textarea -->
    <template v-if="props.type === 'textarea'">
      <textarea
        class="er-textarea__wrapper"
        ref="textareaRef"
        :id="props.id"
        :disabled="isDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        v-bind="attrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>

    <!-- input -->
    <template v-else>
      <!-- 前置元素 -->
      <div v-if="$slots.prepend" class="er-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="er-input__wrapper" ref="wrapper">
        <!-- 前缀 -->
        <span v-if="$slots.prefix" class="er-input__prefix">
          <slot name="prefix" />
        </span>
        <!-- 输入框 -->
        <input
          class="er-input__inner"
          ref="inputRef"
          :id="props.id"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="isDisabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          v-bind="attrs"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- 后缀 -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="er-input__suffix"
        >
          <slot name="suffix">
            <er-icon
              icon="circle-xmark"
              v-if="showClear"
              class="er-input__clear"
              @click="clear"
              @mousedown.prevent="noop"
            />
            <er-icon
              icon="eye"
              v-if="showPasswordArea && passwordVisible"
              class="er-input__password"
              @click="togglePasswordVisible"
            />
            <er-icon
              icon="eye-slash"
              v-if="showPasswordArea && !passwordVisible"
              class="er-input__password"
              @click="togglePasswordVisible"
            />
          </slot>
        </span>
      </div>
      <!-- 后置元素 -->
      <div v-if="$slots.append" class="er-input__append">
        <slot name="append"></slot>
      </div>
    </template>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
