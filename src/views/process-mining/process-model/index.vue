<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.sceneList" multiple placeholder="请选择场景" class="filter-item">
        <el-option label="fork_merge" value="fork_merge" />
        <el-option label="fork_close" value="fork_close" />
        <el-option label="unfork_merge" value="unfork_merge" />
        <el-option label="unfork_close" value="unfork_close" />
      </el-select>
      <el-select v-model="listQuery.display" placeholder="呈现形式" class="filter-item">
        <el-option label="PetriNet" value="PetriNet" />
        <el-option label="HeuristicsNet" value="HeuristicsNet" />
        <el-option label="BPMN" value="BPMN" />
      </el-select>
      <el-button type="primary" class="filter-item" @click="getProcessModel">确 定</el-button>
    </div>

    <el-row>
      <el-col v-for="(model, index) in modelData" :key="index" :span="11" :offset="index%2===0? 0: 1">
        <el-card style="margin-bottom: 10px;">
          <div slot="header" class="clearfix">
            <span>{{ model.scene }}</span>
          </div>
          <el-image :src="model.imgData" :preview-src-list="[model.imgData]" class="image" fit="contain" style="height: 200px" />
          <div style="padding: 14px;">
            <!-- <span>logCase:{{model.logCase}}</span><br/> -->
            <!-- <span>algorithm:{{model.algorithm}}</span><br/> -->
            <!-- <span>param:{{model.param}}</span><br/> -->
            <span>average Trace Fitness: {{ model.averageTraceFitness.toFixed(2) }}</span><br>
            <span>percentage Of Fitting Traces: {{ model.percentageOfFittingTraces.toFixed(2) }}%</span><br>
            <span>precision: {{ model.precision.toFixed(2) }}</span><br>
            <span>generalization: {{ model.generalization.toFixed(2) }}</span><br>
            <span>simplicity: {{ model.simplicity.toFixed(2) }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ProcessModel',
  data() {
    return {
      listQuery: {
        sceneList: [],
        display: ''
      },
      modelData: []
    }
  },
  methods: {
    getProcessModel() {
      // TODO 后期考虑一次性查询出所有呈现形式，当仅切换呈现形式时，不用再次查询
      const param = {
        'sceneList': this.listQuery.sceneList.join(','),
        'display': this.listQuery.display
      }
      this.$API.processMining.getModel(param).then((res) => {
        if (res.data == null) {
          this.$message.error(res.message)
        } else {
          this.modelData = res.data
        }
      }).catch((err) => {
        this.$message.error(err)
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
