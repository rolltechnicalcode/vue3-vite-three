import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import router from "@/router";
import { usePermissionStore } from "@/store";

export function setupPermission() {

  router.beforeEach(async (to, from, next) => {

    const permissionStore = usePermissionStore();
    console.log(permissionStore.isRoutesLoaded, "加载：------------", to);
    // 判断路由是否加载过
    if (permissionStore.isRoutesLoaded) {
      if (to.matched.length === 0) {
        // 路由未匹配，跳转到404
        next("/404");
      } else {
        // 动态设置页面标题
        const title =
          (to.params.title as string) || (to.query.title as string);
        if (title) {
          to.meta.title = title;
        }
        next();
      }
    } else {
      try {
        // 生成动态路由
        const dynamicRoutes = await permissionStore.generateRoutes();
        console.log("加载：", dynamicRoutes);

        dynamicRoutes.forEach((route: RouteRecordRaw) => {
          console.log('route', route);
          router.addRoute(route)
        })
        next({ ...to, replace: true }); // 添加动态路由后重新导航
      } catch (error) {
        console.error(error);
        // 路由加载失败，重置 token 并重定向到登录页
        redirectToLogin(to, next);
      }
    }
  });

  // 后置守卫，保证每次路由跳转结束时关闭进度条
  router.afterEach(() => {
  });
}

/** 重定向到登录页 */
function redirectToLogin(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const params = new URLSearchParams(to.query as Record<string, string>);
  const queryString = params.toString();
  const redirect = queryString ? `${to.path}?${queryString}` : to.path;
  next(`/login?redirect=${encodeURIComponent(redirect)}`);
}