import Vue from 'vue'
import App from './App.vue' 
//引入路由器
import router from './router'

// import vueResource from 'vue-resource' 
//引入store
import store from './store'

import { VueAxios } from "./utils/request"; 
import getWeb3 from "./utils/getWeb3";     
//中英文切换
import i18n from "./global/register-i18n"  
import Clipboard from 'vue-clipboard2';
import VueApexCharts from "vue-apexcharts"; 

Vue.config.productionTip = false

Vue.prototype.$web3 = getWeb3
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(Clipboard);
// Vue.use(i18n) 
// Vue.use(vueResource)   
Vue.use(VueAxios, router) 

new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')





