<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">个人基本信息</td>
      </tr>
      <tr>
        <td colspan="1" width = "200" >工号或学号</td>
        <td colspan="1">{{form.perNum}}</td>
      </tr>
      <tr>
        <td colspan="1" >姓名</td>
        <td colspan="1">{{form.perName}}</td>
      </tr>
      <tr>
        <td colspan="1" >单位</td>
        <td colspan="1">
          {{form.collegeName}}
        </td>
      </tr>
      <tr>
        <td colspan="1" >手机号</td>
        <td colspan="1">
          <el-input v-model="form.mobilePhone" placeholder="请输入手机号" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >开户银行</td>
        <td colspan="1">
          <el-input v-model="form.bankName" placeholder="请输入开户银行，可以为空" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >银行卡号</td>
        <td colspan="1">
          <el-input v-model="form.bankNo" placeholder="请输入银行账号，可以为空" ></el-input>
        </td>
      </tr>
    </table>
    <div align="center">
    <el-button type="primary" @click="submit" :disabled="isDisable">提交</el-button>
    </div>
  </div>
</template>

<script>
import { personBaseInfoMaintainInit } from '@/api/enroll'
import { personBaseInfoMaintain } from '@/api/enroll'
export default {
  name: 'personInfomation',
  data() {
    return {
      form: {
        personId:null,
        perNum: '',
        perName: '',
        collegeName:'',
        mobilePhone:'',
        bankNo:'',
        bankName:'',
      },
      isDisable: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {

    
    fetchData() {
      personBaseInfoMaintainInit({ 'session': document.cookie ,'personId': this.$route.query.personId }).then(res => {
        console.log(res.data);
        this.form = res.data
      })
    },
    submit(){
        this.isDisable = true
     personBaseInfoMaintain({'session': document.cookie , 'form': this.form
      }).then(res => {
       if(res.code === '0'){
         this.$message({
           message: '提交成功',
           type: 'success',
           offset: '10'
         });
       }
       setTimeout(() =>{
         this.isDisable = false
       },1000);
      })
    }
  }
}
</script>
