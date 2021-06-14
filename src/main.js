import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import * as echarts from 'echarts'
import 'echarts/theme/chart-theme'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')
app.echarts=echarts