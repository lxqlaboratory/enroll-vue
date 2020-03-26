<template>
  <div class="app-container" >
    <el-table
      :data="projectList"
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
        label="项目名称"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.projectName }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click="entry(scope.row.projectId,scope.row.projectType)" size="mini" >项目统计</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getEnrollProjectInfoListOfManage } from '@/api/enroll'
  export default {
    name: 'enrollInstanceConfig',
    data() {
      return {
        showyemian: false,
        showdetail: false,
        loginName: '',
        list: [],
        instanceId: '',
        instanceName: '',
        retType: '',
        projectList: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getEnrollProjectInfoListOfManage({'session': document.cookie }).then(res => {
          this.projectList = res.data


        }).catch(err => {

        })
      },
      entry(projectId,projectType){
        if(projectType==='01'){
          this.$router.push({ path: 'enrollConfigTwo', query: { 'projectId': projectId }})
        }

      }

    }
  }

</script>

<style scoped>

</style>
