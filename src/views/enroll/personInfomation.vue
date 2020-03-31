<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">个人基本信息</td>
      </tr>
      <tr>
        <td colspan="1" width="200">工号或学号</td>
        <td colspan="1">{{ form.perNum }}</td>
      </tr>
      <tr>
        <td colspan="1">姓名</td>
        <td colspan="1">{{ form.perName }}</td>
      </tr>
      <tr>
        <td colspan="1">单位</td>
        <td colspan="1">
          {{ form.collegeName }}
        </td>
      </tr>
      <tr>
        <td colspan="1">人员类型</td>
        <td colspan="1">
          <el-select v-model="form.secondPerType" placeholder="请选择人员类型" style="width: 100%">
            <el-option
              v-for="item in secondPerTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>

      <tr>
        <td colspan="1">手机号</td>
        <td colspan="1">
          <el-input v-model="form.mobilePhone" placeholder="请输入手机号" />
        </td>
      </tr>
      <tr>
        <td colspan="1">开户银行</td>
        <td colspan="1">
          <el-input v-model="form.bankName" placeholder="请输入开户银行" />
        </td>
      </tr>
      <tr>
        <td colspan="1">银行卡号</td>
        <td colspan="1">
          <el-input v-model="form.bankNo" placeholder="请输入银行账号" />
        </td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" :disabled="isDisable" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { personBaseInfoMaintainInit } from '@/api/enroll'
import { personBaseInfoMaintain } from '@/api/enroll'
export default {
  name: 'PersonInfomation',
  data() {
    return {
      form: {
        secondPerType: '',
        personId: null,
        perNum: '',
        perName: '',
        collegeName: '',
        mobilePhone: '',
        bankNo: '',
        bankName: ''
      },
      secondPerTypeList: [],
      isDisable: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {

    fetchData() {
      personBaseInfoMaintainInit({ 'session': document.cookie, 'personId': this.$route.query.personId }).then(res => {
        console.log(res.data)
        this.form = res.data
        this.secondPerTypeList = res.data.secondPerTypeList
      })
    },
    submit() {
      this.isDisable = true
      if (this.mobilePhone === '' || this.mobilePhone === undefined || this.mobilePhone === 0 || this.mobilePhone === '0') {
        this.$message({
          message: '手机号不能为空',
          type: 'success',
          offset: '10'
        })
        setTimeout(() => {
          this.isDisable = false
        }, 1000)
      }else if(this.secondPerType === '12' ||this.secondPerType === undefined || this.secondPerType === '13'||this.secondPerType === '14'||this.secondPerType === '21'||this.secondPerType === '31'){
        if(this.bankNo === ''|| this.bankNo ===undefined){
          this.$message({
            message: '银行卡号不能为空',
            type: 'success',
            offset: '10'
          })
          setTimeout(() => {
            this.isDisable = false
          }, 1000)
        }
        if(this.bankName === ''|| this.bankName === undefined){
          this.$message({
            message: '银行名称不能为空',
            type: 'success',
            offset: '10'
          })
          setTimeout(() => {
            this.isDisable = false
          }, 1000)
        }
      }
      else {
        personBaseInfoMaintain({ 'session': document.cookie, 'form': this.form
        }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '提交成功',
              type: 'success',
              offset: '10'
            })
          }
          setTimeout(() => {
            this.isDisable = false
          }, 1000)
        })
      }
    }
  }
}
</script>
