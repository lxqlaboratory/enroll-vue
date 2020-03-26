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
        label="报名编号"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.instanceNum }}
        </template>
      </el-table-column>
      <el-table-column
        label="报名名称"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.instanceName }}
        </template>
      </el-table-column>
      <el-table-column
        label="年份"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.year }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row.instanceId)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deletepro(scope.row.instanceId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="konghang">

    </div>
    <div align="center">
      <el-button type="primary" @click="submit" >添加</el-button>
    </div>
  </div>
</template>

<script>
  import { getEnrollProjectInstanceListOfProject } from '@/api/enroll'
  import { deleteEnrollProjectInstance } from '@/api/enroll'
  export default {
    name: 'enrollConfigAddMany',
    data() {
      return {
        showyemian: false,
        showdetail: false,
        projectId: '',
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
        getEnrollProjectInstanceListOfProject({ 'session': document.cookie ,'projectId': this.$route.query.projectId }).then(res => {
          this.ProjectInstanceList = res.data
        }).catch(err => {

        })
      },
      edit(instanceId) {
        this.$router.push({ path: 'enrollConfigManyDetail', query: { 'instanceId': instanceId, 'projectId': this.$route.query.projectId }})
      },
      submit(){
        this.$router.push({ path: 'enrollConfigTwoAdd', query: { 'projectId': this.$route.query.projectId}} )
      },
      deletepro(instanceId) {
        this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEnrollProjectInstance({ 'session': document.cookie, 'instanceId': instanceId }).then(res => {
            if (res.re === 1) {
              this.$message({
                message: '删除',
                type: 'sucess'
              })
              this.fetchData()
            } else if(res.data === '存在申请人，不能删除'){
              this.$message({
                message: '存在申请人，不能删除',
                type: 'warning'
              })
              this.fetchData()
            }else if(res.data === '存在限制申请人，不能删除'){
              this.$message({
                message: '存在限制申请人，不能删除',
                type: 'warning'
              })
              this.fetchData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }

    }
  }
</script>

<style scoped>

</style>
