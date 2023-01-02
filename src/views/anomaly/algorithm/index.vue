<template>
  <div>
    <el-button type="primary" style="margin-bottom: 10px" @click="settingVisible=true">重新训练模型</el-button>

    <el-dialog :visible.sync="settingVisible" title="参数配置">
      <el-form>
        <el-form-item label="项目列表" :label-width="formLabelWidth">
          <el-select v-model="listQuery.project" placeholder="项目" class="filter-item">
            <el-option v-for="(item, index) in options.projectList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色列表" :label-width="formLabelWidth">
          <el-checkbox-group v-model="listQuery.scenes">
            <el-checkbox v-for="(item,index) in options.sceneList" :key="index" :label="item" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="算法列表" :label-width="formLabelWidth">
          <el-checkbox-group v-model="listQuery.algorithms">
            <el-checkbox v-for="(item,index) in options.algorithmList" :key="index" :label="item" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="重新计算特征" :label-width="formLabelWidth">
          <el-checkbox v-model="listQuery.featureFlag" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" class="filter-item" @click="settingVisible=false">取消</el-button>
        <el-button type="primary" class="filter-item">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Algorithm',
  data() {
    return {
      listQuery: {
        project: '',
        scenes: [],
        algorithms: [],
        featureFlag: false
      },
      options: {
        projectList: ['dubbo', 'hadoop'],
        sceneList: ['committer', 'reviewer', 'maintainer'],
        algorithmList: ['isolation forest', 'one class svm', 'lof']
      },
      formLabelWidth: '160px',
      settingVisible: false
    }
  }
}
</script>

<style>

</style>
