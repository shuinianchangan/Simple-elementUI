import { h, isVNode, render, shallowReactive } from "vue";
import type {
  CreateMessageProps,
  Message,
  MessageFn,
  MessageHandler,
  MessageInstance,
  MessageParams,
  MessageProps,
  messageType,
} from "./type";
import { each, findIndex, isString, set, get } from "lodash-es";
import { useId, useZIndex } from "@toy-element/hooks";
import MessageConstructor from "./Message.vue";

export const messageDefaults = {
  type: "info",
  duration: 3000,
  offset: 10,
  transitionName: "fade-up",
} as const;

const instances: MessageInstance[] = shallowReactive([]);
const { nextZIndex } = useZIndex();

// 如果options是MessageOptions则直接返回，否则返回一个对象
function normalizeOptions(options: MessageParams): CreateMessageProps {
  const result =
    !options || isVNode(options) || isString(options)
      ? {
          message: options,
        }
      : options;

  return { ...messageDefaults, ...result } as CreateMessageProps;
}

function createMessage(props: CreateMessageProps): MessageInstance {
  const id = useId().value;
  const container = document.createElement("div");
  const destory = () => {
    const idx = findIndex(instances, (item) => item.id === id);
    if (idx === -1) return;

    instances.splice(idx, 1);
    render(null, container);
  };
  const _props: MessageProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory,
  };

  // 指令式调用的关键
  const vnode = h(MessageConstructor, _props);
  render(vnode, container);

  // 不需要挂载container，只需要挂载container的第一个元素，这样不会多出一层div
  document.body.appendChild(container.firstElementChild!);

  const vm = vnode.component!;
  const handler: MessageHandler = {
    close: () => {
      vm.exposed!.close();
    },
  };
  const instance: MessageInstance = {
    id,
    vnode,
    props: _props,
    vm,
    handler,
  };
  instances.push(instance);
  return instance;
}

export const message: MessageFn & Partial<Message> = function (options = {}) {
  const normalized = normalizeOptions(options);
  const instance = createMessage(normalized);
  return instance.handler;
};

// 基于当前实例id，获取上一个实例的bottomOffset
export function getLastBottomOffset(this: MessageProps): number {
  const idx = findIndex(instances, { id: this.id });
  if (idx <= 0) return 0;

  return get(instances, [idx - 1, "vm", "exposed", "bottomOffset", "value"]);
}

export function closeAll(type?: messageType) {
  each(instances, (instance) => {
    if (type) {
      instance.props.type === type && instance.handler.close();
      return;
    }
    instance.handler.close();
  });
}

// 修改为只读数组
const messageTypes = ["info", "success", "warning", "danger", "error"] as const;
// 遍历不同messageType，并且放在message上
each(messageTypes, (type) =>
  //  obj    key/path    value
  set(message, type, (options: MessageParams) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type });
  })
);

message.closeAll = closeAll;

export default message as Message;
