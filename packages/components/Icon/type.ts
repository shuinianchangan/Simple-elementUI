import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// 都是fontawesome自带的props, 仅新增了两个type和color与按钮对应
export interface IconProps {
  border?: boolean;
  fixedWidth?: boolean;
  flip?: "horizontal" | "vertical" | "both";
  icon: object | Array<string> | string | IconDefinition;
  mask?: object | Array<string> | string;
  listItem?: boolean;
  pull?: "right" | "left";
  pulse?: boolean;
  rotation?: 90 | 180 | 270 | "90" | "180" | "270";
  swapOpacity?: boolean;
  size?:
    | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x";
  spin?: boolean;
  transform?: object | string;
  symbol?: boolean | string;
  title?: string;
  inverse?: boolean;
  bounce?: boolean;
  shake?: boolean;
  beat?: boolean;
  fade?: boolean;
  beatFade?: boolean;
  spinPulse?: boolean;
  spinReverse?: boolean;
  type?: "primary" | "success" | "warning" | "danger" | "info";
  color?: string;
}
