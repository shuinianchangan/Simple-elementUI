import { r as l } from "./vue.esm-bundler-DnrAdbbo.js";
import { f as r } from "./index-DQLiMaGX.js";
import { f as s } from "./index-BHJy8_XH.js";
const x = {
    title: "Example/Input",
    component: s,
    tags: ["autodocs"],
    argTypes: {
      type: {
        control: "select",
        options: ["text", "password", "number", "textarea"],
      },
      size: { control: "select", options: ["large", "small"] },
      disabled: { control: "boolean" },
      clearable: { control: "boolean" },
      showPassword: { control: "boolean" },
      readonly: { control: "boolean" },
      autofocus: { control: "boolean" },
    },
    args: {
      onInput: r(),
      onChange: r(),
      onFocus: r(),
      onBlur: r(),
      onClear: r(),
    },
  },
  a = {
    args: { modelValue: "", placeholder: "请输入内容" },
    render: (e) => ({
      components: { ErInput: s },
      setup() {
        const n = l(),
          b = l(e.modelValue);
        return { args: e, inputRef: n, value: b };
      },
      template: `
      <div style="width: 300px;">
        <er-input 
          ref="inputRef"
          v-model="value"
          v-bind="args"
          @update:modelValue="args.onInput"
        />
        <div style="margin-top: 10px;">当前值: {{ value }}</div>
      </div>
    `,
    }),
  },
  o = {
    args: { modelValue: "", placeholder: "请输入密码", showPassword: !0 },
    render: (e) => ({
      components: { ErInput: s },
      setup() {
        const n = l(e.modelValue);
        return { args: e, value: n };
      },
      template: `
      <div style="width: 300px;">
        <er-input 
          v-model="value"
          v-bind="args"
        />
      </div>
    `,
    }),
  },
  t = {
    args: {
      modelValue: "可清除的输入框",
      placeholder: "请输入内容",
      clearable: !0,
    },
    render: (e) => ({
      components: { ErInput: s },
      setup() {
        const n = l(e.modelValue);
        return { args: e, value: n };
      },
      template: `
      <div style="width: 300px;">
        <er-input 
          v-model="value"
          v-bind="args"
        />
      </div>
    `,
    }),
  };
var u, d, p;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((u = a.parameters) == null ? void 0 : u.docs),
    source: {
      originalSource: `{
  args: {
    modelValue: "",
    placeholder: "请输入内容"
  },
  render: args => ({
    components: {
      ErInput
    },
    setup() {
      const inputRef = ref<InputInstance>();
      const value = ref(args.modelValue);
      return {
        args,
        inputRef,
        value
      };
    },
    template: \`
      <div style="width: 300px;">
        <er-input 
          ref="inputRef"
          v-model="value"
          v-bind="args"
          @update:modelValue="args.onInput"
        />
        <div style="margin-top: 10px;">当前值: {{ value }}</div>
      </div>
    \`
  })
}`,
      ...((p = (d = a.parameters) == null ? void 0 : d.docs) == null
        ? void 0
        : p.source),
    },
  },
};
var c, m, i;
o.parameters = {
  ...o.parameters,
  docs: {
    ...((c = o.parameters) == null ? void 0 : c.docs),
    source: {
      originalSource: `{
  args: {
    modelValue: "",
    placeholder: "请输入密码",
    showPassword: true
  },
  render: args => ({
    components: {
      ErInput
    },
    setup() {
      const value = ref(args.modelValue);
      return {
        args,
        value
      };
    },
    template: \`
      <div style="width: 300px;">
        <er-input 
          v-model="value"
          v-bind="args"
        />
      </div>
    \`
  })
}`,
      ...((i = (m = o.parameters) == null ? void 0 : m.docs) == null
        ? void 0
        : i.source),
    },
  },
};
var v, g, f;
t.parameters = {
  ...t.parameters,
  docs: {
    ...((v = t.parameters) == null ? void 0 : v.docs),
    source: {
      originalSource: `{
  args: {
    modelValue: "可清除的输入框",
    placeholder: "请输入内容",
    clearable: true
  },
  render: args => ({
    components: {
      ErInput
    },
    setup() {
      const value = ref(args.modelValue);
      return {
        args,
        value
      };
    },
    template: \`
      <div style="width: 300px;">
        <er-input 
          v-model="value"
          v-bind="args"
        />
      </div>
    \`
  })
}`,
      ...((f = (g = t.parameters) == null ? void 0 : g.docs) == null
        ? void 0
        : f.source),
    },
  },
};
const y = ["Default", "Password", "Clearable"];
export {
  t as Clearable,
  a as Default,
  o as Password,
  y as __namedExportsOrder,
  x as default,
};
