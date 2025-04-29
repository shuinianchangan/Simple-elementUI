// Message.stories.ts
import { defineComponent } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { ErButton, ErMessage } from "toy-element";

// 创建一个包装组件，专门用于文档展示
const MessageDocComponent = defineComponent({
  name: "MessageDocComponent",
  props: {
    type: {
      type: String,
      default: "info",
      validator: (value: string) =>
        ["success", "warning", "info", "error"].includes(value),
    },
    message: {
      type: String,
      default: "这是一条消息",
    },
    duration: {
      type: Number,
      default: 3000,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Number,
      default: 20,
    },
  },
  setup() {
    // 这个组件不需要实际渲染任何内容
    return () => null;
  },
});

const meta = {
  title: "Example/Message",
  component: MessageDocComponent, // 使用包装组件
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
    showClose: {
      control: "boolean",
      description: "是否显示关闭按钮",
    },
    offset: {
      control: "number",
      description: "消息距离顶部的偏移量",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
      ## 基本用法

      \`\`\`js
      // 方法一：直接调用
      ErMessage('这是一条消息提示');

      // 方法二：通过类型方法调用
      ErMessage.success('这是一条成功消息');
      ErMessage.warning('这是一条警告消息');
      ErMessage.info('这是一条消息提示');
      ErMessage.error('这是一条错误消息');

      // 方法三：通过选项对象调用
      ErMessage({
        message: '这是一条消息提示',
        type: 'success',
        duration: 3000,
        showClose: true,
      });
      \`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof MessageDocComponent>;

export default meta;
type Story = StoryObj<typeof MessageDocComponent>;

// 基础用法
export const Basic: Story = {
  render: (args) => ({
    components: { ErButton },
    setup() {
      const showMessage = () => {
        ErMessage({
          message: args.message || "这是一条消息提示",
          type: (args.type as any) || "success",
          duration: args.duration,
          showClose: args.showClose,
          offset: args.offset,
        });
      };
      return { showMessage, args };
    },
    template: `
      <div>
        <p>点击按钮显示消息，使用控制面板调整参数</p>
        <er-button @click="showMessage">显示消息</er-button>
      </div>
    `,
  }),
  args: {
    message: "这是一条消息提示",
    type: "success",
    duration: 3000,
    showClose: false,
    offset: 20,
  },
};

// 不同类型的消息
export const DifferentTypes: Story = {
  render: () => ({
    components: { ErButton },
    setup() {
      const showSuccess = () => ErMessage.success("成功消息");
      const showWarning = () => ErMessage.warning("警告消息");
      const showInfo = () => ErMessage.info("信息消息");
      const showError = () => ErMessage.error("错误消息");
      return { showSuccess, showWarning, showInfo, showError };
    },
    template: `
      <div style="display: flex; gap: 16px;">
        <er-button type="success" @click="showSuccess">成功</er-button>
        <er-button type="warning" @click="showWarning">警告</er-button>
        <er-button type="info" @click="showInfo">信息</er-button>
        <er-button type="danger" @click="showError">错误</er-button>
      </div>
    `,
  }),
};

// 可关闭的消息
export const Closable: Story = {
  render: () => ({
    components: { ErButton },
    setup() {
      const showClosableMessage = () => {
        ErMessage({
          message: "可关闭的消息",
          showClose: true,
          duration: 0, // 设为0则不会自动关闭
        });
      };
      return { showClosableMessage };
    },
    template: `
      <er-button @click="showClosableMessage">显示可关闭消息</er-button>
    `,
  }),
};
