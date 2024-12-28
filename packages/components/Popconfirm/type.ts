import type { ButtonType } from "../Button/type";

export type PopconfirmProps = {
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonType?: ButtonType;
  cancelButtonType?: ButtonType;
  icon?: string;
  iconColor?: string;
  hideIcon?: boolean;
  hideAfter?: number;
  width?: string;
};

export interface PopconfirmEmits {
  (e: "confirm", value: MouseEvent): void;
  (e: "cancel", value: MouseEvent): void;
}
