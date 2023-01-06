<template>
  <div class="app-container">
    <!-- Form -->
    <el-form>
      <el-form-item label="项目列表" :label-width="formLabelWidth">
        <el-select v-model="form.projectList" multiple placeholder="请选择项目">
          <el-option v-for="(item, index) in projectList" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="场景列表" :label-width="formLabelWidth">
        <el-select v-model="form.sceneList" multiple placeholder="请选择场景">
          <el-option label="fork_merge" value="fork_merge" />
          <el-option label="fork_close" value="fork_close" />
          <el-option label="unfork_merge" value="unfork_merge" />
          <el-option label="unfork_close" value="unfork_close" />
        </el-select>
      </el-form-item>
      <el-form-item label="构建算法" :label-width="formLabelWidth">
        <el-select v-model="form.algorithm" placeholder="请选择构建算法" @change="getDefaultAlgorithmParam">
          <el-option v-for="(item, index) in options.algorithmList" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="算法参数" :label-width="formLabelWidth">
        <el-input v-model="form.param" placeholder="参数之间用逗号分隔" :disabled="locked" style="width:600px" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="buildProcessModel">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProcessDiscovery',
  data() {
    return {
      form: {
        projectList: [],
        sceneList: [],
        algorithm: '',
        param: ''
      },
      locked: true,
      formLabelWidth: '70px',
      options: {
        algorithmList: ['alpha-mining', 'heuristics-mining', 'inductive-mining']
      }
    }
  },
  computed: {
    ...mapState('project', ['projectList'])
  },
  methods: {
    buildProcessModel() {
      const param = {
        'projectList': this.form.projectList.join(','),
        'sceneList': this.form.sceneList.join(','),
        'algorithm': this.form.algorithm,
        'param': this.form.param
      }
      this.$API.processMining.buildModel(param).then((res) => {
        this.$message.success(res.message)
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    getDefaultAlgorithmParam() {
      if (this.form.algorithm === 'heuristics-mining') {
        this.locked = false
        this.form.param = 'dependency_threshold=0.5,and_threshold=0.65,loop_two_threshold=0.5'
      } else if (this.form.algorithm === 'inductive-mining') {
        this.locked = false
        this.form.param = 'noise_threshold=0.0'
      } else if (this.form.algorithm === 'alpha-mining') {
        this.locked = true
        this.form.param = ''
      }
    }
  }
}
</script>

<style>

</style>
