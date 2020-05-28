import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import './assets/css/reset.css';


// element-ui引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$axios = axios;
//引入服务器地址
import config from './config/config'
Vue.prototype.baseUrl = config.baseUrl

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
