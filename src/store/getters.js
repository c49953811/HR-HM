const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, // 将user模块下的token作为快捷方式放出来
  name: (state) => state.user.userInfo.username,
  userId: (state) => state.user.userInfo.userId,
  staffPhoto: (state) => state.user.userInfo.staffPhoto, // 建立用户头像的映射
  companyId: (state) => state.user.userInfo.companyId, // 建立对于user模块的companyId的快捷访问
  routes: (state) => state.permission.routes // 建立权限模块的快捷访问
}
export default getters
