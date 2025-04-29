import { defineComponent } from "vue";
import type { StoryObj, Meta } from "@storybook/vue3";
import { ErButton, ErNotification } from "toy-element";

// 创建一个包装组件，专门用于文档展示
const NotificationDocComponent = defineComponent({
  name: "NotificationDocComponent",
  props: {
    title: {
      type: String,
      default: "通知",
    },
    message: {
      type: String,
      default: "这是一条通知消息",
    },
    type: {
      type: String,
      default: "info",
      validator: (value: string) =>
        ["success", "warning", "info", "error", "danger"].includes(value),
    },
    position: {
      type: String,
      default: "top-right",
      validator: (value: string) =>
        ["top-right", "top-left", "bottom-right", "bottom-left"].includes(
          value,
        ),
    },
    duration: {
      type: Number,
      default: 4500,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    offset: {
      type: Number,
      default: 16,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  setup() {
    // 这个组件不需要实际渲染任何内容
    return () => null;
  },
});

const meta = {
  title: "Example/Notification",
  component: NotificationDocComponent, // 使用包装组件
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "warning", "info", "error", "danger"],
      description: "通知类型",
    },
    position: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      description: "通知显示位置",
    },
    title: {
      control: "text",
      description: "标题",
    },
    message: {
      control: "text",
      description: "通知内容",
    },
    duration: {
      control: "number",
      description: "显示时间，单位为毫秒，设为 0 则不会自动关闭",
    },
    showClose: {
      control: "boolean",
      description: "是否显示关闭按钮",
    },
    offset: {
      control: "number",
      description: "偏移距离",
    },
    icon: {
      control: "text",
      description: "自定义图标",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## 基本用法

\`\`\`js
// 方法一：直接调用
ErNotification({
  title: '标题',
  message: '这是一条通知消息'
});

// 方法二：通过类型方法调用
ErNotification.success({
  title: '成功',
  message: '这是一条成功消息'
});
ErNotification.warning({
  title: '警告',
  message: '这是一条警告消息'
});
ErNotification.info({
  title: '消息',
  message: '这是一条消息提示'
});
ErNotification.error({
  title: '错误',
  message: '这是一条错误消息'
});

// 方法三：自定义配置
ErNotification({
  title: '自定义',
  message: '这是一条自定义通知',
  duration: 0,
  position: 'bottom-right',
  showClose: true,
  type: 'success'
});
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof NotificationDocComponent>;

type Story = StoryObj<typeof NotificationDocComponent>;

// 基础用法
export const Basic: Story = {
  render: (args) => ({
    components: { ErButton },
    setup() {
      const showNotification = () => {
        ErNotification({
          title: args.title || "标题",
          message: args.message || "这是一条通知消息",
          type: args.type as any,
          position: args.position as any,
          duration: args.duration,
          showClose: args.showClose,
          offset: args.offset,
          icon: args.icon,
        });
      };

      return { showNotification };
    },
    template: `
      <div>
        <p>点击按钮显示通知，使用控制面板调整参数</p>
        <er-button @click="showNotification">显示通知</er-button>
      </div>
    `,
  }),
  args: {
    title: "标题",
    message: "这是一条通知消息",
    type: "info",
    position: "top-right",
    duration: 4500,
    showClose: true,
    offset: 16,
  },
};

// 不同类型的通知
export const WithType: Story = {
  render: (args) => ({
    components: { ErButton },
    setup() {
      const showSuccess = () => {
        ErNotification.success({
          title: "成功",
          message: "这是一条成功消息",
          position: args.position as any,
          duration: args.duration,
          showClose: args.showClose,
        });
      };

      const showWarning = () => {
        ErNotification.warning({
          title: "警告",
          message: "这是一条警告消息",
          position: args.position as any,
          duration: args.duration,
          showClose: args.showClose,
        });
      };

      const showInfo = () => {
        ErNotification.info({
          title: "消息",
          message: "这是一条消息提示",
          position: args.position as any,
          duration: args.duration,
          showClose: args.showClose,
        });
      };

      const showError = () => {
        ErNotification.error({
          title: "错误",
          message: "这是一条错误消息",
          position: args.position as any,
          duration: args.duration,
          showClose: args.showClose,
        });
      };

      return { showSuccess, showWarning, showInfo, showError };
    },
    template: `
      <div>
        <p>不同类型的通知</p>
        <div style="display: flex; gap: 16px;">
          <er-button type="success" @click="showSuccess">成功</er-button>
          <er-button type="warning" @click="showWarning">警告</er-button>
          <er-button type="info" @click="showInfo">消息</er-button>
          <er-button type="danger" @click="showError">错误</er-button>
        </div>
      </div>
    `,
  }),
  args: {
    position: "top-right",
    duration: 4500,
    showClose: true,
  },
};

// 不同位置的通知
export const WithPosition: Story = {
  render: (args) => ({
    components: { ErButton },
    setup() {
      const showTopRight = () => {
        ErNotification({
          title: "右上角",
          message: "这是一条通知消息",
          position: "top-right",
          type: args.type as any,
          duration: args.duration,
          showClose: args.showClose,
        });
      };

      const showTopLeft = () => {
        ErNotification({
          title: "左上角",
          message: "这是一条通知消息",
          position: "top-left",
          type: args.type as any,
          duration: args.duration,
          showClose: args.showClose,
        });
      };

      const showBottomRight = () => {
        ErNotification({
          title: "右下角",
          message: "这是一条通知消息",
          position: "bottom-right",
          type: args.type as any,
          duration: args.duration,
          showClose: args.showClose,
        });
      };

      const showBottomLeft = () => {
        ErNotification({
          title: "左下角",
          message: "这是一条通知消息",
          position: "bottom-left",
          type: args.type as any,
          duration: args.duration,
          showClose: args.showClose,
        });
      };

      return { showTopRight, showTopLeft, showBottomRight, showBottomLeft };
    },
    template: `
      <div>
        <p>不同位置的通知</p>
        <div style="display: flex; gap: 16px;">
          <er-button @click="showTopRight">右上角</er-button>
          <er-button @click="showTopLeft">左上角</er-button>
          <er-button @click="showBottomRight">右下角</er-button>
          <er-button @click="showBottomLeft">左下角</er-button>
        </div>
      </div>
    `,
  }),
  args: {
    type: "info",
    duration: 4500,
    showClose: true,
  },
};

// 自定义时长
export const WithDuration: Story = {
  render: (args) => ({
    components: { ErButton },
    setup() {
      const showNotification = () => {
        ErNotification({
          title: "自定义时长",
          message: "这条通知会在 10 秒后关闭",
          duration: 10000,
          type: args.type as any,
          position: args.position as any,
          showClose: args.showClose,
        });
      };

      const showNoDuration = () => {
        ErNotification({
          title: "不会自动关闭",
          message: "这条通知不会自动关闭",
          duration: 0,
          type: args.type as any,
          position: args.position as any,
          showClose: args.showClose,
        });
      };

      return { showNotification, showNoDuration };
    },
    template: `
      <div>
        <p>自定义显示时长</p>
        <div style="display: flex; gap: 16px;">
          <er-button @click="showNotification">10秒后关闭</er-button>
          <er-button @click="showNoDuration">不自动关闭</er-button>
        </div>
      </div>
    `,
  }),
  args: {
    type: "info",
    position: "top-right",
    showClose: true,
  },
};

export default meta;
