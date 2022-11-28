<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <!-- 显示图标 -->
    <div>
      <svg-icon icon-class="language" style="color: #fff; font-size: 20px" />
    </div>
    <!-- 下拉图标 -->
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        command="zh"
        :disabled="'zh' === $i18n.locale"
      >中</el-dropdown-item>
      <el-dropdown-item
        command="en"
        :disabled="'en' === $i18n.locale"
      >EN</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'
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
    changeLanguage(type) {
      Cookie.set('language', type)
      this.$i18n.locale = type // 设置给本地的i18n插件
      this.$message.success('切换多语言成功')
    }
  }
}
</script>
<style lang="less" scoped></style>
