<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.scene" placeholder="请选择场景" class="filter-item">
        <el-option label="贡献者模式-PR被合入(fork_merge)" value="fork_merge" />
        <el-option label="贡献者模式-PR被关闭(fork_close)" value="fork_close" />
        <el-option label="协作者模式-PR被合入(unfork_merge)" value="unfork_merge" />
        <el-option label="协作者模式-PR被关闭(unfork_close)" value="unfork_close" />
      </el-select>
      <el-select v-model="listQuery.display" placeholder="呈现形式" class="filter-item">
        <el-option label="PetriNet" value="PetriNet" />
        <el-option label="HeuristicNet" value="HeuristicNet" />
        <el-option label="BPMN" value="BPMN" />
        <el-option label="ProcessTree" value="BPMN" />
      </el-select>
      <el-button type="primary" class="filter-item" @click="getProcessModel">确 定</el-button>
    </div>

    <el-image
      fit="fit"
      :src="url"
    />
  </div>
</template>

<script>
export default {
  name: 'ProcessModel',
  data() {
    return {
      listQuery: {
        scene: '',
        display: ''
      },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    getProcessModel() {
      console.log('getProcessModel')
    }
  }
}
</script>

<style>
  .filter-container > * {
    margin-right: 10px;
  }
</style>
