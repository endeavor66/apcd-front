<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.project" clearable placeholder="项目名" class="filter-item" style="width:150px" />
      <el-select v-model="listQuery.scene" placeholder="请选择场景" class="filter-item">
        <el-option
          v-for="(item,index) in options.roleList"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select v-model="listQuery.resultType" placeholder="结果类型" class="filter-item">
        <el-option label="正常" value="1" />
        <el-option label="异常" value="-1" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item" type="success" icon="el-icon-download">
        导出
      </el-button>
    </div>

    <el-table :data="tableData" border fit highlight-current-row>
      <el-table-column
        v-for="(item,index) in tableColumns"
        :key="index"
        :label="item"
        :prop="item"
        width="160px"
        align="center"
      />
      <el-table-column label="查看详情" width="160px" align="center">
        <el-button type="primary" @click="showDetail">查看详情</el-button>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="detailVisible" title="异常原因分析">
      <p>total_file_addition太高, 第一四分位:12, 第三四分位:15</p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AnomalyResult',
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        project: '',
        scene: '',
        people: '',
        resultType: ''
      },
      tableColumns: ['people', 'total_line_addition', 'total_line_deletion', 'total_file_edit_num', 'score_lof', 'anomaly_lof'],
      tableData: [
        {
          people: 'tom',
          total_line_addition: 12,
          total_line_deletion: 8,
          total_file_edit_num: 6,
          score_lof: 0.88,
          anomaly_lof: -1
        },
        {
          people: 'jim',
          total_line_addition: 2,
          total_line_deletion: 3,
          total_file_edit_num: 6,
          score_lof: 0.78,
          anomaly_lof: 1
        }
      ],
      options: {
        roleList: ['committer', 'reviewer', 'maintainer']
      },
      detailVisible: false
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
    margin-right: 10px;
  }
</style>
