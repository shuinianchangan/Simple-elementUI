import type { StoryObj, Meta, ArgTypes } from "@storybook/vue3";
import { ref } from "vue";
import { fn } from "@storybook/test";
import { ErDropdown, type DropdownInstance } from "toy-element";

type Story = StoryObj<typeof ErDropdown> & { argTypes?: ArgTypes };

const meta: Meta<typeof ErDropdown> = {
  title: "Example/Dropdown",
  component: ErDropdown,
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      control: "select",
      options: ["hover", "click"],
    },
    size: {
      control: "select",
      options: ["large", "default", "small"],
    },
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
    splitButton: {
      control: "boolean",
    },
    hideOnClick: {
      control: "boolean",
    },
  },
  args: {
    onCommand: fn(),
    "onVisible-change": fn(),
    onClick: fn(),
  },
};

export const Default: Story = {
  args: {
    trigger: "hover",
    items: [
      { label: "选项1", command: "option1" },
      { label: "选项2", command: "option2" },
      { label: "选项3", command: "option3", disabled: true },
      { divided: true },
      { label: "选项4", command: "option4" },
    ],
  },
  render: (args) => ({
    components: { ErDropdown },
    setup() {
      const dropdownRef = ref<DropdownInstance>();
      return { args, dropdownRef };
    },
    template: `
      <div style="margin: 100px;">
        <er-dropdown ref="dropdownRef" v-bind="args">
          <span>下拉菜单</span>
        </er-dropdown>
      </div>
    `,
  }),
};

export const SplitButton: Story = {
  args: {
    trigger: "click",
    splitButton: true,
    type: "primary",
    items: [
      { label: "选项1", command: "option1" },
      { label: "选项2", command: "option2" },
      { label: "选项3", command: "option3" },
    ],
  },
  render: (args) => ({
    components: { ErDropdown },
    setup() {
      return { args };
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

export default meta;
