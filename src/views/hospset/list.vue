<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">
        查询
      </el-button>
    </el-form>
    <!-- list -->
    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="hoscode" label="医院编号" />
      <el-table-column prop="apiUrl" label="api基础路径" width="200" />
      <el-table-column prop="contactName" label="联系人姓名" />
      <el-table-column prop="contactPhone" label="联系人手机" />
      <el-table-column prop="contactPhone" label="联系人手机" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-algin: center"
      background
      layout="prev, pager, next, jumper, ->, total"
      @current-change="getList"
    />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import《组件名称》from'《组件路径》';
import hospset from '@/api/hospset'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {
      current: 1,
      limit: 10,
      searchObj: {},
      total: 0,
      list: []
    }
  },
  // 计算属性:类似于data概念,有缓存效果,用于不经常修改的数据
  computed: {},
  // 监控data中的数据变化
  watch: {},
  beforeCreate() {}, // 生命周期-创建之前
  created() {
    this.getList(1)
  },
  // 方法集合
  beforeMount() {}, // 生命周期-挂载之前
  mounted() {}, // 生命周期-挂载完成（可以访问DOM元素）
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  beforeUpdate() {}, // 生命周期-更新之前
  updated() {}, // 生命周期-更新之后
  beforeDestroy() {}, // 生命周期-销毁之前
  destroyed() {}, // 生命周期-销毁完成
  methods: {
    getList(curr = 1) {
      this.current = curr
      hospset
        .getHospSetList(curr, this.limit, this.searchObj)
        .then((data) => {
          this.list = data.data.records
          this.total = data.total
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    removeDataById(id) {
      alert(id)
    }
  } // 生命周期-创建完成（可以访问当前this实例）
}
</script>

<style scoped>
</style>
