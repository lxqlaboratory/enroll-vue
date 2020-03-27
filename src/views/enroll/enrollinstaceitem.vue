<template>
<div class="app-container">
  <div class="table-headline">
    <table class="headline">
      <tr><td  >报名列表</td></tr>
    </table>
  <el-table
    :data="applyList"
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
      label="报名地点"
      align="center"
      color="black"
    >
      <template slot-scope="scope">
        {{ scope.row.itemName }}
      </template>
    </el-table-column>
    <el-table-column
      label="详细"
      align="center"
      color="black"
      v-if="isAuxiliary"
    >
      <template slot-scope="scope">
        {{ scope.row.auxiliaryStr }}
      </template>
    </el-table-column>
    <el-table-column
      label="需要人数"
      align="center"
      color="black"
    >
      <template slot-scope="scope">
        {{ scope.row.needCount }}
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      color="black"
    >
      <template slot-scope="scope">
        <el-button type="primary" @click="entryApply(scope.row.itemId,scope.row.enrollMode,scope.row.itemName)" size="mini" >报名</el-button>
      </template>
    </el-table-column>
  </el-table></div>




 <div class="konghang">

 </div>

  <div class="table-headline">
    <table class="headline">
      <tr><td  >候选列表</td></tr>
    </table>
    <el-table
      :data="candidateList"
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
        label="报名地点"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.itemName }}
        </template>
      </el-table-column>
      <el-table-column
        label="详细"
        align="center"
        color="black"
        v-if="isAuxiliary"
      >
        <template slot-scope="scope">
          {{ scope.row.auxiliaryStr }}
        </template>
      </el-table-column>
      <el-table-column
        label="需要人数"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          {{ scope.row.needCount }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click="entryCandida(scope.row.itemId,scope.row.enrollMode,scope.row.itemName)" size="mini" >报名</el-button>
        </template>
      </el-table-column>
    </el-table></div>
</div>
</template>

<script>
  import { enrollProjectInstanceApply } from '@/api/enroll'
  import { enrollProjectInstanceItemSubmit } from '@/api/enroll'
  export default {
    name: 'enrollinstaceitem',
    data() {
      return {
        instanceId: '',
        retType: '',
        isAuxiliary:false,
        candidateList: [],
        applyList: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {

      fetchData() {
        this.instanceId = this.$route.query.instanceId
        enrollProjectInstanceApply({ 'session': document.cookie ,'instanceId': this.$route.query.instanceId }).then(res => {
          this.candidateList = res.data.candidateList
          this.applyList = res.data.applyList
          this.isAuxiliary = res.data.isAuxiliary
        })
      },
      entryApply(itemId,enrollMode,itemName){
        this.$confirm('确认报名'+itemName+'吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          enrollProjectInstanceItemSubmit({ 'session': document.cookie, 'itemId': itemId,'enrollMode': enrollMode}).then(res => {
            if(res.re===1)
            {
              this.$message({
                message: "报名成功",
                type: 'sucess'
              });
              this.$router.push({ path: 'enrollInstanceSuc',query: { 'instanceId':this.instanceId}})
            }else {
              this.$message({
                message: "报名已满",
                type: 'warning'
              });
              this.fetchData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      entryCandida(itemId,enrollMode,itemName){
        this.$confirm('确认报名'+itemName+'吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          enrollProjectInstanceItemSubmit({ 'session': document.cookie, 'itemId': itemId,'enrollMode': enrollMode}).then(res => {
            if(res.re===1)
            {
              this.$message({
                message: "报名成功",
                type: 'sucess'
              });
              this.$router.push({ path: 'enrollInstanceSuc'})
            }else {
              this.$message({
                message: "报名已满",
                type: 'warning'
              });
              this.fetchData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    }
  }

</script>

<style scoped>

</style>
