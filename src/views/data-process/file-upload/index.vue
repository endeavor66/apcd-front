<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="文件上传" name="first">
        <el-form>
          <el-form-item label="项目名" :label-width="formLabelWidth">
            <el-input v-model="project" class="projectInput" clearable />
          </el-form-item>
          <el-form-item label="日志文件" :label-width="formLabelWidth">
            <el-upload
              ref="upload"
              drag
              action
              multiple
              :on-success="handleSuccess"
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

  </div>
</template>

<script>
import { upload, getUploadRecord } from '@/api/event-log'
export default {
  name: 'DataUpload',
  data() {
    return {
      project: '',
      isUploadFlag: false,
      fileList: [],
      settingVisible: false,
      formLabelWidth: '80px',
      tableData: [],
      activeName: 'first'
    }
  },
  mounted() {
    this.getHistoryUploadRecord()
  },
  methods: {
    submitUpload() {
      this.isUploadFlag = true
      // 构造传输数据
      const formData = new FormData()
      this.fileList.forEach((file) => {
        formData.append('fileList', file.raw)
      })
      formData.append('project', this.project)
      // 开始传输
      upload(formData).then((res) => {
        this.isUploadFlag = false
        this.$refs.upload.clearFiles()
        this.$message.success('上传成功,' + res.message)
      })
        .catch((err) => {
          this.isUploadFlag = false
          this.$message.error(err)
        })
      // 重新获取上传记录
      this.getHistoryUploadRecord()
    },
    handleSuccess(response, file, fileList) {
      console.log('文件上传成功后的钩子')
    },
    handleChange(file, fileList) {
      console.log('文件状态改变时的钩子')
      console.log(file, fileList)
      this.fileList = fileList
    },
    getHistoryUploadRecord() {
      // TODO 发送请求获取数据
      getUploadRecord().then((res) => {
        console.log(res)
        const datas = res.data
        this.tableData = datas
      })
        .catch((err) => {
          console.log(err)
        })

      // 示例数据
      // this.tableData = [
      //   {
      //     'success_file_number': 2,
      //     'success_file_name': 'a.csv,b.csv',
      //     'error_file_number': 1,
      //     'error_file_name': 'c.csv',
      //     'operate_time': '2022-01-03 11:10:12',
      //     'operator': 'admin'
      //   }
      // ]
    },
    formatDate(row, column) {
      // 获取单元格数据
      const data = row[column.property]
      if (data == null) {
        return null
      }
      const dt = new Date(data)
      return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
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
