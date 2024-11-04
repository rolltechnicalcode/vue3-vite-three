import { type UserConfig, type ConfigEnv, loadEnv, defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import mockDevServerPlugin from "vite-plugin-mock-dev-server";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// 配置@别名
import { resolve } from "path";
const pathSrc = resolve(__dirname, "src");

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  return {
    // ↓解析配置
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    server: {
      // 主机地址
      host: "0.0.0.0",
      // 端口号
      port: +env.VITE_APP_PORT,
      // 是否自动在浏览器中打开
      open: true,
      proxy: {
        // 代理前缀为 /dev-api 的请求
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          // 代理目标真实接口地址：https://api.youlai.tech
          target: env.VITE_APP_API_URL,
          rewrite: (path) =>
            path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
        },
      },
    },
    // ...
    plugins: [
      vue(), cesium(),
      // MOCK 服务
      env.VITE_MOCK_DEV_SERVER === "true" ? mockDevServerPlugin() : null,
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
        ],
        eslintrc: {
          // 是否自动生成 eslint 规则，建议生成之后设置 false
          enabled: false,
          // 指定自动导入函数 eslint 规则的文件
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
        // 是否在 vue 模板中自动导入
        vueTemplate: true,
        // 指定自动导入函数TS类型声明文件路径 (false:关闭自动生成)
        dts: false,
        // dts: "src/types/auto-imports.d.ts",
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],
        // 指定自定义组件位置(默认:src/components)
        dirs: ["src/components", "src/**/components"],
        // 指定自动导入组件TS类型声明文件路径 (false:关闭自动生成)
        dts: false,
        // dts: "src/types/components.d.ts",
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(pathSrc, "assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
    ],
  }
})