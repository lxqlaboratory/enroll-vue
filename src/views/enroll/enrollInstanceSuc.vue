<template>
<div class="app-container">
   <div class="tishi"> 您已经成功报名！！！</div>
  <el-button >
    <a :href="serverAddres+'/func/enroll/downloadEnrollAppointment?itemPersonId='+itemPersonId" download="报名.pdf">下载pdf</a>
  </el-button>
</div>
</template>

<script>
  import { enrollProjectInstanceApply } from '@/api/enroll'
  export default {
    name: 'enrollInstanceSuc',
    data() {
      return {
        serverAddres: '',
        itemPersonId: '',
        instanceId: '',
        retType: '',
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
        })
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
