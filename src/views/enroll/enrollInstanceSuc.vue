<template>
<div class="app-container">
   <div class="tishi"> 您已经成功报名！！！</div>
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
  import { enrollProjectInstanceApply } from '@/api/enroll'
  export default {
    name: 'enrollInstanceSuc',
    data() {
      return {
        resultList: [],
        serverAddres: '',
        itemPersonId: '',
        instanceId: '',
        retType: '',
        instanceName: '',
        candidateList: [],
        applyList: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {

      fetchData() {
        this.serverAddres = this.GLOBAL.servicePort
        this.instanceId = this.$route.query.instanceId
        enrollProjectInstanceApply({
          'session': document.cookie,
          'instanceId': this.$route.query.instanceId
        }).then(res => {
          this.itemPersonId = res.data.itemPersonId
          this.resultList = res.data.resultList
          this.instanceName = res.data.instanceName
        })
      }
    }
  }
</script>

<style scoped>
.tishi{
  text-align: center;
  font-weight: bold;
  font-size: 15px;
color: red;

}
  .button1{
    background-color: rgb(64,158,255);
    color: white;
  }
</style>
