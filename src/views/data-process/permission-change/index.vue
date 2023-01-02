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
      <el-button class="filter-item" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button class="filter-item" type="success" icon="el-icon-download">
        导出
      </el-button>
    </div>

    <el-table :data="tableData" border fit highlight-current-row>
      <el-table-column label="项目" prop="project" width="160px" align="center" />
      <el-table-column label="人员" prop="people" width="160px" align="center" />
      <el-table-column label="变更发生的PR" prop="change_pr_number" width="160px" align="center" />
      <el-table-column label="变更时间" prop="change_role_time" width="160px" align="center" />
      <el-table-column label="变更权限" prop="change_role" width="160px" align="center" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'PermissionChange',
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        project: '',
        scene: '',
        people: ''
      },
      tableData: [
        {
          project: 'dubbo',
          people: 'tom',
          change_pr_number: 12,
          change_role_time: '2022-12-31 10:12:22',
          change_role: 'reviewer'
        },
        {
          project: 'dubbo',
          people: 'jim',
          change_pr_number: 6,
          change_role_time: '2022-11-31 10:12:22',
          change_role: 'maintainer'
        }
      ],
      options: {
        roleList: ['committer', 'reviewer', 'maintainer']
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
