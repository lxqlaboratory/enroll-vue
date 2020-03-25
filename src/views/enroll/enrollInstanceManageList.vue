<template>
  <div class="app-container">
    <div class="table-headline">
      <table class="headline">
        <tr><td>{{ instanceName }}</td></tr>
      </table>
      <el-table
        :data="itemList"
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
          label="需要人数"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.needCount }}
          </template>
        </el-table-column>
        <el-table-column
          label="已报名人数"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.enrollCount }}
          </template>
        </el-table-column>
        <el-table-column
          label="候选人数"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            {{ scope.row.candidateCount }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          color="black"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="entry(scope.row.itemId)">管理已报名</el-button>
            <el-button type="primary" size="mini" @click="entry2(scope.row.itemId)">管理候选</el-button>
          </template>
        </el-table-column>
      </el-table></div>
  </div>
</template>

<script>
import { getEnrollProjectInstanceAndItemList } from '@/api/enroll'
export default {
  name: 'EnrollInstanceManageList',
  data() {
    return {
      showyemian: false,
      showdetail: false,
      loginName: '',
      itemList: [],
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
      getEnrollProjectInstanceAndItemList({ 'session': document.cookie, 'instanceId': this.$route.query.instanceId }).then(res => {
        this.instanceName = res.data.instanceName
        this.itemList = res.data.itemList
      })
    },
    entry(itemId) {
      this.$router.push({ path: 'enrollInstanceMangePerson', query: { 'itemId': itemId, 'enrollMode': '1' }})
    },
    entry2(itemId) {
      this.$router.push({ path: 'enrollInstanceMangePerson', query: { 'itemId': itemId, 'enrollMode': '2' }})
    }
  }
}
</script>

<style scoped>

</style>
