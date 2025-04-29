import { f as x, w as u, u as r, e as i } from "./index-DQLiMaGX.js";
import { a as l, b as f } from "./index-BHJy8_XH.js";
import "./vue.esm-bundler-DnrAdbbo.js";
const h = {
    title: "Example/Button",
    component: l,
    tags: ["autodocs"],
    argTypes: {
      type: {
        control: { type: "select" },
        options: ["primary", "success", "warning", "danger", "info", ""],
      },
      size: {
        control: { type: "select" },
        options: ["large", "default", "small", ""],
      },
      disabled: { control: "boolean" },
      loading: { control: "boolean" },
      useThrottle: { control: "boolean" },
      throttleDuration: { control: "number" },
      autofocus: { control: "boolean" },
      tag: { control: { type: "select" }, options: ["button", "a", "div"] },
      nativeType: {
        control: { type: "select" },
        options: ["button", "submit", "reset", ""],
      },
      icon: { control: { type: "text" } },
      loadingIcon: { control: { type: "text" } },
    },
    args: { onClick: x() },
  },
  p = (n) => `
<div style="margin:5px">
  ${n}
</div>
`,
  c = {
    argTypes: { content: { control: { type: "text" } } },
    args: { type: "primary", content: "Button", loading: !1, icon: "home" },
    render: (n) => ({
      components: { ErButton: l },
      setup() {
        return { args: n };
      },
      template: p('<er-button v-bind="args">{{args.content}}</er-button>'),
    }),
    play: async ({ canvasElement: n, args: o, step: t }) => {
      const e = u(n);
      await t("click button", async () => {
        await r.tripleClick(e.getByRole("button"));
      }),
        i(o.onClick).toHaveBeenCalled();
    },
  },
  a = {
    args: { icon: "search" },
    render: (n) => ({
      components: { ErButton: l },
      setup() {
        return { args: n };
      },
      template: p(`
      <er-button circle v-bind="args"/>
    `),
    }),
    play: async ({ canvasElement: n, args: o, step: t }) => {
      const e = u(n);
      await t("click button", async () => {
        await r.click(e.getByRole("button"));
      }),
        i(o.onClick).toHaveBeenCalled();
    },
  };
a.parameters = {};
const s = {
  argTypes: {
    groupType: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "info", ""],
    },
    groupSize: {
      control: { type: "select" },
      options: ["large", "default", "small", ""],
    },
    groupDisabled: { control: "boolean" },
    content1: { control: { type: "text" }, defaultValue: "Button1" },
    content2: { control: { type: "text" }, defaultValue: "Button2" },
    content3: { control: { type: "text" }, defaultValue: "Button3" },
  },
  args: {
    round: !0,
    content1: "Button1",
    content2: "Button2",
    content3: "Button3",
  },
  render: (n) => ({
    components: { ErButton: l, ErButtonGroup: f },
    setup() {
      return { args: n };
    },
    template: p(`
       <er-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <er-button v-bind="args">{{args.content1}}</er-button>
         <er-button v-bind="args">{{args.content2}}</er-button>
         <er-button v-bind="args">{{args.content3}}</er-button>
       </er-button-group>
    `),
  }),
  play: async ({ canvasElement: n, args: o, step: t }) => {
    const e = u(n);
    await t("click btn1", async () => {
      await r.click(e.getByText("Button1"));
    }),
      await t("click btn2", async () => {
        await r.click(e.getByText("Button2"));
      }),
      await t("click btn3", async () => {
        await r.click(e.getByText("Button3"));
      }),
      i(o.onClick).toHaveBeenCalled();
  },
};
var g, y, d;
c.parameters = {
  ...c.parameters,
  docs: {
    ...((g = c.parameters) == null ? void 0 : g.docs),
    source: {
      originalSource: `{
  argTypes: {
    content: {
      control: {
        type: "text"
      }
    }
  },
  args: {
    type: "primary",
    content: "Button",
    loading: false,
    icon: "home"
  },
  render: args => ({
    components: {
      ErButton
    },
    setup() {
      return {
        args
      };
    },
    template: container(\`<er-button v-bind="args">{{args.content}}</er-button>\`)
  }),
  // 进行一些自动化测试
  play: async ({
    canvasElement,
    args,
    step
  }) => {
    const canvas = within(canvasElement);
    await step("click button", async () => {
      await userEvent.tripleClick(canvas.getByRole("button"));
    });
    expect(args.onClick).toHaveBeenCalled();
  }
}`,
      ...((d = (y = c.parameters) == null ? void 0 : y.docs) == null
        ? void 0
        : d.source),
    },
  },
};
var b, m, v;
a.parameters = {
  ...a.parameters,
  docs: {
    ...((b = a.parameters) == null ? void 0 : b.docs),
    source: {
      originalSource: `{
  args: {
    icon: "search"
  },
  render: args => ({
    components: {
      ErButton
    },
    setup() {
      return {
        args
      };
    },
    template: container(\`
      <er-button circle v-bind="args"/>
    \`)
  }),
  play: async ({
    canvasElement,
    args,
    step
  }) => {
    const canvas = within(canvasElement);
    await step("click button", async () => {
      await userEvent.click(canvas.getByRole("button"));
    });
    expect(args.onClick).toHaveBeenCalled();
  }
}`,
      ...((v = (m = a.parameters) == null ? void 0 : m.docs) == null
        ? void 0
        : v.source),
    },
  },
};
var B, w, k;
s.parameters = {
  ...s.parameters,
  docs: {
    ...((B = s.parameters) == null ? void 0 : B.docs),
    source: {
      originalSource: `{
  argTypes: {
    groupType: {
      control: {
        type: "select"
      },
      options: ["primary", "success", "warning", "danger", "info", ""]
    },
    groupSize: {
      control: {
        type: "select"
      },
      options: ["large", "default", "small", ""]
    },
    groupDisabled: {
      control: "boolean"
    },
    content1: {
      control: {
        type: "text"
      },
      defaultValue: "Button1"
    },
    content2: {
      control: {
        type: "text"
      },
      defaultValue: "Button2"
    },
    content3: {
      control: {
        type: "text"
      },
      defaultValue: "Button3"
    }
  },
  args: {
    round: true,
    content1: "Button1",
    content2: "Button2",
    content3: "Button3"
  },
  render: args => ({
    components: {
      ErButton,
      ErButtonGroup
    },
    setup() {
      return {
        args
      };
    },
    template: container(\`
       <er-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <er-button v-bind="args">{{args.content1}}</er-button>
         <er-button v-bind="args">{{args.content2}}</er-button>
         <er-button v-bind="args">{{args.content3}}</er-button>
       </er-button-group>
    \`)
  }),
  play: async ({
    canvasElement,
    args,
    step
  }) => {
    const canvas = within(canvasElement);
    await step("click btn1", async () => {
      await userEvent.click(canvas.getByText("Button1"));
    });
    await step("click btn2", async () => {
      await userEvent.click(canvas.getByText("Button2"));
    });
    await step("click btn3", async () => {
      await userEvent.click(canvas.getByText("Button3"));
    });
    expect(args.onClick).toHaveBeenCalled();
  }
}`,
      ...((k = (w = s.parameters) == null ? void 0 : w.docs) == null
        ? void 0
        : k.source),
    },
  },
};
const z = ["Default", "Circle", "Group"];
export {
  a as Circle,
  c as Default,
  s as Group,
  z as __namedExportsOrder,
  h as default,
};
