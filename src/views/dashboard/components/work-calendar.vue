<template>
  <div>
    <!-- 年月 -->
    <el-row type="flex" justify="end">
      <el-select
        v-model="currentYear"
        size="small"
        style="width: 120px"
        @change="dateChange"
      >
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        >{{ item }}</el-option>
      </el-select>
      <el-select
        v-model="currentMonth"
        size="small"
        style="width: 120px; margin-left: 10px"
        @change="dateChange"
      >
        <el-option v-for="item in 12" :key="item" :label="item" :value="item">{{
          item
        }}</el-option>
      </el-select>
    </el-row>
    <!-- 日历组件 -->
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date, data }">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  components: {},
  filters: {
    getDay(value) {
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentMonth: null, // 当前月份
      currentYear: null, // 当前年份
      currentDate: null, // 当前时间
      yearList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.currentYear = this.startDate.getFullYear() // 当前年份
    this.currentMonth = this.startDate.getMonth() + 1 // 当前年份
    this.yearList = Array.from(
      Array(11),
      (value, index) => this.currentYear + index - 5
    )
    this.dateChange()
    // console.log(this.yearList)
  },
  mounted() {},
  methods: {
    dateChange() {
      const year = this.currentYear
      const month = this.currentMonth
      // 年月日
      this.currentDate = new Date(`${year}-${month}-1`) // 以当前月的1号为起始
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    }
  }
}
</script>

<style scoped>
/deep/ .el-calendar-day {
  height: auto;
}
/deep/ .el-calendar-table__row td,
/deep/ .el-calendar-table tr td:first-child,
/deep/ .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
/deep/ .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
/deep/ .el-calendar__header {
  display: none;
}
</style>
