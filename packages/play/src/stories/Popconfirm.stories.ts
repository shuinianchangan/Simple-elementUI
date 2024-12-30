import type { Meta, StoryObj } from "@storybook/vue3";
import { ErPopconfirm, ErButton } from "toy-element";

type Story = StoryObj<typeof ErPopconfirm>;

const meta: Meta<typeof ErPopconfirm> = {
  title: "Example/Popconfirm",
  component: ErPopconfirm,
  tags: ["autodocs"],
};

export const Default: Story = {
  args: {
    title: "Test title",
  },
  render: (args) => ({
    components: {
      ErPopconfirm,
      ErButton,
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
        handleCancel,
      };
    },
    template: `
    <er-popconfirm v-bind="args" @confirm="handleConfirm" @cancel="handleCancel">
      <er-button type="primary" size="small">click me</er-button>
    </er-popconfirm>
    `,
  }),
};

export default meta;
