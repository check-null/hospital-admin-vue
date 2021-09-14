<template>
  <div class="app-container">
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start">
        <a href="http://localhost:8202/admin/cmn/dict/export" target="_blank">
          <el-button type="text">
            <i class="fa fa-plus">导出</i>
          </el-button>
        </a>
        <el-button type="text" @click="dialogImportVisible = true">
          <i class="fa fa-plus">导入</i>
        </el-button>
      </div>
    </div>

    <el-table
      :data="list"
      :load="getChildren"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      lazy
    >
      <el-table-column label="日期" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编码" width="220" align="left">
        <template slot-scope="scope">
          <span>
            {{ scope.row.dictCode }}
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

    <el-dialog :visible.sync="dialogImportVisible" title="导入" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8202/admin/cmn/dict/import'"
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传excel文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false"> 取消 </el-button>
      </div>
    </el-dialog>
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
      list: [],
      listLoading: true,
      dialogImportVisible: false
    }
  },
  // 计算属性:类似于data概念,有缓存效果,用于不经常修改的数据
  computed: {},
  // 监控data中的数据变化
  watch: {},
  beforeCreate() {}, // 生命周期-创建之前
  created() {
    this.getList()
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
    getList(id = 1) {
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
    },
    onUploadSuccess() {
      this.dialogImportVisible = false
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
