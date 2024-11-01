import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import setupPlugins from "@/plugins";
// src/main.ts
import 'virtual:svg-icons-register';
import "@/styles/index.scss";


const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
// 注册插件
app.use(setupPlugins);

app.mount('#app');
