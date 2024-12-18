import type { Component, Ref } from "vue";

export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type ButtonSize = "large" | "default" | "small";
export type NativeType = "button" | "submit" | "reset";

export interface ButtonProps {
  tag?: string | Component;
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  nativeType?: NativeType;
  icon?: string;
  loading?: boolean;
  loadingIcon?: string;
  useThrottle?: boolean;
  throttleDuration?: number;
}

export interface ButtonGroupProps {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
}

export interface ButtonGroupContext {
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
}

// 定义一个函数接口，确定参数和返回值
export interface ButtonEmits {
  (e: "click", value: MouseEvent): void;
}

// 暴露出一个实例对象
export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
}
