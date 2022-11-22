// 因为key要保持一致，所以建议声明成常量，这样更方便日后修改
// 封装操作本地存储token的方法
// 保存，传递一个数据过来参数--有参数
export const setItem = (key, value) => {
  // 将数组、对象类型的数据转换为 JSON 格式字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取, 没参数，要返回值
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除，既不用参数也不用返回值
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
