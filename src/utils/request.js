import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from './auth'

const TimeOut = 3600 // 定义超时时间
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 检查是否超时
      if (IsCheckTimeOut()) {
        // 为ture=>超时，需要清除 token,跳转到登陆页，并return 错误信息
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token超时了'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return PromiseRejectionEvent.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  // error有response的对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 10002表示后端告诉超时
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
}
)
// 超时判断
function IsCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service
