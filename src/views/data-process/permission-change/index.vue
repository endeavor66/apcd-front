<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.project" clearable placeholder="项目名" class="filter-item" style="width:150px" />
      <el-select v-model="listQuery.scene" placeholder="请选择场景" class="filter-item" clearable>
        <el-option
          v-for="(item,index) in options.roleList"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-input v-model="listQuery.people" clearable placeholder="人员" class="filter-item" style="width:150px" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
      <el-button class="filter-item" type="success" icon="el-icon-download">导出</el-button>
    </div>

    <el-table :data="tableData" border fit highlight-current-row>
      <el-table-column label="项目" prop="repo" :width="columnWidth" align="center" />
      <el-table-column label="人员" prop="people" :width="columnWidth" align="center" />
      <el-table-column label="变更发生的PR" prop="prNumber" :width="columnWidth" align="center" />
      <el-table-column label="变更时间" prop="changeTime" :width="columnWidth" align="center" :formatter="formatDate" />
      <el-table-column label="变更权限" prop="permission" :width="columnWidth" align="center" />
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
export default {
  name: 'PermissionChange',
  data() {
    return {
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        project: '',
        scene: '',
        people: ''
      },
      tableData: [
        {
          repo: 'dubbo',
          people: 'dom',
          prNumber: 1,
          changeTime: '2021-10-12',
          permission: 'committer'
        }
      ],
      options: {
        roleList: ['committer', 'reviewer', 'maintainer']
      },
      columnWidth: 160,
      total: 100
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      // TODO 传递参数，调用后端接口查询数据
      this.$API.dataProcess.getPermissionChange(this.listQuery).then((res) => {
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
    }
  }
}
</script>

<style>
  .filter-container > *{
    margin-right: 10px;
  }
</style>
