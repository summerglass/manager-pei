import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import config from './config'
import request from './utils/request'
import storage from './utils/storage'
// axios.get(config.mockApi + '/login').then((res) => {
//   console.log(res)
// })
const app = createApp(App)
app.config.globalProperties.$request = request

app.config.globalProperties.$storage = storage
app.use(router).use(ElementPlus).mount('#app')
console.log('环境变量', import.meta.env)
