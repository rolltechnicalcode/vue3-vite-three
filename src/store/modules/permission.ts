import type { RouteRecordRaw } from "vue-router";
import { defineStore } from 'pinia';
import { constantRoutes } from "@/router";
import MenuAPI, { type RouteVO } from "@/api/menu"
const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

export const usePermissionStore = defineStore("permission", () => {
  /** 所有路由，包括静态和动态路由 */
  const newRes = [
    {
      path: "/codegen",
      component: "Layout",
      name: "/codegen",
      meta: {
        title: "系统工具",
        icon: "menu",
        hidden: false,
        alwaysShow: false,
        params: null,
      },
      children: [
        {
          path: "codegen",
          component: "codegen/index",
          name: "Codegen",
          meta: {
            title: "代码生成",
            icon: "code",
            hidden: false,
            keepAlive: true,
            alwaysShow: false,
            params: null,
          },
        },
      ],
    },
    {
      path: "/fwenb",
      component: "Layout",
      name: "/fwenb",
      children: [
        {
          path: "fwenb",
          component: "fwenb/index",
          name: "fwenb",
          meta: {
            title: "富文本",
            icon: "code",
            hidden: false,
            keepAlive: true,
            alwaysShow: false,
            params: null,
          },
        },
      ],
    },
    {
      path: "/liuct",
      component: "Layout",
      name: "/liuct",
      children: [
        {
          path: "liuct",
          component: "liuct/index",
          name: "liuct",
          meta: {
            title: "流程图",
            icon: "code",
            hidden: false,
            keepAlive: true,
            alwaysShow: false,
            params: null,
          },
        },
      ],
    },
    {
      path: "/tdit",
      component: "Layout",
      name: "/tdit",
      children: [
        {
          path: "tdit",
          component: "tdit/index",
          name: "tdit",
          meta: {
            title: "天地图",
            icon: "code",
            hidden: false,
            keepAlive: true,
            alwaysShow: false,
            params: null,
          },
        },
      ],
    },
    {
      path: "/wegGL",
      component: "Layout",
      name: "/wegGL",
      children: [
        {
          path: "wegGL",
          component: "wegGL/index",
          name: "wegGL",
          meta: {
            title: "wegGL",
            icon: "code",
            hidden: false,
            keepAlive: true,
            alwaysShow: false,
            params: null,
          },
        },
      ],
    },
    {
      path: "/three",
      component: "Layout",
      name: "/three",
      children: [
        {
          path: "three",
          component: "three/index",
          name: "three",
          meta: {
            title: "three",
            icon: "code",
            hidden: false,
            keepAlive: true,
            alwaysShow: false,
            params: null,
          },
        },
      ],
    },
    {
      path: "/system",
      component: "Layout",
      redirect: "/system/user",
      name: "/system",
      meta: {
        title: "系统管理",
        icon: "system",
        hidden: false,
        alwaysShow: false,
        params: null,
      },
      children: [
        {
          path: "user",
          component: "system/user/index",
          name: "User",
          meta: {
            title: "用户管理",
            icon: "el-icon-User",
            hidden: false,
            keepAlive: true,
            alwaysShow: false,
            params: null,
          },
        },
        {
          path: "role",
          component: "system/role/index",
          name: "Role",
          meta: {
            title: "角色管理",
            icon: "role",
            hidden: false,
            keepAlive: true,
            alwaysShow: false,
            params: null,
          },
        },
        {
          path: "menu",
          component: "system/menu/index",
          name: "SysMenu",
          meta: {
            title: "菜单管理",
            icon: "menu",
            hidden: false,
            keepAlive: true,
            alwaysShow: false,
            params: null,
          },
        },
      ],
    },
  ]
  /** 所有路由，包括静态和动态路由 */
  const routes = ref<RouteRecordRaw[]>([]);
  const count = ref(1);
  const isRoutesLoaded = ref(false);

  /**
   * 生成动态路由
   */
  function generateRoutes() {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      MenuAPI.getRoutes()
        .then((data) => {
          const dynamicRoutes = transformRoutes(data);
          routes.value = constantRoutes.concat(dynamicRoutes);
          isRoutesLoaded.value = true;
          resolve(dynamicRoutes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 转换路由数据为组件
   */
  const transformRoutes = (routes: RouteVO[]) => {
    const asyncRoutes: RouteRecordRaw[] = [];
    routes.forEach((route) => {
      const tmpRoute = { ...route } as RouteRecordRaw;
      // 顶级目录，替换为 Layout 组件
      if (tmpRoute.component?.toString() == "Layout") {
        tmpRoute.component = Layout;
      } else {
        // 其他菜单，根据组件路径动态加载组件
        const component = modules[`../../views/${tmpRoute.component}.vue`];
        if (component) {
          console.log("component", component);

          tmpRoute.component = component;
        } else {
          tmpRoute.component = modules["../../views/error-page/404.vue"];
        }
      }

      if (tmpRoute.children) {
        tmpRoute.children = transformRoutes(route.children);
      }

      asyncRoutes.push(tmpRoute);
    });

    return asyncRoutes;
  };

  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--
  };

  return { routes, count, increment, decrement, isRoutesLoaded, generateRoutes };
})