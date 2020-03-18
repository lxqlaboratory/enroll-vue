<template>
  <div class="dashboard-container">
    <div class="portlet-title">
      <div class="caption font-darkblue bold" style=" text-align: center;">
        <span>系统通知</span>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      noticeList: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {

    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
