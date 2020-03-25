<template>
  <div class="app-container" v-if="showyemian">
    <div class="tishi"> 请完善个人信息</div>
  </div>
  <div class="app-container" v-else>
    <el-table
      :data="ProjectInstanceList"
      border
      style="width: 100%;"
      size="mini"
      :header-cell-style="{background:'#eef1f6',color:'#606266',fontSize: '14px'}"
    >
      <el-table-column
        label="序号"
        fixed="left"
        width="70"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
        label="报名项"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.instanceName }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click="entry(scope.row.instanceId)" size="mini" >进入报名</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getEnrollProjectInstanceList } from '@/api/enroll'
export default {
  name: 'enrollInstanceApply',
  data() {
    return {
        showyemian: false,
        showdetail: false,
        loginName: '',
        list: [],
        instanceId: '',
        instanceName: '',
        retType: '',
        ProjectInstanceList: []
      }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getEnrollProjectInstanceList({ 'session': document.cookie }).then(res => {
        if(res.re === -1){
           this.showyemian = true
        }else {
          this.ProjectInstanceList = res.data.projectList
          this.retType = res.data.retType
        }

      })
    },
    entry(instanceId){
      this.$router.push({ path: 'enrollInstanceBaoming', query: { instanceId }})
    }

  }
}
</script>

<style scoped>
  .tishi{
    text-align: center;
    font-weight: bold;
    font-size: 30px;


  }
</style>
