import request from '@/utils/request'
// 登陆
export function login(data) {
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'POST',
    data
  })
}
// 获取用户信息
export function getUserInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
// 获取员工个人信息
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
    // method: 'GET'  默认接口是GET可不写
  })
}

// 退出登陆
export function logout() {}
