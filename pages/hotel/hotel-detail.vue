<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{this.hoteldata.big_cate}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel'}">{{this.hoteldata.real_city}}酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{this.hoteldata.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 酒店招牌 -->
    <div class="el-col el-col-24" style="margin-bottom:40px">
      <div class="el-row">
        <h2 class="hotel-name">
          {{this.hoteldata.name}}
          <span>
            <i class="iconfont iconhuangguan origin" v-for="(item,index) in [1,2,3]" :key="index" />
          </span>
        </h2>
      </div>
      <div class="el-row hotrlbrandcolor">
        <span class="hotel-en-name">{{this.hoteldata.alias}}</span>
      </div>
      <div class="el-row hotrlbrandcolor">
        <i class="iconfont iconlocation"></i>
        {{this.hoteldata.address}}
      </div>
    </div>


    <!-- 图片预览 -->
    <div class="pic-info info-row el-row" style="margin-bottom:40px"> 
      <div class="photo-view el-row">
        <div class="main-pic el-col el-col-16">
          <img height="360" width="640" src="../../static/upload/1.jpeg" alt ref="bigimage" />
          <span class="summary"></span>
        </div>
        <div class="list-pics el-col el-col-8">
          <div class="list-item el-row" style="margin-left: -10px; margin-right: -10px;">
            <div class="el-col el-col-12" style="padding:0 10px 10px">
              <a href="javascript:void(0)">
                <img width="160" src="../../static/upload/1.jpeg" alt @click="imagechange" />
              </a>
            </div>
             <div class="el-col el-col-12" style="padding:0 10px 10px">
              <a href="javascript:void(0)">
                <img width="160" src="../../static/upload/2.jpeg" alt @click="imagechange" />
              </a>
            </div>
             <div class="el-col el-col-12" style="padding:0 10px 10px">
              <a href="javascript:void(0)">
                <img width="160" src="../../static/upload/3.jpeg" alt @click="imagechange" />
              </a>
            </div>
             <div class="el-col el-col-12" style="padding:0 10px 10px">
              <a href="javascript:void(0)">
                <img width="160" src="../../static/upload/4.jpeg" alt @click="imagechange" />
              </a>
            </div>
             <div class="el-col el-col-12" style="padding:0 10px 10px">
              <a href="javascript:void(0)">
                <img width="160" src="../../static/upload/5.jpeg" alt @click="imagechange" />
              </a>
            </div>
             <div class="el-col el-col-12" style="padding:0 10px 10px">
              <a href="javascript:void(0)">
                <img width="160" src="../../static/upload/6.jpeg" alt @click="imagechange" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 价格列表 -->
    <template>
      <el-table :data="hotelroomData" style="width: 100%">
        <el-table-column prop="name" label="价格来源" style="width: 33%"></el-table-column>
        <el-table-column prop="bestType" label="低价房型" style="width: 33%"></el-table-column>
        <el-table-column prop="price" label="最低价格/每晚" style="width: 33%"></el-table-column>
      </el-table>
    </template>

    <!-- 高德地图模块 -->
    <Map :pointData="pointData" />

    <ul class="hotelinfo">
      <li>
        <span>基本信息</span>
        <span class="baseinfo">入住时间: 14:00之后</span>
        <span class="baseinfo">离店时间: 12:00之前</span>
        <span class="baseinfo">{{this.hoteldata.creation_time}}/{{this.hoteldata.renovat_time}}</span>
        <span class="baseinfo">酒店规模: {{this.hoteldata.roomCount}}间客房</span>
      </li>
      <li>
        <span>主要设施</span>
        <span v-for="(item, index) in hoteldata.hotelassets" :key="index">{{item.name}}</span>
      </li>
      <li>
        <span>停车服务</span>
      </li>
      <li>
        <span>品牌信息</span>
      </li>
    </ul>

    <div class="user-comment">
      <div>
        <span>
          <h4>0条真实用户评论</h4>
        </span>
      </div>
      <div class="commentnum">
        <div>
          <div>总评数：{{this.hoteldata.all_remarks}}</div>
          <div>好评数：{{this.hoteldata.good_remarks}}</div>
          <div>差评数：{{this.hoteldata.bad_remarks}}</div>
        </div>
        <div>
          <el-rate
            v-model="hoteldata.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </div>
        <div class="origin">
          环境
          <span v-show="environment">{{this.environment}}</span>
        </div>
        <div class="origin">
          产品
          <span v-show="product">{{this.product}}</span>
        </div>
        <div class="origin">
          服务
          <span v-show="service">{{this.service}}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Map from "@/components/hotel/hotelmap";
export default {
  data() {
    return {
      environment: false,
      product: false,
      service: false,

      hotelroomData: [],
      //酒店信息数据
      hoteldata: [],
      value: 0,
      pointData:{
        pois1:[],
        pois2:[],
      }
    };
  },
  components: {
    Map
  },
  methods: {
    imagechange($event) {
      this.$refs.bigimage.src = $event.srcElement.currentSrc;
    }
  },
  mounted() {
      // 请求订单详情
      this.$axios({
        url: "/hotels",
        params: {
          id:this.$route.query.id
        }
      }).then(res => {
        this.hoteldata = res.data.data[0];
        this.hotelroomData = this.hoteldata.products;
        this.environment = this.hoteldata.scores.environment;
        this.product = this.hoteldata.scores.product;
        this.service = this.hoteldata.scores.service;
        this.value = this.hoteldata.stars;
      });

      // 获取地图数据
      this.$axios({
      url: "http://restapi.amap.com/v3/place/text",
      params: {
        keyword: "",
        city: "南京",
        location: [118, 31],
        types: "风景名胜",
        output: "json",
        page: 1,
        offset: 10,
        key: "edb915a66fc77999885625e932e0a420"
      }
    }).then(res => {
        this.pointData.pois1 = res.data.pois;
        this.$store.commit('map/setPois1',this.pointData.pois1)
    });
    this.$axios({
      url: "http://restapi.amap.com/v3/place/text",
      params: {
        keyword: "",
        city: "南京",
        location: [118, 31],
        types: "交通设施服务",
        output: "json",
        page: 1,
        offset: 10,
        key: "edb915a66fc77999885625e932e0a420"
      }
    }).then(res => {
      this.pointData.pois2 = res.data.pois;
      this.$store.commit('map/setPois2',this.pointData.pois2)
    });
  }
};
</script>

<style scoped lang="less">
.origin {
  color: #f90;
}
.hotrlbrandcolor {
  font-size: 14px;
  color: gray;
}
.container {
  width: 1000px;
  margin: 0 auto;
  .nav {
    padding: 20px 0;
  }
  .hotel-name {
    font-weight: 400;
  }
}
.hotelinfo {
  width: 100%;
  height: 240px;
  list-style: none;

  li {
    border-bottom: solid 1px gray;
    height: 25%;
    padding: auto;
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    span {
      display: inline-block;
      margin-left: 20px;
      font-size: 14px;
      text-align: center;
    }
  }
}
.user-comment {
  width: 100%;
  height: 135px;
  margin-top: 30px;
  margin-bottom: 30px;
  .commentnum {
    > div {
      width: 18%;
      height: 135px;
      float: left;
      margin-top: 20px;
      margin-left: 20px;
      div {
        width: 100%;
      }
    }
  }
}
</style>