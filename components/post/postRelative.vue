<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 15:21:27
 * @LastEditTime: 2019-09-14 16:04:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="aside">
    <!-- 相关攻略 -->
    <h4>相关攻略</h4>
    <div class="box" v-for="(item,index) in relatList" :key="index">
      <nuxt-link :to="`/post/detail?id=${item.id}`">
        <el-row class="sl" type="flex" justify="space-between">
          <div class="pic">
            <img :src="item.images[0]" alt />
          </div>
          <div class="left">
            <span>{{item.title}}</span>
            <p>{{item.created_at}} 阅读{{item.watch}}</p>
          </div>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      relatList: []
    };
  },
  watch: {
    $route() {
      this.$axios({
        url: "posts/recommend",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        this.relatList = res.data.data;
        this.relatList.forEach(e => {
          let time = moment(e.created_at).format("YYYY-MM-DD HH:mm:ss");
          e.created_at = time;
        });
        // console.log(this.relatList);
      });
    }
  },
  mounted() {
    this.$axios({
      url: "posts/recommend",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      this.relatList = res.data.data;
      this.relatList.forEach(e => {
        let time = moment(e.created_at).format("YYYY-MM-DD HH:mm:ss");
        e.created_at = time;
      });
      // console.log(this.relatList);
    });
  }
};
</script>

<style scoped lang="less">
.aside {
  margin-left: 20px;
  .box {
    margin-bottom: 20px;
    .sl {
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
    }
    .pic {
      width: 100px;
      height: 80px;
      flex-shrink: 0;
      background: #ddd;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .left {
      position: relative;
      width: 200px;
      height: 80px;
      p {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  h4 {
    margin: 20px 0;
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
}
</style>