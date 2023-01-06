<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="项目列表" :label-width="formLabelWidth">
        <el-select v-model="listQuery.project" placeholder="项目" class="filter-item">
          <el-option v-for="(item, index) in projectList" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色列表" :label-width="formLabelWidth">
        <el-checkbox-group v-model="listQuery.scenes">
          <el-checkbox v-for="(item,index) in options.sceneList" :key="index" :label="item" />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="算法列表" :label-width="formLabelWidth">
        <el-checkbox-group v-model="listQuery.algorithms" disabled>
          <el-checkbox v-for="(item,index) in options.algorithmList" :key="index" :label="item" checked />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="重新计算特征" :label-width="formLabelWidth">
        <el-checkbox v-model="listQuery.featureFlag" />
      </el-form-item>

      <el-form-item v-show="listQuery.featureFlag" label="时间范围" :label-width="formLabelWidth">
        <el-date-picker
          v-model="listQuery.daterange"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" class="filter-item" @click="anomalyDetect">确定</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Algorithm',
  data() {
    return {
      listQuery: {
        project: '',
        scenes: [],
        algorithms: [],
        featureFlag: false,
        daterange: []
      },
      options: {
        sceneList: ['committer', 'reviewer', 'maintainer'],
        algorithmList: ['isolation forest', 'one class svm', 'lof']
      },
      formLabelWidth: '100px'
    }
  },
  computed: {
    ...mapState('project', ['projectList'])
  },
  methods: {
    anomalyDetect() {
      const param = {
        'project': this.listQuery.project,
        'scenes': this.listQuery.scenes.join(','),
        'algorithms': this.listQuery.algorithms.join(','),
        'featureFlag': this.listQuery.featureFlag,
        'dateRange': this.listQuery.daterange.join(',')
      }
      this.$API.anomalyDetect.anomalyDetect(param).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.message)
        } else {
          this.$message.warning(res.message)
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style>

</style>
