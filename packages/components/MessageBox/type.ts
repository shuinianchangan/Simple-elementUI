import { type Ref, type VNode } from "vue";
import { type messageType } from "../Message/type";
import { type ButtonType } from "../Button/type";

export type MessageBoxAction = "confirm" | "cancel" | "close";
export type MessageBoxType = "" | "prompt" | "alert" | "confirm";
export type MessageBoxCallback = (
  action: MessageBoxAction | { value: string; action: MessageBoxAction }
) => void;

export type MessageBoxInputData = {
  value: string;
  action: MessageBoxAction;
};

// 函数式调用返回值，使得多一种字符串类型返回值
// export type MessageBoxData = MessageBoxInputData & MessageBoxAction;

// 函数式调用参数
export interface MessageBoxOptions {
  title?: string;
  message?: string | VNode | (() => VNode);
  type?: messageType;
  boxType?: MessageBoxType;
  icon?: string;
  callback?: MessageBoxCallback;
  showClose?: boolean;
  showInput?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  cancelButtonLoading?: boolean;
  confirmButtonLoading?: boolean;
  cancelButtonDisabled?: boolean;
  confirmButtonDisabled?: boolean;

  cancelButtonType?: ButtonType;
  confirmButtonType?: ButtonType;
  roundButton?: boolean;

  center?: boolean;
  lockScroll?: boolean;
  closeOnClickModal?: boolean;

  inputPlaceholder?: string;
  inputValue?: string;
  inputType?: "text" | "textarea" | "password" | "number";

  buttonSize?: "default" | "small" | "large";
  beforeClose?: (
    action: MessageBoxAction,
    instance: MessageBoxOptions,
    done: () => void
  ) => void;
}

// SFC组件使用
export interface MessageBoxProps extends MessageBoxOptions {
  visible?: Ref<boolean>;
  doClose(): void;
  doAction(action: MessageBoxAction, inputVal?: string): void;
  destroy(): void;
}

// 两种函数调用方法
export type MessageBoxShortcutMethod = ((
  message: MessageBoxOptions["message"],
  title: MessageBoxOptions["title"],
  options?: MessageBoxOptions
) => Promise<MessageBoxInputData>) & // MessageBoxData
  ((
    message: MessageBoxOptions["message"],
    options?: MessageBoxOptions
  ) => Promise<MessageBoxInputData>); // MessageBoxData

export interface IErMessageBox {
  // 函数签名，本身就可以作为函数来调用
  (options: MessageBoxOptions | string | VNode): Promise<any>;

  alert: MessageBoxShortcutMethod;
  confirm: MessageBoxShortcutMethod;
  prompt: MessageBoxShortcutMethod;
  close(): void;
}
