<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.project" placeholder="请选择项目" class="filter-item">
        <el-option v-for="(item, index) in projectList" :key="index" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.scene" placeholder="请选择场景" class="filter-item">
        <el-option
          v-for="(item,index) in options.sceneList"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-input
        v-model="listQuery.prNumber"
        clearable
        placeholder="PR Number"
        style="width: 150px"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        搜索
      </el-button>
      <el-button class="filter-item" type="success" icon="el-icon-download" :loading="downloadLoading" @click="handleDownload">
        导出
      </el-button>

    </div>

    <el-table :data="tableData" border fit highlight-current-row>
      <el-table-column label="项目" prop="repo" :width="columnWidth" align="center" />

      <el-table-column label="PR" prop="prNumber" :width="columnWidth" align="center" />

      <el-table-column label="活动" prop="activity" :width="columnWidth" align="center" />

      <el-table-column label="开始时间" prop="createdAt" :width="columnWidth" align="center" :formatter="formatDate" />

      <el-table-column label="人员" prop="people" :width="columnWidth" align="center" />

      <el-table-column label="场景" prop="scene" :width="columnWidth" align="center" />
    </el-table>

    <el-pagination
      :current-page="listQuery.currentPage"
      :page-sizes="[20, 50, 100]"
      :page-size="listQuery.pageSize"
      :total="total"
      background
      layout="prev, pager, next, jumper, sizes, total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DataPreview',
  // components: { Pagination },
  data() {
    return {
      listQuery: {
        project: '',
        scene: '',
        prNumber: '',
        currentPage: 1,
        pageSize: 20
      },
      total: 100,
      tableData: [],
      downloadData: [],
      columnWidth: 160,
      options: {
        sceneList: ['fork_merge', 'fork_close', 'unfork_merge', 'unfork_close']
      },
      downloadLoading: false
    }
  },
  computed: {
    ...mapState('project', ['projectList'])
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      // TODO 传递参数，调用后端接口查询数据
      this.$API.dataProcess.getEventLog(this.listQuery).then((res) => {
        this.tableData = res.data.records
        this.total = res.data.total
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    // 格式化日期
    formatDate(row, column) {
      // 获取单元格数据
      const data = row[column.property]
      if (data == null) {
        return null
      }
      return new Date(data).format('yyyy-MM-dd hh:mm:ss')
    },
    // 根据查询条件(不含分页参数)获取所有数据
    async getDownloadData() {
      const param = {
        'project': this.listQuery.project,
        'scene': this.listQuery.scene,
        'prNumber': this.listQuery.prNumber,
        'currentPage': 1,
        'pageSize': 100000 // 这里将分页参数设置为一个上限，最多导出100000条数据
      }
      const res = await this.$API.dataProcess.getEventLog(param)
      return res.data.records
    },
    // 对数据中的时间进行格式化(时间戳->日期)，并转化为二位数组
    formatJson(data, tHeader) {
      return data.map(v => tHeader.map(j => {
        if (j === 'createdAt') {
          return new Date(v[j]).format('yyyy-MM-dd hh:mm:ss')
        } else {
          return v[j]
        }
      }))
    },
    // 借助Export2Excel将结果导出为excel文件
    async handleDownload() {
      this.downloadLoading = true
      const tHeader = ['id', 'repo', 'activity', 'createdAt', 'people', 'scene']
      const data = await this.getDownloadData()
      const formatData = this.formatJson(data, tHeader)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: formatData,
          filename: 'event_log',
          bookType: 'csv'
        })
        this.downloadLoading = false
      })
    }
  }
}
</script>

<style>
  .filter-container > * {
    margin-right: 10px;
  }
</style>
