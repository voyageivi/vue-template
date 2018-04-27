// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import api from './api';
import config from './config';
{{#router}}
import router from './router'
{{/router}}
{{#vuex}}
import store from './store'
{{/vuex}}
// element-ui组件样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from './filters'
import * as directives from './directives';

Vue.use(ElementUI)
// 注册全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
// 注册全局directives
Object.keys(directives).forEach(k => Vue.directive(k, filters[k]))
Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$axios', { value: api.ajax });
Object.defineProperty(Vue.prototype, 'Config', { value: config });
Object.defineProperty(Vue.prototype, 'Api', { value: api });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
