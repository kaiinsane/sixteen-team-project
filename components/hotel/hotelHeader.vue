<template>
  <div class="container">
    <!-- 面包屑导航 -->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 查看价格条件查询 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-autocomplete
            class="inline-input"
            v-model="city"
            :fetch-suggestions="querySearch"
            placeholder="目的地"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-purple">
          <el-date-picker
            v-model="stayDate"
            type="daterange"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
            :picker-options="pickerOptions1"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-autocomplete
            class="inline-input"
            v-model="numbers"
            :fetch-suggestions="querySearch2"
            placeholder="人数未定"
            suffix-icon="el-icon-search"
            @select="handleSelect2"
          ></el-autocomplete>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button type="primary">查看价格</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "", // 所选城市
      stayDate: "", // 住宿时间
      numbers:'', // 住店人数
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000;
        }
      } // 可选日期列表
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      console.log(item);
    },
    querySearch2(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect2(item) {
      console.log(item);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-breadcrumb {
  padding: 20px 0;
  font-size: 14px;
  line-height: 1;
}
</style>