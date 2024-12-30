import { each, isFunction, cloneDeep, assign } from "lodash-es";
import { watchEffect, useSlots, getCurrentInstance, type VNode } from "vue";

const _dfs = (nodes: VNode[], cb: (node: VNode) => void) => {
  each(nodes, (node) => {
    if (isFunction(cb)) cb(node);
    if (node.children) _dfs(node.children as VNode[], cb);
  });
};

export function useDisabledStyle() {
  const nodePropsMap = new Map();

  //   获取组件当前实例
  const instance = getCurrentInstance();
  //   和默认插槽中的Vnode数组
  const children = useSlots()?.default?.();

  watchEffect(() => {
    if (!instance?.props?.disabled) {
      _dfs(children || [], (node) => {
        if (nodePropsMap.has(node)) {
          node.props = nodePropsMap.get(node);
        }
      });
      return;
    }

    _dfs(children || [], (node) => {
      if (!node?.props) return;
      nodePropsMap.set(node, cloneDeep(node.props));
      //   修改为禁用状态的style
      node.props = assign(node?.props, {
        style: {
          cursor: "not-allowed",
          color: "var(--er-text-color-placeholder)",
        },
      });
    });
  });
}

export default useDisabledStyle;
