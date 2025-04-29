## Simple-ElementUI（仿ElementPlus 组件库）

### 项目描述：

设计并实现了一款仿 ElementPlus 的 Vue 3 组件库，全面展示了在复杂组件开发、前端工程化方面的实践能力。该库独立开发，包含 10+ 个核心组件。并采用现代前端工具链构建，提供完整的 TypeScript 类型支持。

### 技术栈：Vue3、Vite、Vitest、Vitepress、Monorepo、Storybook、PostCSS

### 模块介绍

- components 组件代码
- core 组件库打包入口
- docs 组件库文档
- play 组件开发实验室
- theme 皮肤样式文件
- utils 工具函数

### 技术亮点

1. 开发流程：
   - 先根据相关文档拟定出测试用例。
   - 在 components 目录中开发组件，遵循 Vue 3 和 TypeScript 最佳实践。
   - 使用 play 目录作为组件开发实验室，快速测试和调试组件。
   - 在 docs 目录中编写组件文档，包括使用说明、API 参考和示例代码。
2. 测试驱动开发：
   - 先利用vitest和官方文档，设计出关键的功能和属性测试
   - 再根据测试用例在 components 中实现组件功能。
   - 使用 play 进行交互式测试和演示。
3. 持续集成：
   - 使用 Vitest 进行单元测试和集成测试。
   - 通过 Storybook 展示组件库，方便开发者和设计师协作。
