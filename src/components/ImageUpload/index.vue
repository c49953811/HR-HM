<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      :file-list="fileList"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
      action="#"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showPercent"
      style="width: 180px"
      :percentage="percent"
    />
    <el-dialog :visible.sync="showDialog">
      <img
        :src="imgUrl"
        alt=""
        style="width: 100%"
      ></el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'xxxx',
  SecretKey: 'xxxx'
})
export default {
  props: {},
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null,
      percent: 0,
      showPercent: false
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  created() {},
  methods: {
    preview(file) {
      console.log(file)
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid) // this.fileList=fileList
    },
    // 不能用push ，因为这个函数会自动调用两次
    changeFile(file, fileList) {
      this.fileList = fileList.map((item) => item)
      // 因为还没有上传，所有第二次进调用的数据fileList 一定是空,map个空数组，等于返回一个空数组
      // 如果有上传动作（无论成功还是失败），fileList都有数据，第二次会覆盖第一次的数据
    },
    beforeUpload(file) {
      // 先检查文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      // types.some(item => item === file.type)
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      // 检查文件大小
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小最大不能超过5M!')
        return false
      }
      // 确定当前上传的就是当前的这个file
      this.currentFileUid = file.uid
      return true
    },
    upload(params) {
      if (params.file) {
        this.showPercent = true // 显示进度条
        cos.putObject(
          {
            Bucket: 'xxxxx', // 存储桶
            Region: 'ap-beijing', // 地域
            Key: params.file.name, // 文件名
            StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
            Body: params.file, // 要上传的文件对象
            onProgress: (params) => {
              this.percent = params.percent * 100
            }
            // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
          },
          (err, data) => {
            // data返回数据之后 应该如何处理
            // data中有一个statusCode === 200 的时候说明上传成功

            if (!err && data.statusCode === 200) {
              //   此时说明文件上传成功  要获取成功的返回地址
              // fileList才能显示到上传组件上 此时我们要将fileList中的数据的url地址变成 现在上传成功的地址
              // 目前虽然是一张图片 但是请注意 我们的fileList是一个数组
              // 需要知道当前上传成功的是哪一张图片
              this.fileList = this.fileList.map((item) => {
                // 去找谁的uid等于刚刚记录下来的id
                if (item.uid === this.currentFileUid) {
                  // 将成功的地址赋值给原来的url属性
                  return { url: 'http://' + data.Location, upload: true }
                  // upload 为true 表示这张图片已经上传完毕 这个属性要为我们后期应用的时候做标记
                  // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
                }
                return item
              })
              // 关闭进度条
              // 重置百分比
              this.showPercent = false
              this.percent = 0
              // 将上传成功的地址 回写到了fileList中 fileList变化  =》 upload组件 就会根据fileList的变化而去渲染视图
            }
          }
        )
      }
    }
  }
}
</script>
<style scoped>
::v-deep .disabled .el-upload--picture-card {
  display: none;
}
</style>
