import { login, getUserInfo, getUserDatailById } from '@/api/user'
import { setItem, getItem, removeItem } from '@/utils/storage'
import { setTimeStamp } from '@/utils/auth'
const TOKEN_KEY = 'Hr_Token' // 设置一个独一无二的ken
export default {
  namespaced: true,
  state: {
    token: getItem(TOKEN_KEY) || null,
    userInfo: {}
  },
  mutations: {
    setToken(state, value) {
      state.token = value
      setItem(TOKEN_KEY, state.token)
    },
    // 退出登陆清空vuex数据跟localStorage缓存
    removeToken(state) {
      state.token = null
      removeItem(TOKEN_KEY)
    },
    setUserInfo(state, value) {
      state.userInfo = value
      // setItem(TOKEN_KEY, state.userInfo)
    },
    // 退出登陆清空vuex用户数据
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    // 登陆
    async toLogin(store, form) {
      const res = await login(form)
      store.commit('setToken', res)
      setTimeStamp() // 设置当前时间戳
    },
    // 获取用户信息
    async getUserInfo(store) {
      const res = await getUserInfo()
      // 上序同步完成后 获取员工信息
      const baseInfo = await getUserDatailById(res.userId)
      // 合并两个接口返回的数据
      store.commit('setUserInfo', { ...res, ...baseInfo })
      return res
    },
    // 退出登陆
    logout(store) {
      // 删除token
      store.commit('removeToken')
      // 删除用户资料
      store.commit('removeUserInfo')
    }
  }
}
