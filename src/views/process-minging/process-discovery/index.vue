<template>
  <div>
    <!-- Form -->
    <el-button type="primary" @click="dialogFormVisible = true">构建主流模式</el-button>

    <el-dialog title="参数设置" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="项目列表" :label-width="formLabelWidth">
          <el-select v-model="form.project" multiple placeholder="请选择项目">
            <el-option v-for="(item, index) in options.projectList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="场景列表" :label-width="formLabelWidth">
          <el-select v-model="form.scene" multiple placeholder="请选择场景">
            <el-option label="贡献者模式-PR被合入(fork_merge)" value="fork_merge" />
            <el-option label="贡献者模式-PR被关闭(fork_close)" value="fork_close" />
            <el-option label="协作者模式-PR被合入(unfork_merge)" value="unfork_merge" />
            <el-option label="协作者模式-PR被关闭(unfork_close)" value="unfork_close" />
          </el-select>
        </el-form-item>
        <el-form-item label="构建算法" :label-width="formLabelWidth">
          <el-select v-model="form.algorithm" placeholder="请选择构建算法">
            <el-option v-for="(item, index) in options.algorithmList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="constructProcessModel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ProcessDiscovery',
  data() {
    return {
      form: {
        project: '',
        scene: '',
        algorithm: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '160px',
      options: {
        projectList: ['dubbo', 'hadoop'],
        algorithmList: ['alpha-mining', 'heuristic-mining', 'inductive-mining']
      }
    }
  },
  methods: {
    constructProcessModel() {
      console.log('开始构建主流模式')
    }
  }
}
</script>

<style>

</style>
