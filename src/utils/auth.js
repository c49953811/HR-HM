import Cookies from 'js-cookie'
import { setItem, getItem } from './storage'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const TIME_KEY = 'Hr_TIME' // 设置一个独一无二的time
// 获取时间戳
export function getTimeStamp() {
  return getItem(TIME_KEY)
}
// 设置时间戳
export function setTimeStamp() {
  setItem(TIME_KEY, Date.now())
}
