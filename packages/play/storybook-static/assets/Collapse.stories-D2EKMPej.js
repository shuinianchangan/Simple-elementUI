import { c as n, d as s } from "./index-BHJy8_XH.js";
import "./vue.esm-bundler-DnrAdbbo.js";
const c = {
    title: "Example/Collapse",
    component: n,
    subcomponents: { ErCollapseItem: s },
    tags: ["autodocs"],
  },
  e = {
    render: (i) => ({
      components: { ErCollapse: n, ErCollapseItem: s },
      setup() {
        return { args: i };
      },
      template: `
    <er-collapse v-bind="args">
      <er-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </er-collapse-item>
      <er-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </er-collapse-item>
      <er-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </er-collapse-item>
    </er-collapse>
    `,
    }),
    args: { accordion: !0, modelValue: ["a"] },
  };
var t, a, l;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((t = e.parameters) == null ? void 0 : t.docs),
    source: {
      originalSource: `{
  render: args => ({
    components: {
      ErCollapse,
      ErCollapseItem
    },
    setup() {
      return {
        args
      };
    },
    template: \`
    <er-collapse v-bind="args">
      <er-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </er-collapse-item>
      <er-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </er-collapse-item>
      <er-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </er-collapse-item>
    </er-collapse>
    \`
  }),
  args: {
    accordion: true,
    modelValue: ["a"]
  }
}`,
      ...((l = (a = e.parameters) == null ? void 0 : a.docs) == null
        ? void 0
        : l.source),
    },
  },
};
const m = ["Default"];
export { e as Default, m as __namedExportsOrder, c as default };
