import type { VNode, ComponentInternalInstance } from "vue";

export type messageType = "info" | "success" | "warning" | "danger" | "error";

export interface MessageHandler {
  close(): void;
}

export type MessageParams = string | VNode | MessageOptions;

export type MessageFn = {
  (props: MessageParams): MessageHandler; // 调用签名,表示MessageFn可以直接调用,并且返回一个handler函数
  closeAll(type?: messageType): void;
};

export type MessageTypeFn = (props: MessageParams) => MessageHandler;

// 定义Message的外部函数
export interface Message extends MessageFn {
  success: MessageTypeFn;
  warning: MessageTypeFn;
  info: MessageTypeFn;
  danger: MessageTypeFn;
  error: MessageTypeFn;
}

// 消息组件接口，给SFC使用，在其它部分使用直接采取插件的方式，调用Message函数即可
export interface MessageProps {
  id: string;
  message?: string | VNode | (() => VNode);
  duration?: number;
  showClose?: boolean;
  center?: boolean;
  type?: messageType;
  offset?: number;
  zIndex: number;
  transitionName?: string;
  onDestory(): void;
}

export type MessageOptions = Partial<Omit<MessageProps, "id">>;

// 消息实例接口，给内部使用
export interface MessageInstance {
  id: string;
  vnode: VNode;
  props: MessageProps;
  vm: ComponentInternalInstance;
  handler: MessageHandler;
}

export type CreateMessageProps = Omit<
  MessageProps,
  "onDestory" | "id" | "zIndex"
>;
