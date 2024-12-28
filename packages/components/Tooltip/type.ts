import type { Placement, Options } from "@popperjs/core";

export type TooltipProps = {
  content?: string;
  disabled?: boolean;
  //   控制弹出位置
  placement?: Placement;
  trigger?: "hover" | "click" | "contextmenu";
  manual?: boolean;
  //   对于popper进行精细配置，加上partial之后，只需要配置自己想要配置的即可
  popperOptions?: Partial<Options>;
  transition?: string;
  showTimeout?: number;
  hideTimeout?: number;
};

export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}

export interface TooltipEmits {
  (e: "visible-change", visible: boolean): void;
  (e: "click-outside"): void;
}
