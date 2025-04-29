import { isVNode, render, h, shallowReactive } from "vue";
import type {
  CreateNotificationProps,
  NotificationFn,
  NotificationHandler,
  NotificationInstance,
  NotificationParams,
  NotificationProps,
  NotificationType,
  Notification,
} from "./type";
import { notificationPosition } from "./type";
import NotificationConstructor from "./Notification.vue";
import { each, findIndex, get, isString, set } from "lodash-es";
import { useId, useZIndex } from "@toy-element/hooks";

const notificationDefaults = {
  type: "info",
  duration: 3000,
  offset: 20,
  transitionName: "fade",
  showClose: true,
};

const { nextZIndex } = useZIndex();

function normalizeOptions(
  options: NotificationParams,
): CreateNotificationProps {
  const result =
    !options || isVNode(options) || isString(options)
      ? {
          message: options,
        }
      : options;

  return { ...notificationDefaults, ...result } as CreateNotificationProps;
}

const instancesMap: Map<NotificationProps["position"], NotificationInstance[]> =
  new Map();
each(notificationPosition, (key) => instancesMap.set(key, shallowReactive([])));

const getInstancesByPosition = (position: NotificationProps["position"]) =>
  instancesMap.get(position)!;

function createNotification(
  props: CreateNotificationProps,
): NotificationInstance {
  const id = useId().value;
  const container = document.createElement("div");
  //   这里的props只是函数调用的props，与Notification.vue中的props无关
  const instances = getInstancesByPosition(props.position || "top-right");
  const destory = () => {
    const idx = findIndex(instances, (item) => item.id === id);
    if (idx === -1) return;

    instances.splice(idx, 1);
    render(null, container);
  };
  const _props = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory,
  };

  // 指令式调用的关键
  const vnode = h(NotificationConstructor, _props);
  render(vnode, container);

  // 不需要挂载container，只需要挂载container的第一个元素，这样不会多出一层div
  document.body.appendChild(container.firstElementChild!);

  const vm = vnode.component!;
  const handler: NotificationHandler = {
    close: () => {
      vm.exposed!.close();
    },
  };
  const instance: NotificationInstance = {
    id,
    vnode,
    props: _props,
    vm,
    handler,
  };
  instances.push(instance);
  return instance;
}

export const notification: NotificationFn & Partial<Notification> = function (
  options: NotificationParams,
): NotificationHandler {
  const instance = createNotification(normalizeOptions(options));
  return instance.handler;
};

export function closeAll(type?: NotificationType) {
  // 将map中的所有instace都关闭
  instancesMap.forEach((instances) => {
    each(instances, (instance) => {
      if (type) {
        instance.props.type === type && instance.handler.close();
        return;
      }
      instance.handler.close();
    });
  });
}

notification.closeAll = closeAll;

export function getLastBottomOffset(this: NotificationProps) {
  const instances = getInstancesByPosition(this.position || "top-right");
  const idx = findIndex(instances, { id: this.id });

  if (idx <= 0) return 0;

  return get(instances, [idx - 1, "vm", "exposed", "bottomOffset", "value"]);
}

const notificationTypes = [
  "success",
  "warning",
  "info",
  "danger",
  "error",
] as const;

each(notificationTypes, (type) => {
  set(notification, type, (options: NotificationParams) => {
    const normalized = normalizeOptions(options);
    return notification({ ...normalized, type });
  });
});

export default notification as Notification;
