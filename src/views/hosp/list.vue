<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select
          v-model="searchObj.provinceCode"
          placeholder="请选择省"
          @change="provinceChanged"
        >
          <el-option
            v-for="item in provinceList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select
          v-model="searchObj.cityCode"
          placeholder="请选择市"
          @change="cityChanged"
        >
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>

      <el-button
        type="primary"
        icon="el-icon-search"
        @click="fetchData()"
      >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- banner列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="60" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="医院logo">
        <template slot-scope="scope">
          <img
            :src="'data:image/jpeg;base64,' + scope.row.logoData"
            width="80"
          >
        </template>
      </el-table-column>

      <el-table-column prop="hosname" label="医院名称" />
      <el-table-column prop="param.hostypeString" label="等级" width="90" />
      <el-table-column prop="param.fullAddress" label="详情地址" />
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status == 0 ? "未上线" : "已上线" }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-text="已上线"
            inactive-text="未上线"
            @change="updateStatus(scope.row.id, scope.row.status)"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />
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
      listLoading: true, // 数据是否正在加载
      list: null, // 医院列表
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      searchObj: {}, // 查询表单对象
      provinceList: [],
      cityList: [],
      districtList: []
    }
  },
  // 计算属性:类似于data概念,有缓存效果,用于不经常修改的数据
  computed: {},
  // 监控data中的数据变化
  watch: {},
  beforeCreate() {}, // 生命周期-创建之前
  created() {
    this.fetchData()
    this.findAllProvince()
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
    updateStatus(id, status) {
      hospApi.updateStatus(id, 1).then((data) => {
        this.fetchData(1)
      })
    },
    fetchData(page = 1) {
      this.page = page
      hospApi
        .getHospList(this.page, this.limit, this.searchObj)
        .then(({ data }) => {
          this.list = data.content
          this.total = data.totalElements
          this.listLoading = false
          // todo 解决status number 与 bool冲突问题
          console.log(this.list[0])
        })
        .catch((err) => console.log(err, 'fetchData'))
    },
    findAllProvince() {
      hospApi
        .findByDictCode('Province')
        .then(({ data }) => {
          this.provinceList = data
        })
        .catch((err) => console.log(err, 'findAllProvince'))
    },
    provinceChanged() {
      this.cityList = []
      this.searchObj.cityCode = null

      hospApi
        .findChildId(this.searchObj.provinceCode)
        .then(({ data }) => {
          this.cityList = data
          console.log(data)
        })
        .catch((err) => console.log(err, 'provinceChanged'))
    },
    changeSize(size) {
      this.limit = size
      this.fetchData(1)
    },
    cityChanged() {}
  } // 生命周期-销毁完成
}
</script>

<style scoped>
</style>
