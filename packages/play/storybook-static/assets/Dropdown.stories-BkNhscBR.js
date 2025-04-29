import { r as c } from "./vue.esm-bundler-DnrAdbbo.js";
import { f as r } from "./index-DQLiMaGX.js";
import { e as t } from "./index-BHJy8_XH.js";
const f = {
    title: "Example/Dropdown",
    component: t,
    tags: ["autodocs"],
    argTypes: {
      trigger: { control: "select", options: ["hover", "click"] },
      size: { control: "select", options: ["large", "default", "small"] },
      type: {
        control: "select",
        options: ["primary", "success", "warning", "danger", "info"],
      },
      placement: {
        control: "select",
        options: [
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "left",
          "left-start",
          "left-end",
          "right",
          "right-start",
          "right-end",
        ],
      },
      splitButton: { control: "boolean" },
      hideOnClick: { control: "boolean" },
    },
    args: { onCommand: r(), "onVisible-change": r(), onClick: r() },
  },
  n = {
    args: {
      trigger: "hover",
      items: [
        { label: "选项1", command: "option1" },
        { label: "选项2", command: "option2" },
        { label: "选项3", command: "option3", disabled: !0 },
        { divided: !0 },
        { label: "选项4", command: "option4" },
      ],
    },
    render: (e) => ({
      components: { ErDropdown: t },
      setup() {
        const m = c();
        return { args: e, dropdownRef: m };
      },
      template: `
      <div style="margin: 100px;">
        <er-dropdown ref="dropdownRef" v-bind="args">
          <span>下拉菜单</span>
        </er-dropdown>
      </div>
    `,
    }),
  },
  o = {
    args: {
      trigger: "click",
      splitButton: !0,
      type: "primary",
      items: [
        { label: "选项1", command: "option1" },
        { label: "选项2", command: "option2" },
        { label: "选项3", command: "option3" },
      ],
    },
    render: (e) => ({
      components: { ErDropdown: t },
      setup() {
        return { args: e };
      },
      template: `
      <div style="margin: 100px;">
        <er-dropdown v-bind="args">
          <span>下拉按钮</span>
        </er-dropdown>
      </div>
    `,
    }),
  };
var a, s, p;
n.parameters = {
  ...n.parameters,
  docs: {
    ...((a = n.parameters) == null ? void 0 : a.docs),
    source: {
      originalSource: `{
  args: {
    trigger: "hover",
    items: [{
      label: "选项1",
      command: "option1"
    }, {
      label: "选项2",
      command: "option2"
    }, {
      label: "选项3",
      command: "option3",
      disabled: true
    }, {
      divided: true
    }, {
      label: "选项4",
      command: "option4"
    }]
  },
  render: args => ({
    components: {
      ErDropdown
    },
    setup() {
      const dropdownRef = ref<DropdownInstance>();
      return {
        args,
        dropdownRef
      };
    },
    template: \`
      <div style="margin: 100px;">
        <er-dropdown ref="dropdownRef" v-bind="args">
          <span>下拉菜单</span>
        </er-dropdown>
      </div>
    \`
  })
}`,
      ...((p = (s = n.parameters) == null ? void 0 : s.docs) == null
        ? void 0
        : p.source),
    },
  },
};
var d, i, l;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((d = o.parameters) == null ? void 0 : d.docs),
    source: {
      originalSource: `{
  args: {
    trigger: "click",
    splitButton: true,
    type: "primary",
    items: [{
      label: "选项1",
      command: "option1"
    }, {
      label: "选项2",
      command: "option2"
    }, {
      label: "选项3",
      command: "option3"
    }]
  },
  render: args => ({
    components: {
      ErDropdown
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div style="margin: 100px;">
        <er-dropdown v-bind="args">
          <span>下拉按钮</span>
        </er-dropdown>
      </div>
    \`
  })
}`,
      ...((l = (i = o.parameters) == null ? void 0 : i.docs) == null
        ? void 0
        : l.source),
    },
  },
};
const w = ["Default", "SplitButton"];
export {
  n as Default,
  o as SplitButton,
  w as __namedExportsOrder,
  f as default,
};
