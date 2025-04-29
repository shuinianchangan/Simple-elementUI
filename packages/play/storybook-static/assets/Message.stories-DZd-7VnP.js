import { g as e, a as i } from "./index-BHJy8_XH.js";
import "./vue.esm-bundler-DnrAdbbo.js";
const d = {
    title: "Example/Message",
    component: e,
    tags: ["autodocs"],
    argTypes: {
      type: {
        control: "select",
        options: ["success", "warning", "error", "info"],
        description: "消息类型",
      },
      message: { control: "text", description: "消息内容" },
      duration: { control: "number", description: "显示时间，单位为毫秒" },
    },
  },
  s = {
    render: () => ({
      components: { ErButton: i },
      setup() {
        return {
          showMessage: () => {
            e({ message: "这是一条消息提示", type: "success" });
          },
        };
      },
      template: `
      <er-button @click="showMessage">显示消息</er-button>
    `,
    }),
  },
  n = {
    render: () => ({
      components: { ErButton: i },
      setup() {
        return {
          showSuccess: () => e.success("成功消息"),
          showWarning: () => e.warning("警告消息"),
          showError: () => e.error("错误消息"),
        };
      },
      template: `
      <div style="display: flex; gap: 16px;">
        <er-button @click="showSuccess">成功</er-button>
        <er-button @click="showWarning">警告</er-button>
        <er-button @click="showError">错误</er-button>
      </div>
    `,
    }),
  };
var r, o, t;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((r = s.parameters) == null ? void 0 : r.docs),
    source: {
      originalSource: `{
  render: () => ({
    components: {
      ErButton
    },
    setup() {
      const showMessage = () => {
        ErMessage({
          message: "这是一条消息提示",
          type: "success"
        });
      };
      return {
        showMessage
      };
    },
    template: \`
      <er-button @click="showMessage">显示消息</er-button>
    \`
  })
}`,
      ...((t = (o = s.parameters) == null ? void 0 : o.docs) == null
        ? void 0
        : t.source),
    },
  },
};
var c, a, u;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((c = n.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `{
  render: () => ({
    components: {
      ErButton
    },
    setup() {
      const showSuccess = () => ErMessage.success("成功消息");
      const showWarning = () => ErMessage.warning("警告消息");
      const showError = () => ErMessage.error("错误消息");
      return {
        showSuccess,
        showWarning,
        showError
      };
    },
    template: \`
      <div style="display: flex; gap: 16px;">
        <er-button @click="showSuccess">成功</er-button>
        <er-button @click="showWarning">警告</er-button>
        <er-button @click="showError">错误</er-button>
      </div>
    \`
  })
}`,
      ...((u = (a = n.parameters) == null ? void 0 : a.docs) == null
        ? void 0
        : u.source),
    },
  },
};
const h = ["Basic", "DifferentTypes"];
export {
  s as Basic,
  n as DifferentTypes,
  h as __namedExportsOrder,
  d as default,
};
