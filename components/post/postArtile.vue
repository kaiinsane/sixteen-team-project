<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 08:17:34
 * @LastEditTime: 2019-09-14 16:02:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="info">
    <!-- 面包屑 -->
    <el-breadcrumb class="bread" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 文章内容 -->
    <h1 class="title">{{resList[0].title}}</h1>
    <div class="post_data">
      <span>攻略:{{resList[0].created_at }}</span>
      <span>阅读:{{resList[0].watch}}</span>
    </div>
    <div class="post_info" v-html="resList[0].content">{{resList[0].content}}</div>

    <!-- 分页 -->
    <!-- <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>-->
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      // 文章数据
      resList: [
        {
          title: "",
          created_at: "",
          watch: "",
          content: ""
        }
      ]
    };
  },
  watch: {
    $route() {
      this.$axios({
        url: "posts",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        this.resList = res.data.data;
        this.resList.forEach(e => {
          let time = moment(e.created_at).format("YYYY-MM-DD HH:mm:ss");
          e.created_at = time;
        });
      });
    }
  },
  mounted() {
    this.$axios({
      url: "posts",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      this.resList = res.data.data;
      this.resList.forEach(e => {
        let time = moment(e.created_at).format("YYYY-MM-DD HH:mm:ss");
        e.created_at = time;
      });
    });
  }
};
</script>

<style scoped lang="less">
.info {
  width: 700px;
  .bread {
    margin: 20px 0;
  }
  .title {
    padding-bottom: 20px;
    border-bottom: 1px solid #dddddd;
  }
  .post_info {
    margin: 20px 0;
    /deep/ img {
      margin: 10px 0;
      width: auto;
      max-width: 100%;
    }
  }
  .post_data {
    margin-top: 20px;
    text-align: right;
    span {
      margin: 0 10px;
    }
  }
}
</style>