<template>
  <div class="app-container">
    <div style="margin-bottom: 10px; font-size: 10px">部门：{{ depname }}</div>
    <el-container style="height: 100%">
      <el-aside width="200px" style="border: 1px silver solid">
        <!-- 部门 -->
        <el-tree
          :data="deptList"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        />
      </el-aside>
      <el-main style="padding: 0 0 0 20px">
        <el-row style="width: 100%">
          <!-- 排班日期 分页 -->
          <el-tag
            v-for="(item, index) in bookingScheduleList"
            :key="item.id"
            :type="index == activeIndex ? '' : 'info'"
            style="
              height: 60px;
              margin-right: 5px;
              margin-right: 15px;
              cursor: pointer;
            "
            @click="selectDate(item.workDate, index)"
          >
            {{ item.workDate }} {{ item.dayOfWeek }}<br >
            {{ item.availableNumber }} / {{ item.reservedNumber }}
          </el-tag>

          <!-- 分页 -->
          <el-pagination
            :current-page="page"
            :total="total"
            :page-size="limit"
            class="pagination"
            layout="prev, pager, next"
            @current-change="getPage"
          />
        </el-row>

        <el-row style="margin-top: 20px">
          <!-- 排班日期对应的排班医生 -->
          <el-table
            v-loading="listLoading"
            :data="scheduleList"
            bordere
            fit
            highlight-current-row
          >
            <el-table-column label="序号" width="60" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column label="职称" width="150">
              <template slot-scope="scope">
                {{ scope.row.title }} | {{ scope.row.docname }}
              </template>
            </el-table-column>
            <el-table-column label="号源时间" width="80">
              <template slot-scope="scope">
                {{ scope.row.workTime == 0 ? "上午" : "下午" }}
              </template>
            </el-table-column>
            <el-table-column
              prop="reservedNumber"
              label="可预约数"
              width="80"
            />
            <el-table-column
              prop="availableNumber"
              label="剩余预约数"
              width="100"
            />
            <el-table-column prop="amount" label="挂号费(元)" width="90" />
            <el-table-column prop="skill" label="擅长技能" />
          </el-table>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import《组件名称》from'《组件路径》';
import hospApi from '@/api/hosp'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {
      deptList: [],
      defaultProps: {
        children: 'children',
        label: 'depname'
      },
      hospcode: null,
      activeIndex: 0,
      depcode: null,
      depname: null,
      workDate: null,

      bookingScheduleList: [],
      baseMap: {},

      page: 1, // 当前页
      limit: 10, // 每页个数
      total: 0, // 总页码

      scheduleList: [],
      listLoading: false
    }
  },
  // 计算属性:类似于data概念,有缓存效果,用于不经常修改的数据
  computed: {},
  // 监控data中的数据变化
  watch: {},
  beforeCreate() {}, // 生命周期-创建之前
  created() {
    this.hospcode = this.$route.params.hoscode
    this.workDate = this.getCurDate()
    this.fetchData(this.hospcode)
  }, // 生命周期-创建完成（可以访问当前this实例）
  beforeMount() {}, // 生命周期-挂载之前
  mounted() {}, // 生命周期-挂载完成（可以访问DOM元素）
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  beforeUpdate() {}, // 生命周期-更新之前
  updated() {}, // 生命周期-更新之后
  beforeDestroy() {}, // 生命周期-销毁之前
  destroyed() {},
  // 方法集合
  methods: {
    getDetailSchedule() {
      hospApi.getScheduleDetail(this.hospcode, this.depcode, this.workDate)
        .then((result) => {
          this.scheduleList = result.data
        })
    },
    fetchData(hospcode) {
      hospApi.getDeptByHospcode(hospcode).then((result) => {
        this.deptList = result.data
        // 默认选中第一个
        if (this.deptList.length > 0) {
          this.depcode = this.deptList[0].children[0].depcode
          this.depname = this.deptList[0].children[0].depname

          this.getPage()
        }
      })
    },
    getPage(page = 1) {
      this.page = page
      this.workDate = null
      this.activeIndex = 0
      this.getScheduleRule()
    },
    getScheduleRule() {
      hospApi
        .getScheduleRule(this.page, this.limit, this.hospcode, this.depcode)
        .then((response) => {
          this.bookingScheduleList = response.data.bookingScheduleRuleList
          this.total = response.data.total

          this.baseMap = response.data.baseMap
          // 分页后workDate=null，默认选中第一个
          if (this.bookingScheduleList[0] && this.workDate == null) {
            this.workDate = this.bookingScheduleList[0].workDate
          }
          this.getDetailSchedule()
        })
    },
    handleNodeClick(data) {
      this.scheduleList = null
      // 科室大类直接返回
      if (data.children != null) return
      this.depcode = data.depcode
      this.depname = data.depname

      this.getPage()
    },
    selectDate(workDate, index) {
      this.workDate = workDate
      this.activeIndex = index
      this.getDetailSchedule()
    },
    getCurDate() {
      var datetime = new Date()
      var year = datetime.getFullYear()
      var month =
        datetime.getMonth() + 1 < 10
          ? '0' + (datetime.getMonth() + 1)
          : datetime.getMonth() + 1
      var date =
        datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
      return year + '-' + month + '-' + date
    }
  } // 生命周期-销毁完成
}
</script>

<style lang="scss" scoped>
.el-tree-node.is-current > .el-tree-node__content {
  background-color: #409eff !important;
  color: white;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: black;
}
</style>
