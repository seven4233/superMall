import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/assets/css/base.css'
import 'vant/lib/index.css'
// import '../node_modules/vant/lib/index.css'

import { Lazyload } from 'vant';

Vue.use(Lazyload);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
