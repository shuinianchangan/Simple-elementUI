import type { Meta, StoryObj } from "@storybook/vue3";
import { ErTooltip } from "toy-element";
import { ref } from "vue";

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

export const VirtualTrigger: Story = {
  args: {
    content: "虚拟触发的内容",
    trigger: "hover",
    placement: "bottom",
    virtualTriggering: true,
  },
  render: (args) => ({
    components: {
      ErTooltip,
    },
    setup() {
      const triggerRef = ref<HTMLElement>();
      return {
        args,
        triggerRef,
      };
    },
    template: `
    <div>
      <!-- 触发节点直接在模板中渲染 -->
      <div 
        ref="triggerRef"
        style="padding: 8px; border: 1px solid #ccc; display: inline-block;"
      >
        虚拟触发节点
      </div>

      <er-tooltip 
        v-bind="args"
        :virtual-ref="triggerRef"
      >
        <template #content>
          <div>这是一个通过虚拟节点触发的 Tooltip</div>
        </template>
      </er-tooltip>
    </div>
    `,
  }),
};

export default meta;
