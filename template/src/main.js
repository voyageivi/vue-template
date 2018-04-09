// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// element-ui组件样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from './filters'
Vue.use(ElementUI)
// 注册全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
