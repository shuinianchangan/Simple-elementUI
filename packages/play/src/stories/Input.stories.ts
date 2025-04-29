import type { StoryObj, Meta, ArgTypes } from "@storybook/vue3";
import { ref } from "vue";
import { fn } from "@storybook/test";
import { ErInput, type InputInstance } from "toy-element";

type Story = StoryObj<typeof ErInput> & { argTypes?: ArgTypes };

const meta: Meta<typeof ErInput> = {
  title: "Example/Input",
  component: ErInput,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "number", "textarea"],
    },
    size: {
      control: "select",
      options: ["large", "small"],
    },
    disabled: {
      control: "boolean",
    },
    clearable: {
      control: "boolean",
    },
    showPassword: {
      control: "boolean",
    },
    readonly: {
      control: "boolean",
    },
    autofocus: {
      control: "boolean",
    },
  },
  args: {
    onInput: fn(),
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onClear: fn(),
  },
};

export const Default: Story = {
  args: {
    modelValue: "",
    placeholder: "请输入内容",
  },
  render: (args) => ({
    components: { ErInput },
    setup() {
      const inputRef = ref<InputInstance>();
      const value = ref(args.modelValue);

      return { args, inputRef, value };
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
};

export const Password: Story = {
  args: {
    modelValue: "",
    placeholder: "请输入密码",
    showPassword: true,
  },
  render: (args) => ({
    components: { ErInput },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
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

export const Clearable: Story = {
  args: {
    modelValue: "可清除的输入框",
    placeholder: "请输入内容",
    clearable: true,
  },
  render: (args) => ({
    components: { ErInput },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
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

export default meta;
