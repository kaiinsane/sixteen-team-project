<template>
  <div class="container">
    <div v-for="(item,index) in commentsList" :key="index" class="com-item">
      <el-row type="flex" justify="space-between" class="com-row">
        <el-col :span="23" class="com-info">
          <img :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt />
          <span style="color:#666;">{{item.account.nickname}}</span>
          <span style="color:#999;">{{item.updated_at | timeFormat}}</span>
        </el-col>
        <el-col :span="1" style="text-align:right;">{{item.level}}</el-col>
      </el-row>
      <!-- <el-row type="flex">
        <el-col :span="24" class="com-content">
          
        </el-col>
      </el-row>-->
      <div class="item">
        <Item :data="item" :level="item.level" v-if="item.level > 1" />
      </div>
      <el-row type="flex">
        <el-col :span="24" class="com-content">{{item.content}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Item from "@/components/post/item";
export default {
  data() {
    return {
      commentsList: [],
      // level: [[], []]
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/comments",
      params: {
        post: 4,
        _start: 0,
        _limit: 2
      }
    }).then(res => {
      this.commentsList = res.data.data;
      // let obj = {};
      // for (let i = 0; i < res.data.data.length; i++) {
      //   if (res.data.data[i].parent) {
      //     console.log(111);
      //     this.level[i] = this.getAllParent(res.data.data[i]);
      //   }
      // }
      // console.log(this.level);
    });
  },
  methods: {
    getAllParent(data) {
      let arr = [];
      let obj = {};
      if (data.parent) {
        if (obj) {
          obj.parent = arr;
        }
        console.log(222);
        obj.account = data.parent.account;
        arr.push(obj);
      }
      return arr;
    }
  },
  filters: {
    timeFormat(time) {
      return moment(time).format("YYYY-MM-DD hh:mm");
    }
  },
  components: {
    Item
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  border: 1px solid #eee;
  .com-item {
    padding: 20px 20px 5px 20px;
    font-size: 12px;
    &:first-child {
      border-bottom: 1px dashed #ddd;
    }
    .com-info {
      margin-bottom: 10px;
    }
    .item {
      padding-left: 30px;
    }
    .com-content {
      margin-top: 10px;
      padding-left: 30px;
      font-size: 16px;
      height: 42px;
    }
  }
  /deep/ img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
</style>