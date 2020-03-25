<template >
  <div class="app-container">
    <div class="query-container">

      请输入姓名或工号：
      <el-input v-model="perName" placeholder="请输入姓名或工号" style="width: 40%;"  />
      <el-button type="primary" @click="doQuery" >查询</el-button>
    </div>
    <div class="table-headline">
      <table class="headline">
        <tr><td  >人员列表</td></tr>
      </table>
      <el-table
        :data="personList"
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
          label="姓名"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perName }}
          </template>
        </el-table-column>
        <el-table-column
          label="工号"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.perNum }}
          </template>
        </el-table-column>
        <el-table-column
          label="学院"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.collegeName }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" @click="deletePerson(scope.row.itemPersonId)" size="mini" >删除</el-button>

          </template>
        </el-table-column>
      </el-table></div>
  </div>
</template>

<script>
import { getEnrollItemPersonList } from '@/api/enroll'
import { enrollItemPersonApplyCancel } from '@/api/enroll'
import { getSelectPersonList } from '@/api/enroll'
export default {
  name: 'EnrollInstanceMangePerson',
  data() {
    return {
      showShanchu: false,
      showdetail: false,
      addList: [],
      itemId: '',
      enrollMode: '',
      personList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.itemId = this.$route.query.itemId
      this.enrollMode = this.$route.query.enrollMode
      getEnrollItemPersonList({ 'session': document.cookie, 'itemId': this.itemId, 'enrollMode': this.enrollMode }).then(res => {
        this.personList = res.data
      })
    },
    entry(itemId) {
      this.$router.push({ path: 'enrollInstanceMangePerson', query: { 'itemId': itemId, 'enrollMode': 1 }})
    },
    deletePerson(itemPersonId){
      this.$confirm('是否删除'+itemPersonId+'?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        enrollItemPersonApplyCancel({ 'session': document.cookie, 'itemPersonId': itemPersonId}).then(res => {
          if(res.re===1)
          {
            this.$message({
              message: "删除成功",
              type: 'sucess'
            });
            this.fetchData()
          }else {
            this.$message({
              message: "删除失败",
              type: 'warning'
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    doQuery(){
      
    }
  }
}

</script>

<style scoped>

</style>
