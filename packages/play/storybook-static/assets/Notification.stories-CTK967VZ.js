import "./index-DQLiMaGX.js";
import { i as o } from "./index-BHJy8_XH.js";
import "./vue.esm-bundler-DnrAdbbo.js";
const T = {
    title: "Example/Notification",
    component: o,
    tags: ["autodocs"],
    argTypes: {
      type: {
        control: "select",
        options: ["success", "warning", "info", "error", "danger"],
      },
      position: {
        control: "select",
        options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      },
    },
  },
  n = {
    render: (t) => ({
      setup() {
        return {
          showNotification: () => {
            o({ title: "标题", message: "这是一条通知消息", ...t });
          },
        };
      },
      template: `
      <div>
        <button @click="showNotification">显示通知</button>
      </div>
    `,
    }),
  },
  i = {
    render: (t) => ({
      setup() {
        return {
          showSuccess: () => {
            o.success({ title: "成功", message: "这是一条成功消息", ...t });
          },
          showWarning: () => {
            o.warning({ title: "警告", message: "这是一条警告消息", ...t });
          },
          showInfo: () => {
            o.info({ title: "消息", message: "这是一条消息提示", ...t });
          },
          showError: () => {
            o.error({ title: "错误", message: "这是一条错误消息", ...t });
          },
        };
      },
      template: `
      <div>
        <button @click="showSuccess" style="margin-right: 10px;">成功</button>
        <button @click="showWarning" style="margin-right: 10px;">警告</button>
        <button @click="showInfo" style="margin-right: 10px;">消息</button>
        <button @click="showError">错误</button>
      </div>
    `,
    }),
  },
  s = {
    render: (t) => ({
      setup() {
        return {
          showTopRight: () => {
            o({
              title: "右上角",
              message: "这是一条通知消息",
              position: "top-right",
              ...t,
            });
          },
          showTopLeft: () => {
            o({
              title: "左上角",
              message: "这是一条通知消息",
              position: "top-left",
              ...t,
            });
          },
          showBottomRight: () => {
            o({
              title: "右下角",
              message: "这是一条通知消息",
              position: "bottom-right",
              ...t,
            });
          },
          showBottomLeft: () => {
            o({
              title: "左下角",
              message: "这是一条通知消息",
              position: "bottom-left",
              ...t,
            });
          },
        };
      },
      template: `
      <div>
        <button @click="showTopRight" style="margin-right: 10px;">右上角</button>
        <button @click="showTopLeft" style="margin-right: 10px;">左上角</button>
        <button @click="showBottomRight" style="margin-right: 10px;">右下角</button>
        <button @click="showBottomLeft">左下角</button>
      </div>
    `,
    }),
  },
  e = {
    render: (t) => ({
      setup() {
        return {
          showNotification: () => {
            o({
              title: "自定义时长",
              message: "这条通知会在 10 秒后关闭",
              duration: 1e4,
              ...t,
            });
          },
          showNoDuration: () => {
            o({
              title: "不会自动关闭",
              message: "这条通知不会自动关闭",
              duration: 0,
              ...t,
            });
          },
        };
      },
      template: `
      <div>
        <button @click="showNotification" style="margin-right: 10px;">10秒后关闭</button>
        <button @click="showNoDuration">不自动关闭</button>
      </div>
    `,
    }),
  };
