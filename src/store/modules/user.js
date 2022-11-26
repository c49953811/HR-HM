import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { setItem, getItem, removeItem } from '@/utils/storage'
import { resetRouter } from '@/router'
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
      const baseInfo = await getUserDetailById(res.userId)
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
      // 重置路由
      resetRouter()
      // 设置权限模块下路由为初始状态
      // vuex子模块在没加锁的情况下，直接调用
      // 因为不加命名空间的情况下。所有mutations和actions都挂在全局，所有可以直接调用
      // 但是加了命名空间的子模块他的store 指的不是全局的store
      // mutations 有3个参数 第一个是名称 第二个是载荷payload(修改的value) 第三个是个对象
      // 如果想调用加了命名空间的子模块 第三个参数需要加 {root:true}
      // root：true 是指调用根级的mutations和actions
      // 加了root :true mutations的名称就得加哪个模块下的名称
      store.commit('permission/setRoutes', [], { root: true })
    }
  }
}
