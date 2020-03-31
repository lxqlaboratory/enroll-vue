<template>
  <div class="app-container">
    <div class="table-headline">
      <table class="headline">
        <tr><td>报名历史</td></tr>
      </table>
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
          {{ scope.row.itemName }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click="entry(scope.row.itemPersonId)" size="mini" >查看历史</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
  import { getApplyedEnrollInstanceItemList } from '@/api/enroll'
  export default {
    name: 'enrollApplyHistoryQuery',
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
        getApplyedEnrollInstanceItemList({ 'session': document.cookie }).then(res => {
          this.ProjectInstanceList = res.data

        })
      },
      entry(itemPersonId){
        this.$router.push({ path: 'enrollApplyHistorDetai', query: { itemPersonId }})
      }

    }
  }
</script>

<style scoped>

</style>
