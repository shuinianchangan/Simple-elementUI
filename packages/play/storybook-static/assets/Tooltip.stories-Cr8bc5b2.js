import { k as r } from "./index-BHJy8_XH.js";
import { r as g } from "./vue.esm-bundler-DnrAdbbo.js";
const b = {
    title: "Example/Tooltip",
    component: r,
    tags: ["autodocs"],
    argTypes: {
      trigger: {
        options: ["hover", "click", "contextmenu"],
        control: { type: "select" },
      },
      placement: {
        options: ["top", "bottom", "left", "right"],
        control: { type: "select" },
      },
    },
  },
  e = {
    args: {
      content: "this is content bbbbbbbbb",
      trigger: "hover",
      placement: "top",
    },
    render: (n) => ({
      components: { ErTooltip: r },
      setup() {
        return { args: n };
      },
      template: `
    <er-tooltip v-bind="args">
      <div>this is content aaaaaaaaa</div>
    </er-tooltip>
    `,
    }),
  },
  t = {
    args: {
      content: "虚拟触发的内容",
      trigger: "hover",
      placement: "bottom",
      virtualTriggering: !0,
    },
    render: (n) => ({
      components: { ErTooltip: r },
      setup() {
        const c = g();
        return { args: n, triggerRef: c };
      },
      template: `
    <div>
      <!-- 触发节点直接在模板中渲染 -->
      <div 
        ref="triggerRef"
        style="padding: 8px; border: 1px solid #ccc; display: inline-block;"
      >
        虚拟触发节点
      </div>

      <er-tooltip 
        v-bind="args"
        :virtual-ref="triggerRef"
      >
        <template #content>
          <div>这是一个通过虚拟节点触发的 Tooltip</div>
        </template>
      </er-tooltip>
    </div>
    `,
    }),
  };
var o, i, a;
e.parameters = {
  ...e.parameters,
  docs: {
    ...((o = e.parameters) == null ? void 0 : o.docs),
    source: {
      originalSource: `{
  args: {
    content: "this is content bbbbbbbbb",
    trigger: "hover",
    placement: "top"
  },
  render: args => ({
    components: {
      ErTooltip
    },
    setup() {
      return {
        args
      };
    },
    template: \`
    <er-tooltip v-bind="args">
      <div>this is content aaaaaaaaa</div>
    </er-tooltip>
    \`
  })
}`,
      ...((a = (i = e.parameters) == null ? void 0 : i.docs) == null
        ? void 0
        : a.source),
    },
  },
};
var s, p, l;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((s = t.parameters) == null ? void 0 : s.docs),
    source: {
      originalSource: `{
  args: {
    content: "虚拟触发的内容",
    trigger: "hover",
    placement: "bottom",
    virtualTriggering: true
  },
  render: args => ({
    components: {
      ErTooltip
    },
    setup() {
      const triggerRef = ref<HTMLElement>();
      return {
        args,
        triggerRef
      };
    },
    template: \`
    <div>
      <!-- 触发节点直接在模板中渲染 -->
      <div 
        ref="triggerRef"
        style="padding: 8px; border: 1px solid #ccc; display: inline-block;"
      >
        虚拟触发节点
      </div>

      <er-tooltip 
        v-bind="args"
        :virtual-ref="triggerRef"
      >
        <template #content>
          <div>这是一个通过虚拟节点触发的 Tooltip</div>
        </template>
      </er-tooltip>
    </div>
    \`
  })
}`,
      ...((l = (p = t.parameters) == null ? void 0 : p.docs) == null
        ? void 0
        : l.source),
    },
  },
};
const v = ["Default", "VirtualTrigger"];
export {
  e as Default,
  t as VirtualTrigger,
  v as __namedExportsOrder,
  b as default,
};
