import type { ComputedRef } from "vue";
import type { ButtonType, ButtonSize } from "../Button/type";
import type { TooltipProps } from "toy-element";

export type DropdownProps = TooltipProps & {
  type?: ButtonType;
  size?: ButtonSize;
  splitButton?: boolean;
  hideOnClick?: boolean;
  items?: DropdownItemProps[];
};

export type DropdownItemProps = {
  command?: string | number;
  label?: string;
  disabled?: boolean;
  divided?: boolean;
};

// 事件触发主要是子组件给父组件传递值，具体操作是父组件执行
export interface DropdownEmits {
  (e: "click", event: MouseEvent): void;
  (e: "visible-change", visible: boolean): void;
  //   点击菜单项触发
  (e: "command", command: string | number): void;
}

export interface DropdownInstance {
  open: () => void;
  close: () => void;
}

export interface DropdownContext {
  handleItemClick: (item: DropdownItemProps) => void;
  //   返回值只读
  size: ComputedRef<ButtonSize | undefined>;
}
