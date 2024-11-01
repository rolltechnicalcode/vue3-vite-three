import type { App } from "vue";

import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setupElIcons } from "./icons";
import { setupPermission } from "./permission";

export default {
  install(app: App<Element>) {
    // 路由(router)
    setupRouter(app);
    // 状态管理(store)
    setupStore(app);
    // Element-plus图标
    setupElIcons(app);
    // 路由守卫
    setupPermission();
  },
};
