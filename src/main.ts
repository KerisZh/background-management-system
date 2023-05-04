import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {store} from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(store).use(ElMessage).mount('#app')
