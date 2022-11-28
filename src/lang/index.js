import Vue from 'vue'
import Cookie from 'js-cookie' // 引入cookie包
import VueI18n from 'vue-i18n'
import elementEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包
import customZH from './zh' // 引入自定义中文包
import customEN from './en' // 引入自定义英文包
Vue.use(VueI18n)
export default new VueI18n({
  locale: Cookie.get('language') || 'zh', // 当前多语言类型
  messages: {
    en: {
      ...elementEN, // 将饿了么的英文语言包引入
      ...customEN
    },
    zh: {
      ...elementZH, // 将饿了么的中文语言包引入
      ...customZH
    }
  } //  当前语言包
})
