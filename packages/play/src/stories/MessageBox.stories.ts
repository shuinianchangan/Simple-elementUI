import { defineComponent } from "vue";
import type { StoryObj, Meta } from "@storybook/vue3";
import { ErButton, ErMessageBox } from "toy-element";

// 创建一个包装组件，专门用于文档展示
const MessageBoxDocComponent = defineComponent({
  name: "MessageBoxDocComponent",
  props: {
    title: {
      type: String,
      default: "提示",
    },
    message: {
      type: String,
      default: "这是一条消息",
    },
    type: {
      type: String,
      default: "",
      validator: (value: string) =>
        ["success", "warning", "info", "error", ""].includes(value),
    },
    boxType: {
      type: String,
      default: "",
      validator: (value: string) =>
        ["", "alert", "confirm", "prompt"].includes(value),
    },
    confirmButtonText: {
      type: String,
      default: "确定",
    },
    cancelButtonText: {
      type: String,
      default: "取消",
    },
    showCancelButton: {
      type: Boolean,
      default: false,
    },
    showConfirmButton: {
      type: Boolean,
      default: true,
    },
    showInput: {
      type: Boolean,
      default: false,
    },
    inputValue: {
      type: String,
      default: "",
    },
    inputPlaceholder: {
      type: String,
      default: "请输入内容",
    },
    inputType: {
      type: String,
      default: "text",
      validator: (value: string) =>
        ["text", "textarea", "password", "number"].includes(value),
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    // 这个组件不需要实际渲染任何内容
    return () => null;
  },
});

const meta = {
  title: "Example/MessageBox",
  component: MessageBoxDocComponent, // 使用包装组件
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["success", "warning", "info", "error", ""],
      description: "消息类型",
    },
    boxType: {
      control: "select",
      options: ["", "alert", "confirm", "prompt"],
      description: "弹框类型",
    },
    title: {
      control: "text",
      description: "标题",
    },
    message: {
      control: "text",
      description: "消息内容",
    },
    confirmButtonText: {
      control: "text",
      description: "确认按钮文字",
    },
    cancelButtonText: {
      control: "text",
      description: "取消按钮文字",
    },
    showCancelButton: {
      control: "boolean",
      description: "是否显示取消按钮",
    },
    showConfirmButton: {
      control: "boolean",
      description: "是否显示确认按钮",
    },
    showInput: {
      control: "boolean",
      description: "是否显示输入框",
    },
    inputValue: {
      control: "text",
      description: "输入框的初始值",
    },
    inputPlaceholder: {
      control: "text",
      description: "输入框的占位文本",
    },
    inputType: {
      control: "select",
      options: ["text", "textarea", "password", "number"],
      description: "输入框类型",
    },
    closeOnClickModal: {
      control: "boolean",
      description: "是否可通过点击遮罩关闭弹框",
    },
    center: {
      control: "boolean",
      description: "是否居中布局",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## 基本用法

\`\`\`js
// 消息提示
ErMessageBox.alert('这是一条消息提示', '标题').then(() => {
  // 关闭后的回调
});

// 确认消息
ErMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示').then(() => {
  // 确认后的回调
}).catch(() => {
  // 取消后的回调
});

// 提交内容
ErMessageBox.prompt('请输入邮箱', '提示').then(({ value }) => {
  // 确认后的回调，value 为输入的值
}).catch(() => {
  // 取消后的回调
});

// 自定义配置
ErMessageBox({
  title: '提示',
  message: '这是一条消息',
  showCancelButton: true,
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
});
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof MessageBoxDocComponent>;

type Story = StoryObj<typeof MessageBoxDocComponent>;

// 基础用法 - Alert
export const Alert: Story = {
  render: (args) => ({
    components: { ErButton },
    setup() {
      const showAlert = () => {
        ErMessageBox.alert(
          args.message || "这是一条警告消息",
          args.title || "提示",
          {
            confirmButtonText: args.confirmButtonText || "确定",
            type: args.type as any,
            center: args.center,
            closeOnClickModal: args.closeOnClickModal,
          },
        ).then(() => {
          console.log("Alert confirmed");
        });
      };

      return { showAlert };
    },
    template: `
      <div>
        <p>点击按钮显示警告消息，使用控制面板调整参数</p>
        <er-button @click="showAlert">显示 Alert</er-button>
      </div>
    `,
  }),
  args: {
    title: "提示",
    message: "这是一条警告消息",
    type: "warning",
    confirmButtonText: "确定",
    closeOnClickModal: true,
    center: false,
  },
};

// 确认消息 - Confirm
export const Confirm: Story = {
  render: (args) => ({
    components: { ErButton },
    setup() {
      const showConfirm = () => {
        ErMessageBox.confirm(
          args.message || "此操作将永久删除该文件, 是否继续?",
          args.title || "警告",
          {
            confirmButtonText: args.confirmButtonText || "确定",
            cancelButtonText: args.cancelButtonText || "取消",
            type: args.type as any,
            center: args.center,
            closeOnClickModal: args.closeOnClickModal,
          },
        )
          .then(() => {
            console.log("Confirm action confirmed");
          })
          .catch(() => {
            console.log("Confirm action cancelled");
          });
      };

      return { showConfirm };
    },
    template: `
      <div>
        <p>点击按钮显示确认消息，使用控制面板调整参数</p>
        <er-button type="warning" @click="showConfirm">显示 Confirm</er-button>
      </div>
    `,
  }),
  args: {
    title: "警告",
    message: "此操作将永久删除该文件, 是否继续?",
    type: "warning",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    closeOnClickModal: true,
    center: false,
  },
};

// 提交内容 - Prompt
export const Prompt: Story = {
  render: (args) => ({
    components: { ErButton },
    setup() {
      const showPrompt = () => {
        ErMessageBox.prompt(
          args.message || "请输入邮箱",
          args.title || "提示",
          {
            confirmButtonText: args.confirmButtonText || "确定",
            cancelButtonText: args.cancelButtonText || "取消",
            inputPlaceholder: args.inputPlaceholder || "请输入邮箱",
            inputType: (args.inputType || "text") as
              | "text"
              | "textarea"
              | "password"
              | "number",
            center: args.center,
            closeOnClickModal: args.closeOnClickModal,
          } as any,
        )
          .then(({ value }) => {
            console.log(`Prompt input value: ${value}`);
          })
          .catch(() => {
            console.log("Prompt cancelled");
          });
      };

      return { showPrompt };
    },
    template: `
      <div>
        <p>点击按钮显示输入框，使用控制面板调整参数</p>
        <er-button type="primary" @click="showPrompt">显示 Prompt</er-button>
      </div>
    `,
  }),
  args: {
    title: "提示",
    message: "请输入邮箱",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputPlaceholder: "请输入邮箱",
    inputType: "text",
    closeOnClickModal: true,
    center: false,
  },
};

// 自定义内容
export const CustomContent: Story = {
  render: (args) => ({
    components: { ErButton },
    setup() {
      const showCustom = () => {
        ErMessageBox({
          title: args.title || "自定义内容",
          message: `<strong>这是 <i>HTML</i> 字符串</strong>`,
          confirmButtonText: args.confirmButtonText || "确定",
          cancelButtonText: args.showCancelButton
            ? args.cancelButtonText || "取消"
            : undefined,
          showCancelButton: args.showCancelButton,
          type: args.type as any,
          center: args.center,
          closeOnClickModal: args.closeOnClickModal,
        });
      };

      return { showCustom };
    },
    template: `
      <div>
        <p>点击按钮显示自定义内容，使用控制面板调整参数</p>
        <er-button type="info" @click="showCustom">显示自定义内容</er-button>
      </div>
    `,
  }),
  args: {
    title: "自定义内容",
    confirmButtonText: "确定",
    showCancelButton: false,
    cancelButtonText: "取消",
    type: "info",
    closeOnClickModal: true,
    center: false,
  },
};

export default meta;
