import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Component from '@/components'
import CheckPermission from '@/mixin/checkPermission'
// import 语法 * as =》导出所有export 到 变量directives
import * as directives from '@/directives'
import * as filters from '@/filters'
import '@/icons' // icon
import '@/permission' // permission control
import i18n from '@/lang'
// set ElementUI lang to EN
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 遍历directives变量 先用keys() 将其改为数组再遍历
// ['imageerror','',...]
Object.keys(directives).forEach((key) => {
  // key=>数组的属性名,这是过滤器名称  directives[key]是过滤器的方法
  Vue.directive(key, directives[key])
})
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.use(Component)
Vue.mixin(CheckPermission) // 注入混入
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})
