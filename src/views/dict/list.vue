<template>
  <div>
    <el-table
      :data="list"
      :load="getChildren"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      lazy
    >
      <el-table-column label="日期" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编码" width="220" align="left">
        <template slot-scope="{ row }">
          <span>
            {{ row.dictCode }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="值" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import《组件名称》from'《组件路径》';
import dict from '@/api/dict'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    // 这里存放数据
    return {
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
  }, // 生命周期-创建完成（可以访问当前this实例）
  beforeMount() {}, // 生命周期-挂载之前
  mounted() {}, // 生命周期-挂载完成（可以访问DOM元素）
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  beforeUpdate() {}, // 生命周期-更新之前
  updated() {}, // 生命周期-更新之后
  beforeDestroy() {}, // 生命周期-销毁之前
  destroyed() {}, // 生命周期-销毁完成
  // 方法集合
  methods: {
    getList(id) {
      dict
        .getList(id)
        .then((data) => {
          this.list = data.data
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getChildren(tree, treeNode, resolve) {
      dict.getList(tree.id).then((data) => {
        resolve(data.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
