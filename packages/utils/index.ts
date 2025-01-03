import { isFunction } from "lodash-es";
import { defineComponent } from "vue";

// 圆形图标
export const typeIconMap = new Map([
  ["info", "circle-info"],
  ["success", "check-circle"],
  ["warning", "circle-exclamation"],
  ["danger", "circle-xmark"],
  ["error", "circle-xmark"],
]);

export const RenderVnode = defineComponent({
  props: {
    vNode: {
      type: [String, Object, Function],
      required: true,
    },
  },
  setup(props) {
    return () => {
      if (isFunction(props.vNode)) {
        return props.vNode();
      }
      return props.vNode;
    };
  },
});

export * from "./install";
export * from "./error";
export * from "./style";
