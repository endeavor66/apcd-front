<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.project" placeholder="项目" class="filter-item">
        <el-option v-for="(item, index) in projectList" :key="index" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.scene" placeholder="请选择场景" class="filter-item">
        <el-option
          v-for="(item,index) in options.roleList"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select v-model="listQuery.resultType" clearable placeholder="结果类型" class="filter-item">
        <el-option label="正常" value="1" />
        <el-option label="异常" value="-1" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getAnomalyResult">搜索</el-button>
      <el-button class="filter-item" type="success" icon="el-icon-download">导出</el-button>
    </div>

    <el-table :data="tableData" border fit highlight-current-row>
      <el-table-column
        v-for="(item,index) in tableHeader"
        :key="index"
        :label="item"
        width="160px"
        align="center"
      >
        <template slot-scope="{row}">
          <el-tooltip v-if="index<row.length-1" class="item" effect="dark" placement="bottom">
            <div slot="content" v-html="getToolTip(index)" />
            <span v-if="index==0">{{ row[index] }}</span>
            <span v-else-if="row[row.length-1]==-1" :style="getBackGroudColor(row[index], index)">{{ formatFloat(row[index]) }}</span>
            <span v-else>{{ formatFloat(row[index]) }}</span>
          </el-tooltip>
          <el-tag v-else :type="row[index]==1?'success':'danger'">{{ row[index]==1?'正常':'异常' }}</el-tag>
        </template>
      </el-table-column>
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
import { mapState } from 'vuex'
export default {
  name: 'AnomalyResult',
  data() {
    return {
      listQuery: {
        project: '',
        scene: '',
        resultType: ''
      },
      tableHeader: [],
      tableData: [],
      quartiles: [],
      options: {
        roleList: ['committer', 'reviewer', 'maintainer']
      },
      detailVisible: false
    }
  },
  computed: {
    ...mapState('project', ['projectList'])
  },
  methods: {
    showDetail() {
      this.detailVisible = true
    },
    getAnomalyResult() {
      this.$API.anomalyDetect.getAnomalyResult(this.listQuery).then((res) => {
        res.data.header.splice(-7, 6)
        res.data.rows.forEach(e => { e.splice(-7, 6) })
        this.tableHeader = res.data.header
        this.tableData = res.data.rows
        this.quartiles = res.data.quartiles
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    formatFloat(v) {
      if (v.indexOf('.') !== -1) {
        return parseFloat(v).toFixed(2)
      }
      return v
    },
    getToolTip(index) {
      if (index == 0) {
        return ''
      }
      const colName = this.tableHeader[index]
      const lower = this.quartiles[0][index]
      const upper = this.quartiles[2][index]
      const tip = colName + '<br/>上四分位:' + parseFloat(upper).toFixed(2) + '<br/>下四分位:' + parseFloat(lower).toFixed(2)
      return tip
    },
    getBackGroudColor(v, index) {
      const value = parseFloat(v)
      const upper = parseFloat(this.quartiles[2][index])
      const lower = parseFloat(this.quartiles[0][index])
      if (value < lower) {
        return 'background-color: #5ddec4'
      } else if (value > upper) {
        return 'background-color: #ff8080'
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
  .filter-container > *{
    margin-right: 10px;
  }
</style>
