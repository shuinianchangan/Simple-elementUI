import { j as t, a as c } from "./index-BHJy8_XH.js";
import "./vue.esm-bundler-DnrAdbbo.js";
const p = { title: "Example/Popconfirm", component: t, tags: ["autodocs"] },
  n = {
    args: { title: "Test title" },
    render: (a) => ({
      components: { ErPopconfirm: t, ErButton: c },
      setup() {
        return {
          args: a,
          handleConfirm: () => {
            console.log("confirm");
          },
          handleCancel: () => {
            console.log("cancel");
          },
        };
      },
      template: `
    <er-popconfirm v-bind="args" @confirm="handleConfirm" @cancel="handleCancel">
      <er-button type="primary" size="small">click me</er-button>
    </er-popconfirm>
    `,
    }),
  };
var e, o, r;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((e = n.parameters) == null ? void 0 : e.docs),
    source: {
      originalSource: `{
  args: {
    title: "Test title"
  },
  render: args => ({
    components: {
      ErPopconfirm,
      ErButton
    },
    setup() {
      const handleConfirm = () => {
        console.log("confirm");
      };
      const handleCancel = () => {
        console.log("cancel");
      };
      return {
        args,
        handleConfirm,
        handleCancel
      };
    },
    template: \`
    <er-popconfirm v-bind="args" @confirm="handleConfirm" @cancel="handleCancel">
      <er-button type="primary" size="small">click me</er-button>
    </er-popconfirm>
    \`
  })
}`,
      ...((r = (o = n.parameters) == null ? void 0 : o.docs) == null
        ? void 0
        : r.source),
    },
  },
};
const d = ["Default"];
export { n as Default, d as __namedExportsOrder, p as default };
