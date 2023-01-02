<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 10px" @click="settingVisible=true">重新执行一致性检验</el-button>

    <el-table :data="tableData" border fit highlight-current-row>
      <el-table-column label="pr_number" prop="pr_number" width="200px" align="center" />

      <el-table-column label="people" prop="people" width="200px" align="center" />

      <el-table-column label="scene" prop="scene" width="200px" align="center" />

      <el-table-column sortable label="fitness" prop="fitness" width="200px" align="center" />

      <el-table-column label="查看详情" width="200px" align="center">
        <el-button type="primary" @click="showDetail">查看详情</el-button>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="settingVisible" title="参数配置">
      <el-form>
        <el-form-item label="项目列表" :label-width="formLabelWidth">
          <el-select v-model="listQuery.project" placeholder="项目" class="filter-item">
            <el-option v-for="(item, index) in options.projectList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="算法列表" :label-width="formLabelWidth">
          <el-select v-model="listQuery.algorithm" placeholder="一致性检验算法" class="filter-item">
            <el-option v-for="(item, index) in options.algorithmList" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" class="filter-item" @click="settingVisible=false">取消</el-button>
        <el-button type="primary" class="filter-item">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="detailVisible" title="一致性检验详情">
      <el-image fit="fit" :src="url" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ConformanceChecking',
  data() {
    return {
      listQuery: {
        project: '',
        algorithm: ''
      },
      options: {
        projectList: ['dubbo', 'hadoop'],
        algorithmList: ['token-based replay', 'alignment']
      },
      tableData: [
        {
          pr_number: 7072,
          people: 'tom',
          scene: 'fork_merge',
          fitness: 0.88
        },
        {
          pr_number: 7072,
          people: 'tom',
          scene: 'fork_merge',
          fitness: 0.88
        }
      ],
      formLabelWidth: '160px',
      settingVisible: false,
      detailVisible: false,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    showDetail() {
      this.detailVisible = true
    }
  }
}
</script>

<style>
  .filter-container > *{
    margin-left: 10px;
  }
</style>
