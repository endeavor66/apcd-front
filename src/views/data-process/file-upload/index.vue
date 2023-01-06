<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="文件上传" name="first">
        <el-form>
          <el-form-item label="日志文件" :label-width="formLabelWidth">
            <el-upload
              ref="upload"
              drag
              action
              multiple
              :on-change="handleChange"
              :file-list="fileList"
              :auto-upload="false"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div slot="tip" class="el-upload__tip">
                只能上传csv文件, 点击<strong><a
                  class="download"
                  href="./excelTemplate.xlsx"
                >下载模板</a></strong>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth">
            <el-button type="primary" class="filter-item" @click="submitUpload">
              <span v-show="!isUploadFlag">上传到服务器</span>
              <span v-show="isUploadFlag">
                正在上传中
                <i class="el-icon-loading" />
              </span>
            </el-button>
            <el-button type="primary" @click="dialogFormVisible=true">数据预处理</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="上传记录" name="second">
        <el-table :data="tableData">
          <el-table-column prop="successFileNumber" label="上传成功文件数" />
          <el-table-column prop="successFileName" label="上传成功文件名" />
          <el-table-column prop="errorFileNumber" label="上传失败文件数" />
          <el-table-column prop="errorFileNumber" label="上传失败文件名" />
          <el-table-column prop="operateTime" label="操作时间" :formatter="formatDate" />
          <el-table-column prop="operator" label="操作人" />
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="参数配置" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="项目名" :label-width="formLabelWidth">
          <el-input v-model="projects" class="projectInput" placeholder="项目之间用逗号分隔" clearable />
        </el-form-item>
        <el-form-item label="时间范围" :label-width="formLabelWidth">
          <el-date-picker
            v-model="daterange"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dataPreprocess">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DataUpload',
  data() {
    return {
      projects: '',
      isUploadFlag: false,
      fileList: [],
      settingVisible: false,
      formLabelWidth: '80px',
      tableData: [],
      activeName: 'first',
      daterange: [],
      dialogFormVisible: false
    }
  },
  computed: {
    ...mapState('project', ['projectList'])
  },
  mounted() {
    // 获取所有历史上传记录
    this.getHistoryUploadRecord()
    // 获取已经处理过的project
    this.$API.project.getProjectList().then((res) => {
      this.$store.dispatch('project/init', res.data)
    }).catch((err) => {
      this.$message.error(err)
    })
  },
  methods: {
    submitUpload() {
      this.isUploadFlag = true
      // 构造传输数据
      const formData = new FormData()
      this.fileList.forEach((file) => {
        formData.append('fileList', file.raw)
      })
      // 开始传输
      this.$API.dataProcess.upload(formData).then((res) => {
        this.isUploadFlag = false
        this.$refs.upload.clearFiles()
        this.$message.success('上传成功,' + res.message)
        // 重新获取上传记录
        this.getHistoryUploadRecord()
      }).catch((err) => {
        this.isUploadFlag = false
        this.$message.error(err)
      })
    },
    // 文件状态改变时的钩子
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    // 数据预处理
    dataPreprocess() {
      const param = {
        'projectList': this.projects,
        'start': this.daterange[0],
        'end': this.daterange[1]
      }
      this.$API.dataProcess.processData(param).then((res) => {
        this.$message.success(res.message)
        // 更新store中的projectList
        const projectArr = this.projects.split(',')
        projectArr.forEach(e => {
          this.$store.dispatch('project/addProject', e)
        })
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 获取历史上传记录
    getHistoryUploadRecord() {
      // TODO 发送请求获取数据
      this.$API.dataProcess.getUploadRecord().then((res) => {
        const datas = res.data
        this.tableData = datas
      }).catch((err) => {
        this.$message.error(err)
      })
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
.projectInput {
  margin-bottom: 20px;
  width: 260px;
}
.uploadBtn {
  margin-left: 10px;
}
</style>