var a, h, u;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((a = n.parameters) == null ? void 0 : a.docs),
    source: {
      originalSource: `{
  render: args => ({
    setup() {
      const showNotification = () => {
        ErNotification({
          title: "标题",
          message: "这是一条通知消息",
          ...args
        });
      };
      return {
        showNotification
      };
    },
    template: \`
      <div>
        <button @click="showNotification">显示通知</button>
      </div>
    \`
  })
}`,
      ...((u = (h = n.parameters) == null ? void 0 : h.docs) == null
        ? void 0
        : u.source),
    },
  },
};
var g, m, p;
i.parameters = {
  ...i.parameters,
  docs: {
    ...((g = i.parameters) == null ? void 0 : g.docs),
    source: {
      originalSource: `{
  render: args => ({
    setup() {
      const showSuccess = () => {
        ErNotification.success({
          title: "成功",
          message: "这是一条成功消息",
          ...args
        });
      };
      const showWarning = () => {
        ErNotification.warning({
          title: "警告",
          message: "这是一条警告消息",
          ...args
        });
      };
      const showInfo = () => {
        ErNotification.info({
          title: "消息",
          message: "这是一条消息提示",
          ...args
        });
      };
      const showError = () => {
        ErNotification.error({
          title: "错误",
          message: "这是一条错误消息",
          ...args
        });
      };
      return {
        showSuccess,
        showWarning,
        showInfo,
        showError
      };
    },
    template: \`
      <div>
        <button @click="showSuccess" style="margin-right: 10px;">成功</button>
        <button @click="showWarning" style="margin-right: 10px;">警告</button>
        <button @click="showInfo" style="margin-right: 10px;">消息</button>
        <button @click="showError">错误</button>
      </div>
    \`
  })
}`,
      ...((p = (m = i.parameters) == null ? void 0 : m.docs) == null
        ? void 0
        : p.source),
    },
  },
};
var l, w, f;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((l = s.parameters) == null ? void 0 : l.docs),
    source: {
      originalSource: `{
  render: args => ({
    setup() {
      const showTopRight = () => {
        ErNotification({
          title: "右上角",
          message: "这是一条通知消息",
          position: "top-right",
          ...args
        });
      };
      const showTopLeft = () => {
        ErNotification({
          title: "左上角",
          message: "这是一条通知消息",
          position: "top-left",
          ...args
        });
      };
      const showBottomRight = () => {
        ErNotification({
          title: "右下角",
          message: "这是一条通知消息",
          position: "bottom-right",
          ...args
        });
      };
      const showBottomLeft = () => {
        ErNotification({
          title: "左下角",
          message: "这是一条通知消息",
          position: "bottom-left",
          ...args
        });
      };
      return {
        showTopRight,
        showTopLeft,
        showBottomRight,
        showBottomLeft
      };
    },
    template: \`
      <div>
        <button @click="showTopRight" style="margin-right: 10px;">右上角</button>
        <button @click="showTopLeft" style="margin-right: 10px;">左上角</button>
        <button @click="showBottomRight" style="margin-right: 10px;">右下角</button>
        <button @click="showBottomLeft">左下角</button>
      </div>
    \`
  })
}`,
      ...((f = (w = s.parameters) == null ? void 0 : w.docs) == null
        ? void 0
        : f.source),
    },
  },
};
var b, d, N;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((b = e.parameters) == null ? void 0 : b.docs),
    source: {
      originalSource: `{
  render: args => ({
    setup() {
      const showNotification = () => {
        ErNotification({
          title: "自定义时长",
          message: "这条通知会在 10 秒后关闭",
          duration: 10000,
          ...args
        });
      };
      const showNoDuration = () => {
        ErNotification({
          title: "不会自动关闭",
          message: "这条通知不会自动关闭",
          duration: 0,
          ...args
        });
      };
      return {
        showNotification,
        showNoDuration
      };
    },
    template: \`
      <div>
        <button @click="showNotification" style="margin-right: 10px;">10秒后关闭</button>
        <button @click="showNoDuration">不自动关闭</button>
      </div>
    \`
  })
}`,
      ...((N = (d = e.parameters) == null ? void 0 : d.docs) == null
        ? void 0
        : N.source),
    },
  },
};
const B = ["Basic", "WithType", "WithPosition", "WithDuration"];
export {
  n as Basic,
  e as WithDuration,
  s as WithPosition,
  i as WithType,
  B as __namedExportsOrder,
  T as default,
};
