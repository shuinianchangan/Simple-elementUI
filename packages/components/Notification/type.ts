import type { VNode, ComponentInternalInstance } from "vue";

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "error";

export interface NotificationHandler {
  close(): void;
}
export const notificationPosition = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
] as const;
export type NotificationPosition = (typeof notificationPosition)[number];

export type NotificationParams = string | VNode | NotificationOptions;

export type NotificationFn = {
  (props: NotificationParams): NotificationHandler; // 调用签名,表示MessageFn可以直接调用,并且返回一个handler函数
  closeAll(type?: NotificationType): void;
};

export type NotificationTypeFn = (
  props: NotificationParams
) => NotificationHandler;

// 定义Message的外部函数
export interface Notification extends NotificationFn {
  success: NotificationTypeFn;
  warning: NotificationTypeFn;
  info: NotificationTypeFn;
  danger: NotificationTypeFn;
  error: NotificationTypeFn;
}

// 消息组件接口，给SFC使用，在其它部分使用直接采取插件的方式，调用Message函数即可
export interface NotificationProps {
  id: string;
  title: string;
  zIndex: number;
  position: NotificationPosition;

  message?: string | VNode | (() => VNode);
  duration?: number;
  showClose?: boolean;
  type?: NotificationType;
  offset?: number;
  transitionName?: string;
  icon?: string;

  onClick?(): void;
  onClose?(): void;
  onDestory(): void;
}

export type NotificationOptions = Partial<Omit<NotificationProps, "id">>;

// 消息实例接口，给内部使用
export interface NotificationInstance {
  id: string;
  vnode: VNode;
  props: NotificationProps;
  vm: ComponentInternalInstance;
  handler: NotificationHandler;
}

export type CreateNotificationProps = Omit<
  NotificationProps,
  "onDestory" | "id" | "zIndex"
>;
