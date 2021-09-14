<template>
  <div class="app-container">
    医院设置添加
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode" />
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl" />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName" />
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
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
      hospitalSet: {}
    }
  },
  // 计算属性:类似于data概念,有缓存效果,用于不经常修改的数据
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  beforeCreate() {}, // 生命周期-创建之前
  created() {
    const args = this.$route.params
    if (args && args.id) {
      const id = args.id
      this.getHospSet(id)
    } else {
      this.hospitalSet = {}
    }
  }, // 生命周期-创建完成（可以访问当前this实例）
  beforeMount() {}, // 生命周期-挂载之前
  mounted() {}, // 生命周期-挂载完成（可以访问DOM元素）
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  beforeUpdate() {}, // 生命周期-更新之前
  updated() {}, // 生命周期-更新之后
  beforeDestroy() {}, // 生命周期-销毁之前
  destroyed() {}, // 生命周期-销毁完成
  methods: {
    saveOrUpdate() {
      // 有id就修改,没有就保存
      if (this.hospitalSet.id) {
        this.update()
      } else {
        this.save()
      }
    },
    save() {
      hospset.saveHospSet(this.hospitalSet).then((data) => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$router.push({ path: '/hospSet/list' })
      })
    },
    update() {
      hospset.updateHospSet(this.hospitalSet).then((data) => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$router.push({ path: '/hospSet/list' })
      })
    },
    getHospSet(id) {
      hospset.getHospSet(id).then((data) => {
        this.hospitalSet = data.data
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
