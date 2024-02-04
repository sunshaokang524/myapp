import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'
import 'amfe-flexible/index'
import router from './router/index'
import '../config/rem.ts'
import titleBar from  './components/title-bar.vue'
import Toast from './components/my-toast/index'

createApp(App).component('titleBar',titleBar).use(Varlet).use(router).use(Toast).mount('#app')
