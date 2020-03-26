<template>
 <div class="app-container">
   <table class="content">
     <tr>
       <td colspan="1" style="font-size: 16px;font-weight: bold;color: #304156 ">{{instanceName}}</td>
   </tr>
     <tr>
       <td colspan="6" v-html="instanceDes">


       </td>
     </tr>
   </table>
   <div align="center">
     <el-button type="primary" @click="submit" >进入报名</el-button>
   </div>
</div>
</template>

<script>
  import { enrollProjectInstanceApply } from '@/api/enroll'
  import Tinymce from '@/components/Tinymce'
  export default {
    name: 'enrollInstanceBaoming',
    components: { Tinymce },
    data() {
      return {
        instanceId: '',
        retType: '',
        instanceName: '',
        instanceDes: '',

        itemList: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {

      fetchData() {
        this.instanceId = this.$route.query.instanceId
        enrollProjectInstanceApply({ 'session': document.cookie ,'instanceId': this.$route.query.instanceId }).then(res => {
          this.instanceDes = res.data.instanceDes
          this.instanceName = res.data.instanceName

          this.retType = res.data.retType
        })
      },
      submit(){
        if(this.retType === 4)
        {
          this.$router.push({ path: 'enrollInstanceSuc',query: { 'instanceId':this.instanceId}})
        }else if(this.retType === 3){
          this.$router.push({ path: 'enrollinstaceitem' ,query: { 'instanceId':this.instanceId}})
        }

      }
    }
  }
</script>

<style scoped>
</style>
