<template>
  <div class="app-container">
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
          <el-button type="primary" @click="entry(scope.row.instanceId)" size="mini" >管理报名</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getEnrollProjectInstanceListOfManage } from '@/api/enroll'
  export default {
    name: 'enrollInstanceManage',
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
        getEnrollProjectInstanceListOfManage({ 'session': document.cookie }).then(res => {
          this.ProjectInstanceList = res.data

        })
      },
      entry(instanceId){
        this.$router.push({ path: 'enrollInstanceManageList', query: { instanceId }})
      }

    }
  }
</script>

<style scoped>

</style>
