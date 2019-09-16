<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 10:58:36
 * @LastEditTime: 2019-09-16 09:27:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="main">
    <!-- 点赞部分 -->
    <el-row type="flex" justify="center">
      <div class="item_icon">
        <i class="iconfont iconpinglun"></i>
        <p>评论({{this.comments}})</p>
      </div>
      <div class="item_icon">
        <i class="iconfont iconstar1"></i>
        <p>收藏</p>
      </div>
      <div class="item_icon">
        <i class="iconfont iconfenxiang"></i>
        <p>分享</p>
      </div>
      <div class="item_icon" @click="likepost">
        <i class="iconfont iconding"></i>
        <p>点赞({{this.resList.like}})</p>
      </div>
    </el-row>

    <!-- 评论 -->
    <div class="com_textarea">
      <!-- 评论框 -->
      <h4>评论</h4>
      <div class="reply">
        <el-tag class="relyTag" type="info" v-if="user.comid">回复 : @ {{user.nickname}} </el-tag>
      </div>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
    </div>

    <!-- 文件上传 -->
    <el-row type="flex" justify="space-between">
      <el-upload
        action="http://157.122.54.189:9095/upload"
        name="files"
        list-type="picture-card"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-button type="primary" style="padding:0; width:56px; height:28px;">提交</el-button>
    </el-row>

    <!-- 评论 -->
    <div class="comment">
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
          <Item :data="item" :level="item.level" v-if="item.level > 1" @reply="reply" />
        </div>
        <el-row type="flex">
          <el-col :span="24" class="com-content">
            {{item.content}}
            <span class="replybtn" @click="reply(item)">回复</span>
            <div class="img" v-if="item.pics.length!==0">
              <div
                :style="`background-image: url('http://157.122.54.189:9095${item.pics[0].url}');`"
              ></div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="pagination" type="flex" justify="center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page._start"
          :page-sizes="[1,2,5,8,10]"
          :page-size="page._limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Item from "@/components/post/item";
export default {
  filters: {
    timeFormat(time) {
      return moment(time).format("YYYY-MM-DD hh:mm");
    }
  },
  components: {
    Item
  },
  data() {
    return {
      textarea: "",
      resList: [],
      comments: [],
      pageSize: "",
      pageIndex: "",
      postData: [],
      // 当前显示的列表数组
      dataList: [],
      commentsList: [],
      user:{},
      page: {
        post: this.$route.query.id,
        _start: 1,
        _limit: 2
      },
      total: 3
    };
  },
  methods: {
    getData() {
      let params = { ...this.page };
      params._start = params._start - 1;
      this.$axios({
        url: "/posts/comments",
        method: "GET",
        params
      }).then(res => {
        console.log(res);
        this.total = res.data.total;
        this.commentsList = res.data.data;
      });
    },
    reply(item) {
      this.user = item.account;
      this.user.comid = item.id;
      console.log(this.user);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page._limit = val;
      this.getData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page._start = val;
      this.getData();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 文件上传前的钩子
    beforeUpload(file) {
      // console.log(file);
      // 图片的mime类型都是以image/开头，所以我们可以获取到type数据，进行判断
      if (file.type.indexOf("image/") !== 0) {
        this.$message.warning("请选择满足格式要求的图片，如png,jpg,jpeg");
        // 取消当前上传操作，会触发handleRemove
        return false;
      }
    },
    uploadFile() {
      // 1.获取token
      // var token = this.$store.state.user.userInfo.token;
      // 2.返回对象
      return { Authorization: token };
    },
    // 文件上传成功之后的钩子
    handleSuccess(response, file, fileList) {
      // 获取文件上传成功之后，服务器端的文件存储路径
      console.log(response, file, fileList);
      if (response) {
        console.log(this.commentsList);
        // response包含了我们需要的文件上传成功之后服务器端的存储路径

      }
      // this.$axios({
      //   url:"upload",
      //   params:{
      //     files:28
      //   },
      // }).then(res=>{
      //   console.log(res)
      // })
    },

    // 文章点赞
    likepost() {
      this.$axios({
        url: "posts/like",
        params: {
          id: this.$route.query.id
        },
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res);
      });
    }
  },
  watch: {
    $route() {
      this.$axios({
        url: "posts",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        this.resList = res.data.data[0];
        this.comments = this.resList.comments.length;
      });
    }
  },
  mounted() {
    //获取评论
    this.getData();
    // 文章数据
    this.$axios({
      url: "posts",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      this.resList = res.data.data[0];
      this.comments = this.resList.comments.length;
      // console.log(this.resList);
      if (this.resList.like === null) {
        this.resList.like = 0;
        return;
      }
    });
  }
};
</script>

<style scoped lang="less">
.main {
  padding: 50px 0 30px;
  .item_icon {
    margin: 0 20px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    p {
      margin-top: 5px;
      font-size: 14px;
      color: #999;
    }
    .iconfont {
      display: block;
      font-size: 28px;
      color: orange;
    }
  }
  .com_textarea {
    h4 {
      font-weight: 400;
      font-size: 18px;
      margin-bottom: 20px;
    }
    .relyTag {
      margin-bottom: 10px;
    }
  }
  .comment {
    width: 100%;
    margin: 30px 0;
    .com-item {
      padding: 20px 20px 5px 20px;
      font-size: 12px;
      border: 1px solid #eee;
      border-bottom: 1px dashed #ddd;
      position: relative;
      &:last-child {
        border: none;
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
        .img > div {
          display: block;
          height: 80px;
          width: 80px;
          border: 1px dashed #000;
          margin: 10px;
        }
        .replybtn {
          display: none;
          position: absolute;
          bottom: 3px;
          right: 3px;
          font-size: 12px;
          color: royalblue;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        &:hover .replybtn {
          display: block;
        }
      }
    }
    /deep/ img {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .block {
    margin-top: 20px;
  }
}
</style>