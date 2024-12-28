import type { Meta, StoryObj } from "@storybook/vue3";
import { ErTooltip } from "toy-element";

type Story = StoryObj<typeof ErTooltip>;

const meta: Meta<typeof ErTooltip> = {
  title: "Example/Tooltip",
  component: ErTooltip,
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      options: ["hover", "click", "contextmenu"],
      control: {
        type: "select",
      },
    },
    placement: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default: Story = {
  args: {
    content: "this is content bbbbbbbbb",
    trigger: "hover",
    placement: "top",
  },
  render: (args) => ({
    components: {
      ErTooltip,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <er-tooltip v-bind="args">
      <div>this is content aaaaaaaaa</div>
    </er-tooltip>
    `,
  }),
};

export default meta;
