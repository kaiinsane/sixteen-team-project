<template>
  <div class="all-item">
    <div class="item">
      <item :data="data.parent" v-if="data.parent"/>
      <el-row type="flex" justify="space-between" class="com-row" v-show="data.level !== level">
        <el-col :span="23" class="com-info">
          <span style="color:#666;">{{data.account.nickname}}</span>
          <span style="color:#999;">{{data.updated_at | timeFormat}}</span>
        </el-col>
        <el-col :span="1" style="text-align:right;">{{data.level}}</el-col>
      </el-row>
      <el-row type="flex" v-show="data.level !== level">
        <el-col :span="24" class="com-content">{{data.content}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "item",
  props: {
    data: {
      type: Object,
      default: {}
    },
    level: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  filters: {
    timeFormat(time) {
      return moment(time).format("YYYY-MM-DD hh:mm");
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  padding: 5px 10px 0;
  background: #f9f9f9;
  border: 1px solid #eee;
  height: auto;
}
.com-item {
  font-size: 12px;
  .com-info {
    margin-bottom: 10px;
  }
  .com-content {
    font-size: 16px;
    height: 42px;
  }
}
</style>