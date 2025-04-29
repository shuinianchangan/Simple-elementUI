import "./index-DQLiMaGX.js";
import { h as t } from "./index-BHJy8_XH.js";
import "./vue.esm-bundler-DnrAdbbo.js";
const b = {
    title: "Example/MessageBox",
    component: t,
    tags: ["autodocs"],
    argTypes: {
      type: {
        control: "select",
        options: ["success", "warning", "info", "error"],
      },
      boxType: {
        control: "select",
        options: ["", "alert", "confirm", "prompt"],
      },
      confirmButtonType: {
        control: "select",
        options: ["primary", "success", "warning", "danger", "info"],
      },
      cancelButtonType: {
        control: "select",
        options: ["primary", "success", "warning", "danger", "info"],
      },
      inputType: {
        control: "select",
        options: ["text", "textarea", "password", "number"],
      },
    },
  },
  o = {
    render: (n) => ({
      setup() {
        return {
          showAlert: () => {
            t.alert("这是一条警告消息", "提示", {
              confirmButtonText: "确定",
              type: "warning",
              ...n,
            }).then(() => {
              console.log("Alert confirmed");
            });
          },
        };
      },
      template: `
      <div>
        <button @click="showAlert">显示 Alert</button>
      </div>
    `,
    }),
  },
  e = {
    render: (n) => ({
      setup() {
        return {
          showConfirm: () => {
            t.confirm("此操作将永久删除该文件, 是否继续?", "警告", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              ...n,
            })
              .then(() => {
                console.log("Confirm action confirmed");
              })
              .catch(() => {
                console.log("Confirm action cancelled");
              });
          },
        };
      },
      template: `
      <div>
        <button @click="showConfirm">显示 Confirm</button>
      </div>
    `,
    }),
  },
  r = {
    render: (n) => ({
      setup() {
        return {
          showPrompt: () => {
            t.prompt("请输入邮箱", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              inputPattern:
                /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
              inputErrorMessage: "邮箱格式不正确",
              ...n,
            })
              .then(({ value: C }) => {
                console.log(`Prompt input value: ${C}`);
              })
              .catch(() => {
                console.log("Prompt cancelled");
              });
          },
        };
      },
      template: `
      <div>
        <button @click="showPrompt">显示 Prompt</button>
      </div>
    `,
    }),
  },
  s = {
    render: (n) => ({
      setup() {
        return {
          showCustom: () => {
            t({
              title: "自定义内容",
              message: "<strong>这是 <i>HTML</i> 字符串</strong>",
              dangerouslyUseHTMLString: !0,
              confirmButtonText: "确定",
              ...n,
            });
          },
        };
      },
      template: `
      <div>
        <button @click="showCustom">显示自定义内容</button>
      </div>
    `,
    }),
  };
var a, i, m;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((a = o.parameters) == null ? void 0 : a.docs),
    source: {
      originalSource: `{
  render: args => ({
    setup() {
      const showAlert = () => {
        ErMessageBox.alert("这是一条警告消息", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          ...args
        }).then(() => {
          console.log("Alert confirmed");
        });
      };
      return {
        showAlert
      };
    },
    template: \`
      <div>
        <button @click="showAlert">显示 Alert</button>
      </div>
    \`
  })
}`,
      ...((m = (i = o.parameters) == null ? void 0 : i.docs) == null
        ? void 0
        : m.source),
    },
  },
};
var l, u, p;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((l = e.parameters) == null ? void 0 : l.docs),
    source: {
      originalSource: `{
  render: args => ({
    setup() {
      const showConfirm = () => {
        ErMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          ...args
        }).then(() => {
          console.log("Confirm action confirmed");
        }).catch(() => {
          console.log("Confirm action cancelled");
        });
      };
      return {
        showConfirm
      };
    },
    template: \`
      <div>
        <button @click="showConfirm">显示 Confirm</button>
      </div>
    \`
  })
}`,
      ...((p = (u = e.parameters) == null ? void 0 : u.docs) == null
        ? void 0
        : p.source),
    },
  },
};
var d, g, w;
r.parameters = {
  ...r.parameters,
  docs: {
    ...((d = r.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `{
  render: args => ({
    setup() {
      const showPrompt = () => {
        ErMessageBox.prompt("请输入邮箱", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /[\\w!#$%&'*+/=?^_\`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_\`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?/,
          inputErrorMessage: "邮箱格式不正确",
          ...args
        }).then(({
          value
        }) => {
          console.log(\`Prompt input value: \${value}\`);
        }).catch(() => {
          console.log("Prompt cancelled");
        });
      };
      return {
        showPrompt
      };
    },
    template: \`
      <div>
        <button @click="showPrompt">显示 Prompt</button>
      </div>
    \`
  })
}`,
      ...((w = (g = r.parameters) == null ? void 0 : g.docs) == null
        ? void 0
        : w.source),
    },
  },
};
var f, h, x;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((f = s.parameters) == null ? void 0 : f.docs),
    source: {
      originalSource: `{
  render: args => ({
    setup() {
      const showCustom = () => {
        ErMessageBox({
          title: "自定义内容",
          message: \`<strong>这是 <i>HTML</i> 字符串</strong>\`,
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          ...args
        });
      };
      return {
        showCustom
      };
    },
    template: \`
      <div>
        <button @click="showCustom">显示自定义内容</button>
      </div>
    \`
  })
}`,
      ...((x = (h = s.parameters) == null ? void 0 : h.docs) == null
        ? void 0
        : x.source),
    },
  },
};
const P = ["Alert", "Confirm", "Prompt", "CustomContent"];
export {
  o as Alert,
  e as Confirm,
  s as CustomContent,
  r as Prompt,
  P as __namedExportsOrder,
  b as default,
};
