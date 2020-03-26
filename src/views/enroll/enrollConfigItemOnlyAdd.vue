<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">项目具体</td>
      </tr>
      <tr>
        <td colspan="1" >名称</td>
        <td colspan="2">
          <el-input v-model="item.itemName" placeholder="名称" ></el-input>
        </td>
        <td colspan="1" >需要人数</td>
        <td colspan="2">
          <el-input v-model.number="item.needCount" placeholder="需要人数" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >属性1</td>
        <td colspan="5">
          <el-input v-model="item.attribute1" placeholder="名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >属性2</td>
        <td colspan="5">
          <el-input v-model="item.attribute2" placeholder="名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >属性3</td>
        <td colspan="5">
          <el-input v-model="item.attribute3" placeholder="名称" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >属性4</td>
        <td colspan="5">
          <el-input v-model="item.attribute4" placeholder="名称" ></el-input>
        </td>
      </tr>
    </table>
    <div align="center">
      <el-button type="primary" @click="submit" >保存并提交</el-button>
    </div>
  </div>

</template>

<script>
  import { getEnrollInstanceItemDetail } from '@/api/enroll'
  import { saveOrUpdateEnrollInstanceItem } from '@/api/enroll'
  export default {
    name: 'enrollConfigItemOnlyAdd',
    data() {
      return {
        item: {
          itemId: '',
          itemName: '',
          needCount: '',
          attribute1: '',
          attribute2: '',
          attribute3: '',
          attribute4: ''
        },
        itemId: ''
      }
    },created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.instanceId = this.$route.query.instanceId
      },
      submit(){
        saveOrUpdateEnrollInstanceItem({'item':this.item,'instanceId':this.instanceId,'session': document.cookie}).then(res => {
          if (res.re === 1) {
            this.$message({
              message: '保存成功',
              type: 'sucess'
            })
            this.$router.push({ path: 'enrollInstanceConfig'})
          }

        }).catch(err => {

        })
      }
    }
  }
</script>

<style scoped>

</style>
