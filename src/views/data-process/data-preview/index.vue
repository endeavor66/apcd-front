<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.project"
        clearable
        placeholder="项目名"
        style="width: 150px"
        class="filter-item"
      />
      <el-select v-model="listQuery.scene" placeholder="请选择场景" class="filter-item">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
      <el-input
        v-model="listQuery.pr_number"
        clearable
        placeholder="PR Number"
        style="width: 150px"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">
        搜索
      </el-button>
      <el-button class="filter-item" type="success" icon="el-icon-download">
        导出
      </el-button>

    </div>

    <el-table :data="tableData" border fit highlight-current-row>
      <el-table-column label="pr_number" prop="pr_number" width="200px" align="center" />

      <el-table-column label="activity" prop="activity" width="200px" align="center" />

      <el-table-column label="created_at" prop="created_at" width="200px" align="center" />

      <el-table-column label="people" prop="people" width="200px" align="center" />
    </el-table>

    <el-pagination
      :current-page="listQuery.curPage"
      :page-sizes="[20, 50, 100]"
      :page-size="listQuery.pageSize"
      :total="tableData.length"
      background
      layout="prev, pager, next, jumper, sizes, total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/event-log'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// arr to obj, such as { CN : "China", US : "USA" }

export default {
  name: 'DataPreview',
  // components: { Pagination },
  data() {
    return {
      listQuery: {
        curPage: 1,
        pageSize: 20,
        project: '',
        scene: '',
        pr_number: ''
      },
      tableData: [
        {
          pr_number: 7072,
          created_at: '2021-01-02 10:00:01',
          activity: 'CreateBranch',
          people: 'tom'
        },
        {
          pr_number: 7072,
          created_at: '2021-01-02 10:00:01',
          activity: 'OpenPR',
          people: 'tom'
        },
        {
          pr_number: 7072,
          created_at: '2021-01-02 10:00:01',
          activity: 'ClosePR',
          people: 'tom'
        }
      ],
      options: [
        {
          value: '1',
          label: 'fork_merge'
        },
        {
          value: '2',
          label: 'fork_close'
        },
        {
          value: '3',
          label: 'unfork_merge'
        },
        {
          value: '4',
          label: 'unfork_close'
        }
      ]
    }
  },
  methods: {
    getList() {
      console.log('获取列表数据')
      // TODO 传递参数，调用后端接口查询数据
      fetchList(this.listQuery).then(res => {
        console.log(res)
        const tableData = []
        if (res.code == 200) {
          res.data.forEach(row => {
            const row_dic = {
              'pr_number': row[0],
              'created_at': row[1],
              'activity': row[2],
              'people': row[3]
            }
            tableData.push(row_dic)
          })
          this.tableData = tableData
          this.total = tableData.length
        } else {
          this.$message.error(res.message)
        }
        // this.tableData = response.data.items
        // this.total = response.data.total
      })
      return this.tableData
    },
    handleSizeChange() {
      console.log('size change')
    },
    handleCurrentChange() {
      console.log('current change')
    }
  }
}
</script>

<style>
  .filter-container > * {
    margin-right: 10px;
  }
</style>
