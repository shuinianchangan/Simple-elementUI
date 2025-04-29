import DefaultTheme from "vitepress/theme";
import { type App } from "vue";
import SimpleElementUI from "toy-element";
import { ElementPlusContainer } from "@vitepress-demo-preview/component";

import "@vitepress-demo-preview/component/dist/style.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(SimpleElementUI);
  },
};
