# Vue 3 + TypeScript + Vite

node -v >  版本建议：20.18.0

# 1.集成Element Plus
npm install element-plus --save
官网提供了三种用法 完整引入、按需引入、手动导入，这里我们使用按需导入（可以使打包文件变小） 官方也推荐使用按需引入
npm install -D unplugin-vue-components unplugin-auto-import
在 Vite 的配置文件vite.config.ts中 添加如下代码
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})

# 2.配置@别名
npm install @types/node
// 配置@别名
import { resolve } from "path";
const pathSrc = resolve(__dirname, "src");
// ↓解析配置
resolve: {
  // ↓路径别名
  alias: {
    "@": pathSrc,
  },
},

# 3.整合 SVG 图标
通过 vite-plugin-svg-icons 插件整合 Iconfont 第三方图标库实现本地图标
npm install -D fast-glob@3.2.11 
npm install -D vite-plugin-svg-icons@2.0.1 

