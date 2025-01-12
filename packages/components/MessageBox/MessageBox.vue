<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch, type Ref } from "vue";
import type { MessageBoxAction, MessageBoxProps } from "./type";
import type { InputInstance } from "../Input/type";

import { useId, useZIndex } from "@toy-element/hooks";
import { isFunction, isNil } from "lodash-es";
import { typeIconMap } from "@toy-element/utils";

import ErOverlay from "../Overlay/Overlay.vue";
import ErIcon from "../Icon/Icon.vue";
import ErButton from "../Button/Button.vue";
import ErInput from "../Input/Input.vue";

defineOptions({
  name: "ErMessageBox",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<MessageBoxProps>(), {
  lockScroll: true,
  showClose: true,
  closeOnClickModal: true,
  confirmButtonType: "primary",
  roundButton: false,
  boxType: "",
  inputValue: "",
  inputPlaceholder: "Please input...",
  confirmButtonText: "Ok",
  cancelButtonText: "Cancel",
  showConfirmButton: true,
});
const { doAction } = props;

const { nextZIndex } = useZIndex();
const state = reactive({
  ...props,
  zIndex: nextZIndex(),
});

const hasMessage = computed(() => isNil(props.message));
const iconComponent = computed(() => {
  return props.icon ?? typeIconMap.get(props.type ?? "");
});

const headerRef = ref<HTMLElement>();
const inputRef = ref<InputInstance>();
const inputId = useId();

function handleAction(action: MessageBoxAction) {
  isFunction(props.beforeClose)
    ? props.beforeClose(action, state, () => doAction(action, state.inputValue))
    : doAction(action, state.inputValue);
}
function handleClose() {
  handleAction("close");
}

function handleWrapperClick() {
  props.closeOnClickModal && handleAction("close");
}

function handleInputEnter(e: KeyboardEvent) {
  if (state.inputType === "textarea") return;
  e.preventDefault();
  return handleAction("confirm");
}

watch(
  () => props.visible?.value,
  (val) => {
    if (!val) return;
    else state.zIndex = nextZIndex();
    // 不是prompt类型，不聚焦
    if (props.boxType !== "prompt") return;
    else
      nextTick(() => {
        inputRef.value && inputRef.value.focus();
      });
  }
);
</script>

<template>
  <transition name="fade-in-linear" @after-leave="destroy">
    <er-overlay v-show="(visible as Ref).value" :z-index="state.zIndex" mask>
      <div
        role="dialog"
        class="er-overlay-message-box"
        @click="handleWrapperClick"
      >
        <div
          ref="rootRef"
          :class="[
            'er-message-box',
            {
              'is-center': props.center,
            },
          ]"
          @click.stop
        >
          <div
            v-if="!isNil(props.title)"
            ref="headerRef"
            class="er-message-box__header"
            :class="{ 'show-close': props.showClose }"
          >
            <div class="er-message-box__title">
              <er-icon
                v-if="iconComponent && props.center"
                :class="{
                  [`er-icon-${props.type}`]: props.type,
                }"
                :icon="iconComponent"
              />
              {{ props.title }}
            </div>
            <button
              v-if="showClose"
              class="er-message-box__header-btn"
              @click.stop="handleClose"
            >
              <er-icon icon="xmark" />
            </button>
          </div>
          <div class="er-message-box__content">
            <er-icon
              v-if="iconComponent && !props.center && hasMessage"
              :class="{
                [`er-icon-${props.type}`]: props.type,
              }"
              :icon="iconComponent"
            />
            <div v-if="hasMessage" class="er-message-box__message">
              <slot>
                <!-- 通过for属性绑定inputId -->
                <!-- 需要用户输入时，使用label，而只展示消息时，使用p -->
                <component
                  :is="props.showInput ? 'label' : 'p'"
                  :for="props.showInput ? inputId : void 0"
                >
                  {{ props.message }}
                </component>
              </slot>
            </div>
          </div>
          <div v-show="props.showInput" class="er-message-box__input">
            <er-input
              v-model="props.inputValue"
              ref="inputRef"
              :placeholder="props.inputPlaceholder"
              :type="props.inputType"
              @keyup.enter="handleInputEnter"
            />
          </div>
          <div class="er-message-box__footer">
            <er-button
              v-if="props.showCancelButton"
              class="er-message-box__footer-btn er-message-box__cancel-btn"
              :type="props.cancelButtonType"
              :round="props.roundButton"
              :loading="props.cancelButtonLoading"
              @click="handleAction('cancel')"
              @keydown.prevent.enter="handleAction('cancel')"
              >{{ props.cancelButtonText }}</er-button
            >
            <er-button
              v-show="props.showConfirmButton"
              class="er-message-box__footer-btn er-message-box__confirm-btn"
              :type="props.confirmButtonType ?? 'primary'"
              :round="props.roundButton"
              :loading="props.confirmButtonLoading"
              @click="handleAction('confirm')"
              @keydown.prevent.enter="handleAction('confirm')"
              >{{ props.confirmButtonText }}</er-button
            >
          </div>
        </div>
      </div>
    </er-overlay>
  </transition>
</template>

<style scoped></style>
