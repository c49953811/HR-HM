<template>
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async success({ header, results }) {
      // console.log('header', header, 'results', results)
      const userRelations = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber'
      }
      const arr = []
      results.forEach((item) => {
        const userInfo = {}
        Object.keys(item).forEach((key) => {
          // key =>item的属性如姓名，userRelations[key]=>是他对应的属性值
          // 定义一个空对象接收 转换成 username= '李四'
          if (
            userRelations[key] === 'timeOfEntry' ||
            userRelations[key] === 'correctionTime'
          ) {
            userInfo[userRelations[key]] = new Date(
              this.formatDate(item[key], '/')
            ) // 只有这样, 才能入库
            // return
          } else {
            userInfo[userRelations[key]] = item[key]
          }
        })
        arr.push(userInfo)
      })
      await importEmployee(arr) // 调用导入接口
      this.$router.back()
      // 简化
      // const newArr = results.map((item) => {
      //   const userInfo = {}
      //   Object.keys(item).forEach((key) => {
      //     // key =>item的属性如姓名，userRelations[key]=>是他对应的属性值
      //     // 定义一个空对象接收 转换成 username= '李四'
      //     userInfo[userRelations[key]] = item[key]
      //   })
      //   return userInfo
      // })
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return (
        year +
        (month < 10 ? '0' + month : month) +
        (date < 10 ? '0' + date : date)
      )
    }
  }
}
</script>
<style lang="less" scoped></style>
