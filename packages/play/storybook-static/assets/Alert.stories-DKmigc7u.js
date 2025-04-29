import { r as f, w as p } from "./vue.esm-bundler-DnrAdbbo.js";
import { f as u } from "./index-DQLiMaGX.js";
import { E as c } from "./index-BHJy8_XH.js";
const v = {
    title: "Example/Alert",
    component: c,
    tags: ["autodocs"],
    argTypes: {
      type: {
        control: "select",
        options: ["success", "warning", "info", "danger"],
      },
      effect: { control: "select", options: ["light", "dark"] },
      center: { control: "boolean" },
    },
    args: { onClose: u() },
  },
  e = {
    args: {
      title: "标题",
      description: "这是一段描述",
      type: "success",
      effect: "light",
      closable: !0,
      showIcon: !0,
      visible: !0,
    },
    render: (r) => ({
      components: { ErAlert: c },
      setup() {
        const t = f();
        return (
          p(
            () => r.visible,
            (i) => {
              var n, s;
              i
                ? (n = t.value) == null || n.open()
                : (s = t.value) == null || s.close();
            },
          ),
          { args: r, alertRef: t }
        );
      },
      template: `
     <er-alert ref="alertRef" v-bind="args"></er-alert>
    `,
    }),
  };
var a, o, l;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((a = e.parameters) == null ? void 0 : a.docs),
    source: {
      originalSource: `{
  args: {
    title: "标题",
    description: "这是一段描述",
    type: "success",
    effect: "light",
    closable: true,
    showIcon: true,
    visible: true
  },
  render: args => ({
    components: {
      ErAlert
    },
    setup() {
      const alertRef = ref<AlertInstance>();
      watch(() => (args as any).visible, (val: boolean) => {
        if (val) {
          alertRef.value?.open();
        } else {
          alertRef.value?.close();
        }
      });
      return {
        args,
        alertRef
      };
    },
    template: \`
     <er-alert ref="alertRef" v-bind="args"></er-alert>
    \`
  })
}`,
      ...((l = (o = e.parameters) == null ? void 0 : o.docs) == null
        ? void 0
        : l.source),
    },
  },
};
const b = ["Default"];
export { e as Default, b as __namedExportsOrder, v as default };
