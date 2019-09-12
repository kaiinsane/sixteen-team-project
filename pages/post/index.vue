<template>
  <div class="container">
    <el-row>
      <el-col :span="6">
        <div class="nav" @mouseleave="handleOutHover">
          <ul class="nav_menu" style="margin-top:10px">
            <li v-for="(item,index) in cityList" :key="index" @mouseover="handleHover(index)">
              <span>{{item.type}}</span>
              <i class="el-icon-arrow-right fr"></i>
            </li>
          </ul>
          <div class="nav_item">
            <el-row
              type="flex"
              justify="start"
              v-for="(item,index) in hot_city"
              :key="'a'+index"
              v-show="currentHover === 0"
            >
              <el-col :span="24">
                <span class="num">{{index + 1}}</span>
                <a href="javascript:" class="city">{{item.city}}</a>
                <a href="javascript:">{{item.desc}}</a>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              justify="start"
              v-for="(item,index) in recommoned_city"
              :key="'b'+index"
              v-show="currentHover === 1"
            >
              <el-col :span="24">
                <span class="num">{{index + 1}}</span>
                <a href="javascript:" class="city">{{item.city}}</a>
                <a href="javascript:">{{item.desc}}</a>
              </el-col>
            </el-row>

             <el-row
              type="flex"
              justify="start"
              v-for="(item,index) in islandList"
              :key="'c'+index"
              v-show="currentHover === 2"
            >
              <el-col :span="24">
                <span class="num">{{index + 1}}</span>
                <a href="javascript:" class="city">{{item.city}}</a>
                <a href="javascript:">{{item.desc}}</a>
              </el-col>
            </el-row>

             <el-row
              type="flex"
              justify="start"
              v-for="(item,index) in recommoned_city"
              :key="'d'+index"
              v-show="currentHover === 3"
            >
              <el-col :span="24">
                <span class="num">{{index + 1}}</span>
                <a href="javascript:" class="city">{{item.city}}</a>
                <a href="javascript:">{{item.desc}}</a>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="aside-recommend">
          <span>推荐城市</span>
          <img src="http://157.122.54.189:9093/images/pic_sea.jpeg`" alt="">
        </div>
      </el-col>
      <el-col :span="18"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityList:[],
      currentHover:9,
      hot_city: [],
      recommoned_city: [],
      islandList:[],
      theme_city:[]
    };
  },
  methods:{
    handleHover(index){
      this.currentHover = index
    },
    handleOutHover(){
      this.currentHover = 9
    }
  },
  mounted(){
    this.$axios({
      url:'/posts/cities'
    }).then(res=>{
      if(res.status === 200){
        this.cityList = res.data.data
        console.log(this.cityList);
        this.hot_city = res.data.data[0].children
        this.recommoned_city = res.data.data[1].children
        this.islandList = res.data.data[2].children
        this.theme_city = res.data.data[3].children
        
      }
      
    })
    this.$axios({
      url:'/posts/recommend'
    }).then(res => {
      console.log(res);
      
    })
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
.fr {
  float: right;
  height: 40px;
  line-height: 40px;
}
.nav {
  position: relative;
  overflow: visible;
  .nav_menu {
    li {
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      border: 1px solid #ddd;
      &:nth-child(-n + 3) {
        border-bottom: none;
      }
      &:hover {
        border-right: 1px solid #fff;
        color: #ffa500;
      }
    }
  }
  .nav_item {
    position: absolute;
    top: 0;
    left: 250px;
    width: 400px;
    line-height: 30px;
    font-size: 14px;
    color: #999;
    border: 1px solid #ddd;
    border-left: none;
    .num {
      padding-left: 15px;
      color: #ffa500;
      font-style: italic;
      font-size: 20px;
    }
    .city {
      padding: 0 10px;
      color: #ffa500;
    }
  }
}
</style>