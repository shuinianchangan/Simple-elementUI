import type { Meta, StoryObj } from "@storybook/vue3";
import { ErButton, ErMessage } from "toy-element";

const meta = {
  title: "Example/Message",
  component: ErMessage,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "warning", "error", "info"],
      description: "消息类型",
    },
    message: {
      control: "text",
      description: "消息内容",
    },
    duration: {
      control: "number",
      description: "显示时间，单位为毫秒",
    },
  },
} satisfies Meta<typeof ErMessage>;

export default meta;
type Story = StoryObj<typeof ErMessage>;

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { ErButton },
    setup() {
      const showMessage = () => {
        ErMessage({
          message: "这是一条消息提示",
          type: "success",
        });
      };
      return { showMessage };
    },
    template: `
      <er-button @click="showMessage">显示消息</er-button>
    `,
  }),
};

// 不同类型的消息
export const DifferentTypes: Story = {
  render: () => ({
    components: { ErButton },
    setup() {
      const showSuccess = () => ErMessage.success("成功消息");
      const showWarning = () => ErMessage.warning("警告消息");
      const showError = () => ErMessage.error("错误消息");
      return { showSuccess, showWarning, showError };
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <er-button @click="showSuccess">成功</er-button>
        <er-button @click="showWarning">警告</er-button>
        <er-button @click="showError">错误</er-button>
      </div>
    `,
  }),
};
