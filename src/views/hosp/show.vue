<template>
  <div class="app-container">
    <h4>基本信息</h4>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">医院名称</th>
          <td width="35%">
            <b style="font-size: 14px">{{ hospital.hosname }}</b> |
            {{ hospital.param.hostypeString }}
          </td>
          <th width="15%">医院logo</th>
          <td width="35%">
            <img
              :src="'data:image/jpeg;base64,' + hospital.logoData"
              width="80"
            >
          </td>
        </tr>
        <tr>
          <th>医院编码</th>
          <td>{{ hospital.hoscode }}</td>
          <th>地址</th>
          <td>{{ hospital.param.fullAddress }}</td>
        </tr>
        <tr>
          <th>坐车路线</th>
          <td colspan="3">{{ hospital.route }}</td>
        </tr>
        <tr>
          <th>医院简介</th>
          <td colspan="3">{{ hospital.intro }}</td>
        </tr>
      </tbody>
    </table>

    <h4>预约规则信息</h4>
    <table
      class="table table-striped table-condenseda table-bordered"
      width="100%"
    >
      <tbody>
        <tr>
          <th width="15%">预约周期</th>
          <td width="35%">{{ bookingRule.cycle }}天</td>
          <th width="15%">放号时间</th>
          <td width="35%">{{ bookingRule.releaseTime }}</td>
        </tr>
        <tr>
          <th>停挂时间</th>
          <td>{{ bookingRule.stopTime }}</td>
          <th>退号时间</th>
          <td>
            {{ bookingRule.quitDay == -1 ? "就诊前一工作日" : "就诊当日"
            }}{{ bookingRule.quitTime }} 前取消
          </td>
        </tr>
        <tr>
          <th>预约规则</th>
          <td colspan="3">
            <ol>
              <li v-for="item in bookingRule.rule" :key="item">{{ item }}</li>
            </ol>
          </td>
        </tr>
        <br >
        <el-row>
          <el-button @click="back">返回</el-button>
        </el-row>
      </tbody>
    </table>
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
      hospital: null,
      bookingRule: null
    }
  },
  // 计算属性:类似于data概念,有缓存效果,用于不经常修改的数据
  computed: {},
  // 监控data中的数据变化
  watch: {},
  beforeCreate() {}, // 生命周期-创建之前
  created() {}, // 生命周期-创建完成（可以访问当前this实例）
  beforeMount() {}, // 生命周期-挂载之前
  mounted() {}, // 生命周期-挂载完成（可以访问DOM元素）
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  beforeUpdate() {}, // 生命周期-更新之前
  updated() {}, // 生命周期-更新之后
  beforeDestroy() {}, // 生命周期-销毁之前
  destroyed() {}, // 生命周期-销毁完成
  // 方法集合
  methods: { }
}
</script>

<style lang="scss" scoped>
</style>
