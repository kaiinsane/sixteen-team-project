<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 侧边推荐栏 -->
      <div class="aside">
        <PostMenu></PostMenu>
      </div>
      <div class="main">
        <!-- 搜索栏 -->
        <div class="search">
          <el-input
            placeholder="请输入想去的地方，比如：'广州'"
            v-model="searchCity"
            class="search_box"
            @keyup.enter.native="searchData(searchCity)"
          ></el-input>
          <i class="el-icon-search" @click="searchData(searchCity)"></i>
          <div class="searh_recom">
            <span>推荐:</span>
            <span @click="searchData('广州')">广州</span>
            <span @click="searchData('上海')">上海</span>
            <span @click="searchData('北京')">北京</span>
          </div>
        </div>
        <!-- 推荐攻略 -->
        <div class="add_post">
          <el-row type="flex" justify="space-between">
            <h4>推荐攻略</h4>
            <nuxt-link :to="`/post/create`">
              <el-button type="primary" i con="el-icon-edit">写游记</el-button>
            </nuxt-link>
          </el-row>
        </div>
        <!-- 文章列表 -->
        <div class="list">
          <PostList v-for="(item,index) in dataList" :key="index" :data="item"></PostList>
        </div>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
import PostList from "@/components/post/postList.vue";
import PostMenu from "@/components/post/postMenu.vue";
export default {
  data() {
    return {
      searchCity: "",
      //文章总数据
      postsList: [],
      //缓存总数据
      cpostsList: [],
      // 当前显示的列表数组
      dataList: [],
      cdataList: [],
      pageIndex: 1,
      pageSize: 2,
      total: 0
    };
  },
  components: {
    PostList,
    PostMenu
  },
  watch: {
    $route() {
      this.getData();
    }
  },
  async mounted() {
    let res = await this.$axios({
      url: "posts",
      params: {
        _limit: 1000
      }
    }).then(res => {
      this.cpostsList = [...res.data.data];
      this.getData();
    });
  },
  methods: {
    searchData(searchCity) {
      let arr = [];
      this.pageIndex = 1;

      if (this.$route.query.city) {
        this.postsList = this.cpostsList;
        // console.log(this.postsList);
      }
      this.postsList = this.cpostsList;
      this.postsList.forEach(e => {
        if (e.cityName.indexOf(searchCity) !== -1) {
          arr.push(e);
        }
      });
      this.searchCity = searchCity;

      this.dataList = arr;
      this.cdataList = arr;
      this.total = this.dataList.length;
      this.dataList = this.dataList.slice(0, this.pageSize);
    },
    getData() {
      // console.log(this.$route.query);
      if (this.$route.query.city) {
        this.$axios({
          url: "posts",
          params: this.$route.query
        }).then(res => {
          console.log(this.$route.query);
          console.log(res);
          this.pageIndex = 1;
          this.postsList = res.data.data;
          this.cdataList=[...this.postsList]
          this.total = this.postsList.length;
          this.dataList = this.postsList.slice(0, this.pageSize);
        });
      } else {
        this.$axios({
          url: "posts",
          params: {
            _limit: 1000
          }
        }).then(res => {
          // console.log(res.data.data);
          this.postsList = res.data.data;
          this.cpostsList = [...this.postsList];
          // console.log(this.cpostsList, this.postsList);
          this.total = this.postsList.length;
          this.dataList = this.postsList.slice(0, this.pageSize);
        });
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageIndex = 1;
      if (!this.searchCity) {
        this.dataList = this.postsList.slice(0, this.pageSize);
      } else {
        this.dataList = this.cdataList.slice(0, this.pageSize);
      }
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      if (!this.searchCity) {
        console.log(this.dataList);

        this.dataList = this.postsList.slice(
          (this.pageIndex - 1) * this.pageSize,
          this.pageIndex * this.pageSize
        );
      } else {
        console.log(this.dataList);
        this.dataList = this.cdataList.slice(
          (this.pageIndex - 1) * this.pageSize,
          this.pageIndex * this.pageSize
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
  .aside {
    width: 30%;
  }
  .main {
    width: 70%;
    .search {
      position: relative;
      .search_box {
        /deep/ .el-input__inner {
          width: 100%;
          // box-sizing: border-box;
          height: 40px;
          line-height: 40px;
          border: 3px solid orange;
        }
      }
      /deep/ .el-icon-search {
        position: absolute;
        right: 0;
        top: 7px;
        font-size: 24px;
        color: orange;
        font-weight: 700;
        margin-right: 10px;
      }
      .searh_recom {
        padding: 10px 0;
        font-size: 12px;
        color: #666;
        span {
          cursor: pointer;
          margin-left: 5px;
          &:hover {
            color: orange;
            text-decoration: underline;
          }
        }
      }
    }
    .add_post {
      height: 40px;
      line-height: 40px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      /deep/.el-button--primary {
        height: 40px;
      }
      h4 {
        height: 38px;
        font-weight: 400;
        font-size: 18px;
        color: orange;
        padding-bottom: 10px;
        border-bottom: 2px solid orange;
      }
    }
  }
}
</style>