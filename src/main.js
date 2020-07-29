// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' //ElementUI css样式
//第三方图标
import './assets/icon/iconfont.css'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';

Vue.use(ElementUI)
// // step2：把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求,
// // 不需要每次都 import一下 axios了，直接使用 $axios 即可
Vue.prototype.$axios = axios;
// // step3：使每次请求都会带一个 /api 前缀 
axios.defaults.baseURL = 'http://localhost/'
	
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,  //store:store 和router一样，将我们创建的Vuex实例挂载到这个vue实例中
  components: { App },
  template: '<App/>'
})