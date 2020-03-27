<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">{{instanceName}}</td>
      </tr>
      <tr v-for="item in resultList">
        <td>
          {{item}}
        </td>
      </tr>
    </table>
    <div align="center">
      <el-button class="button1">
        <a :href="serverAddres+'/func/enroll/downloadEnrollAppointment?itemPersonId='+itemPersonId" download="报名.pdf">下载pdf</a>
      </el-button>
    </div>
  </div>
</template>
<script>
  import { getApplyedEnrollInstanceItem } from '@/api/enroll'
  export default {
    name: 'enrollApplyHistorDetai',
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
        getApplyedEnrollInstanceItem({ 'session': document.cookie,'itemPersonId': this.$route.query.itemPersonId }).then(res => {
          this.instanceDes = res.data.instanceDes
          this.instanceName = res.data.instanceName
          this.resultList =  res.data.resultList
          this.retType = res.data.retType
          this.isExportPdf = res.data.isExportPdf

        })
      }

    }
  }

</script>

<style scoped>
  .button1{
    background-color: rgb(64,158,255);
    color: white;
  }
</style>
