import {
  createVNode,
  h,
  isVNode,
  ref,
  render,
  type ComponentPublicInstance,
  type VNode,
  type VNodeProps,
} from "vue";
import type {
  MessageBoxProps,
  MessageBoxOptions,
  MessageBoxAction,
  MessageBoxCallback,
  IErMessageBox,
  MessageBoxInputData,
} from "./type";
import MessageBoxConstructor from "./MessageBox.vue";
import { isFunction, isString } from "lodash-es";

const MessageBoxInstanceMap = new Map<
  ComponentPublicInstance,
  {
    options: MessageBoxOptions;
    callback: MessageBoxCallback | void;
    resolve: (res: any) => void;
    reject: (res: any) => void;
  }
>();

function createInstance(props: MessageBoxProps, container: HTMLElement) {
  const visible = ref(false);
  //   props.message函数的返回值也是VNode
  const isVNodeMsg = isFunction(props?.message) || isVNode(props?.message);
  const genDefaultMessage = (message: VNode | (() => VNode)) => {
    if (isFunction(message)) {
      return message();
    }
    return message;
  };
  const vnode = createVNode(
    MessageBoxConstructor,
    {
      ...props,
      visible,
    } as VNodeProps,
    isVNodeMsg ? { default: genDefaultMessage(props.message as VNode) } : void 0
  );
  //   const VNode = h(MessageBoxConstructor, {
  //     ...props,
  //     visible,
  //   });
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
  return vnode.component;
}

function MessageBox(options: MessageBoxOptions): Promise<MessageBoxInputData>;

function MessageBox(options: MessageBoxOptions | string | VNode): Promise<any> {
  let callback: MessageBoxCallback | void;
  if (isString(options) || isVNode(options)) {
    options = {
      message: options,
    };
  } else {
    callback = options.callback;
  }

  return new Promise((resolve, reject) => {
    const vm = showMessage(options);
    MessageBoxInstanceMap.set(vm, { options, callback, resolve, reject });
  });
}
