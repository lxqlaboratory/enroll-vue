<template>
  <div class="app-container">
    <table class="content">
      <tr>
        <td colspan="6" style="font-size: 16px;font-weight: bold;color: #304156 ">项目信息编辑</td>
      </tr>
      <tr>
        <td colspan="1" >项目名称</td>
        <td colspan="1">
          <el-input v-model="instance.instanceName" placeholder="请输入项目名称" ></el-input>
        </td>
        <td colspan="1" >年份</td>
        <td colspan="1">
          <el-input v-model.number="instance.year" placeholder="请输入项目年份" ></el-input>
        </td>
        <td colspan="1" >是否可见</td>
        <td colspan="1">
          <el-input v-model.number="instance.isVisible" placeholder="请输入0或1" ></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1" >人员限制类型</td>
        <td colspan="1">
          <el-select v-model="instance.limitType" placeholder="请选择人员限制类型" style="width: 100%">
            <el-option
              v-for="item in limitTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td colspan="1" >报名开始时间</td>
        <td colspan="1">
          <el-time-picker
            arrow-control
            v-model="instance.enrollStartTime"
            value-format="HH-mm-ss"
            placeholder="报名开始时间">
          </el-time-picker>
        </td>
        <td colspan="1" >报名开始日期</td>
        <td colspan="1">
          <el-date-picker
            v-model="instance.enrollStartDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="报名开始日期">
          </el-date-picker>
        </td>

      </tr>
      <tr>
        <td colspan="1" >报名结束日期</td>
        <td colspan="1">
          <el-date-picker
            v-model="instance.enrollEndDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="报名结束日期">
          </el-date-picker>
        </td>
        <td colspan="1" >报名结束时间</td>
        <td colspan="1">
          <el-time-picker
            arrow-control
            v-model="instance.enrollEndTime"
            value-format="HH-mm-ss"
            placeholder="报名开始时间">
          </el-time-picker>
        </td>
        <td colspan="1" >结果发布开始日期</td>
        <td colspan="1">
          <el-date-picker
            v-model="instance.viewStartDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="结果发布开始日期">
          </el-date-picker>
        </td>
      </tr>
      <tr>
        <td colspan="1" >结果发布开始时间</td>
        <td colspan="1">
          <el-time-picker
            arrow-control
            v-model="instance.viewStartTime"
            value-format="HH-mm-ss"
            placeholder="结果发布开始时间">
          </el-time-picker>
        </td>
        <td colspan="1" >结果发布结束日期</td>
        <td colspan="1">
          <el-date-picker
            v-model="instance.viewEndDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="结果发布结束日期">
          </el-date-picker>
        </td>
        <td colspan="1" >结果发布结束时间</td>
        <td colspan="1">
          <el-time-picker
            arrow-control
            v-model="instance.viewEndTime"
            value-format="HH-mm-ss"
            placeholder="结果发布开始时间">
          </el-time-picker>
        </td>
      </tr>
      <tr>
        <td colspan="6" >报名公告</td>
      </tr>
      <tr>
        <td colspan="6">
          <tinymce v-model="instance.instanceDes" :height="300" />
        </td>
      </tr>
    </table>

    <div align="center">
      <el-button type="primary" @click="submit" >保存并提交</el-button>
    </div>
    <div class="konghang">

    </div>
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
        label="报名项"
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
        label="操作"
        align="center"
        color="black"
      >
        <template slot-scope="scope">
          <el-button type="primary" @click="entry(scope.row.instanceId)" size="mini" >编辑</el-button>
          <el-button type="danger" @click="entry(scope.row.instanceId)" size="mini" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  import Tinymce from '@/components/Tinymce'
  import { getEnrollProjectInstanceDetail } from '@/api/enroll'
  import { saveOrUpdateEnrollProjectInstance } from '@/api/enroll'
  import { deleteEnrollInstanceItem } from '@/api/enroll'
  export default {
    name: 'enrollConfigManyDetail',
    components: { Tinymce},
    data() {
      return {
        instance:{
          enrollEndDate:'',
          enrollEndTime:'',
          enrollStartDate: '',
          enrollStartTime: '',
          instanceDes:'',
          instanceId:'',
          instanceName:'',
          instanceNum: '',
          isVisible: '',
          limitType: '',
          viewEndDate: '',
          viewEndTime: '',
          viewStartDate: '',
          viewStartTime: ''
        },
        projectId: '',
        date: '',
        showyemian: false,
        showdetail: false,
        index: 0,
        limitTypeList: [],
        instanceId: '',
        instanceName: '',
        retType: '',
        itemList: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.projectId = this.$route.query.projectId
        this.instanceId = this.$route.query.instanceId
        getEnrollProjectInstanceDetail({'session': document.cookie ,'instanceId': this.instanceId}).then(res => {
          this.instance = res.data.instance
          this.itemList = res.data.itemList
          this.index = res.data.instance.limitTypeIndex
          this.limitTypeList = res.data.instance.limitTypeList
        }).catch(err => {

        })
      },
      submit(){
        var projectIds = this.projectId+''
        saveOrUpdateEnrollProjectInstance({'session': document.cookie,'instance': this.instance,'projectId': projectIds}).then(res => {
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
