<template>
  <div class="app-container">

    <div class="filter-container">
      <el-button type="primary" class="filter-item" @click="settingVisible=true">重新执行一致性检验</el-button>
      <el-select v-model="listQuery.project" placeholder="请选择项目" class="filter-item">
        <el-option v-for="(item, index) in projectList" :key="index" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.algorithm" placeholder="请选择算法" class="filter-item">
        <el-option v-for="(item, index) in options.algorithmList" :key="index" :label="item" :value="item" />
      </el-select>
      <el-button type="primary" class="filter-item" @click="getConformanceCheckResult">确 定</el-button>
    </div>

    <el-table :data="tableData" border fit highlight-current-row>
      <el-table-column v-for="(item,index) in tableHeader" :key="index" :label="item" align="center">
        <template slot-scope="{row}">
          <span>{{ row[index] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="查看详情" width="160px" align="center">
        <el-button type="primary" @click="showDetail">查看详情</el-button>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="settingVisible" title="参数配置">
      <el-form>
        <el-form-item label="项目列表" :label-width="formLabelWidth">
          <el-select v-model="listQuery.project" placeholder="项目" class="filter-item">
            <el-option v-for="(item, index) in projectList" :key="index" :label="item" :value="item" />
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
        <el-button type="primary" class="filter-item" @click="conformanceCheck">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="detailVisible" title="一致性检验详情">
      <el-image fit="fit" :src="url" />
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ConformanceChecking',
  data() {
    return {
      listQuery: {
        project: '',
        algorithm: ''
      },
      options: {
        algorithmList: ['token-based-replay', 'alignments']
      },
      tableHeader: [],
      tableData: [],
      formLabelWidth: '160px',
      settingVisible: false,
      detailVisible: false,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  computed: {
    ...mapState('project', ['projectList'])
  },
  methods: {
    showDetail() {
      this.detailVisible = true
    },
    conformanceCheck() {
      this.$API.processMining.conformanceCheck(this.listQuery).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.message)
        } else {
          this.$message.warning(res.message)
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    getConformanceCheckResult() {
      this.$API.processMining.getConformanceCheckResult(this.listQuery).then((res) => {
        if (res.code == 200) {
          this.tableHeader = res.data.header
          this.tableData = res.data.rows
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
  .filter-container > *{
    margin-left: 10px;
  }
</style>
