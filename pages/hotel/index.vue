<template>
  <div class="container">
    <!-- 头部导航和搜索框 -->
    <div class="header mb">
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
              v-model="destCity"
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
              @change="handleTime"
              start-placeholder="入住日期"
              end-placeholder="离店日期"
              :picker-options="pickerOptions1"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple" style="position:relative">
            <el-input
              class="inline-input"
              placeholder="人数未定"
              maxlength="0"
              v-model="numbers"
              suffix-icon="el-input__icon iconfont iconuser"
              @focus="showUserSelect"
            />
            <div class="userSelect">
              <div class="select-item">
                <el-row type="flex" class="row-height" :gutter="20">
                  <el-col :span="8" class="mb">每间</el-col>
                  <el-col :span="8">
                    <el-select v-model="adult">
                      <el-option
                        v-for="item in adultList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select v-model="child">
                      <el-option
                        v-for="item in childList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </div>
              <div class="sure-btn">
                <el-row type="flex">
                  <el-col :span="18"></el-col>
                  <el-col :span="6">
                    <el-button type="primary" @click="changeNumbers">确定</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="getHotelList">查看价格</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 区域和地图 -->
    <div class="location mb">
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <!-- 左侧区域攻略部分 -->
          <div class="area" :infoData="infoData">
            <Area />
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 酒店主体内容 -->
    <div class="content">
      <!-- 条件筛选部分 -->
      <div class="filter mb">
        <el-row type="flex" justify="center" class="filter-row" style="padding-top:5px">
          <el-col :span="5" class="filter-list border-right">
            <el-row type="flex" justify="space-between" :gutter="20">
              <el-col :span="16">价格</el-col>
              <el-col :span="8">0-4000</el-col>
            </el-row>
            <div class="slide" style="padding:5px 10px;">
              <el-slider v-model="price_in" :format-tooltip="formatTooltip"></el-slider>
            </div>
          </el-col>
          <el-col :span="4" class="filter-list border-right">
            <p class="mb">住宿等级</p>
            <el-select v-model="hotellevel" multiple placeholder="请选择" collapse-tags>
              <el-option
                v-for="(item,index) in filtersList.levels"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="filter-list border-right">
            <p class="mb">住宿类型</p>
            <el-select v-model="hoteltype" multiple placeholder="请选择" collapse-tags>
              <el-option
                v-for="(item,index) in filtersList.types"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="filter-list border-right">
            <p class="mb">酒店设施</p>
            <el-select v-model="hotelasset" multiple placeholder="请选择" collapse-tags>
              <el-option
                v-for="(item,index) in filtersList.assets"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5" class="filter-list" style="padding:5px;">
            <p class="mb">酒店品牌</p>
            <el-select v-model="hotelbrand" multiple placeholder="请选择" collapse-tags>
              <el-option
                v-for="(item,index) in filtersList.brands"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>

      <!-- 酒店列表 -->
      <div class="hotel-list">
        <HotelList :data="infoData" />

        <!-- 分页功能 -->
        <div class="pagination">
          <el-row type="flex" justify="end" :gutter="20">
            <el-col :span="16"></el-col>
            <el-col :span="8">
              <el-pagination
                :small="true"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-size="pageSize"
                layout="prev, pager, next"
                prev-text="< 上一页"
                next-text="下一页 >"
                :total="total"
              ></el-pagination>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Area from "@/components/hotel/area";
import HotelList from "@/components/hotel/hotelList";
import moment from "moment";
export default {
  data() {
    return {
      adultList: [
        { value: 1, label: "1成人" },
        { value: 2, label: "2成人" },
        { value: 3, label: "3成人" },
        { value: 4, label: "4成人" },
        { value: 5, label: "5成人" },
        { value: 6, label: "6成人" },
        { value: 7, label: "7成人" }
      ], // 选择列表
      childList: [
        { value: 0, label: "0儿童" },
        { value: 1, label: "1儿童" },
        { value: 2, label: "2儿童" },
        { value: 3, label: "3儿童" },
        { value: 4, label: "4儿童" }
      ],
      adult: "2成人", // 旅客信息
      child: "0儿童", // 旅客信息
      pageSize: 10, // 分页每页显示条数
      pageNum: 1, // 分页当前页码
      total: 0, // 当前总数据
      filtersList: {
        levels: [], // 酒店等级
        types: [], // 酒店类型
        assets: [], // 酒店设施
        brands: [] // 酒店品牌
      },
      destCity: "南京", // 目标城市
      city: 74, // 所选城市
      stayDate: "", // 住宿时间
      numbers: "", // 住店人数
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 86400000;
        }
      }, // 可选日期列表
      price_in: 100, //酒店价格
      hotellevel: [], // 酒店星级
      hoteltype: [], // 酒店类型
      hotelbrand: [], // 酒店品牌
      hotelasset: [], // 酒店设施
      radio: false, // 按钮选中状态，临时变量
      cityList: [], // 存放城市列表
      scenicList:[], 
      infoData: {
        // data: [
        //   {
        //     scenic:[],
        //     hotellevel: {},
        //     hoteltype: {}
        //   }
        // ]
      }, // 存放当前酒店列表数据
      enterTime: "", // 入住时间
      leftTime: "" // 离开时间
    };
  },
  methods: {
    changeNumbers() {
      let str = "";
      str += this.adult;
      str += " ";
      if (this.child !== "0儿童") {
        str += this.child;
      }
      this.numbers = str;
      let userSelect = document.querySelector(".userSelect");
      userSelect.style.display = "none";
    },
    showUserSelect() {
      let userSelect = document.querySelector(".userSelect");
      userSelect.style.display = "block";
    },
    handleTime(val) {
      this.enterTime = moment(val[0].getTime()).format(`YYYY-MM-DD`);
      this.leftTime = moment(val[1].getTime()).format(`YYYY-MM-DD`);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
    },
    // 滑块提示
    formatTooltip(val) {
      return val * 40;
    },
    // 获取酒店列表数据的方法
    getHotelList() {
      let urlParams = "";
      if (this.city) {
        urlParams += `city=${this.city}`;
      }
      if (this.price_in) {
        urlParams += `&price_lt=${this.price_in * 40}`;
      }
      if (this.hotellevel.length > 0) {
        this.hotellevel.forEach(e => {
          urlParams += `&hotellevel_in=${e}`;
        });
      }
      if (this.hotelasset.length > 0) {
        this.hotelasset.forEach(e => {
          urlParams += `&hotelasset_in=${e}`;
        });
      }
      if (this.hotelbrand.length > 0) {
        this.hotelbrand.forEach(e => {
          urlParams += `&hotelbrand_in=${e}`;
        });
      }
      if (this.hoteltype.length > 0) {
        this.hoteltype.forEach(e => {
          urlParams += `&hoteltype_in=${e}`;
        });
      }
      if (this.pageNum !== 1) {
        urlParams += `&_start=${(this.pageNum - 1) * 5}`;
      }
      if (this.enterTime) {
        urlParams += `&enterTime=${this.enterTime}`;
      }
      if (this.leftTime) {
        urlParams += `&enterTime=${this.leftTime}`;
      }
      if (urlParams) {
        urlParams = "?" + urlParams.slice(0);
      }
      this.$router.push({
        path: "/hotel" + urlParams
      });
    },
    querySearch(queryString, cb) {
      this.$axios({
        url: "/cities",
        params: { name: queryString }
      }).then(res => {
        if (res.status === 200) {
          const { data } = res.data;
          // 调用 callback 返回建议列表的数据
          data.forEach(e => {
            e.value = e.name;
          });
          cb(data);
          // 设置默认选择第一个
          this.city = data[0].id;
        }
      });
    },
    handleSelect(item) {
      this.city = item.id;
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
    },
    init() {
      this.$axios({
        url: "/hotels/options"
      }).then(res => {
        const { data } = res.data;
        this.filtersList = data;
      });
      this.$axios({
        url: "/hotels?&city=74"
      }).then(res => {
        this.infoData = res.data;
        this.total = this.infoData.total;
        this.$store.commit('hotelList/setInfoData',this.infoData)
        this.$store.commit('hotelList/setScenicList',this.infoData.data[0].scenic)
        this.$store.commit('hotelList/setHotelList',this.infoData.data)
        // console.log(this.$store.state.hotelList.scenicList);
        
      });
      this.$router.push({
        path: "/hotel?city=74"
      });
    }
  },
  components: {
    Area,
    HotelList
  },
  mounted() {
    this.init();
  },
  watch: {
    $route() {
      let index = this.$route.fullPath.indexOf("?");
      let urlStr = this.$route.fullPath.substr;
      if (index > -1) {
        urlStr = this.$route.fullPath.substr(index + 1);
        this.$axios({
          url: "/hotels?&" + urlStr
        }).then(res => {
          this.infoData = res.data;
        });
      } else {
        this.$axios({
          url: "/hotels"
        }).then(res => {
          this.infoData = res.data;
        });
      }
    },
    enterTime() {
      this.getHotelList();
    },
    leftTime() {
      this.getHotelList();
    },
    pageNum() {
      this.getHotelList();
    },
    city() {
      this.getHotelList();
    },
    price_in() {
      this.getHotelList();
    },
    hotellevel: {
      handler(newValue, oldValue) {
        this.getHotelList();
      },
      deep: true
    },
    hoteltype: {
      handler(newValue, oldValue) {
        this.getHotelList();
      },
      deep: true
    },
    hotelbrand: {
      handler(newValue, oldValue) {
        this.getHotelList();
      },
      deep: true
    },
    hotelasset: {
      handler(newValue, oldValue) {
        this.getHotelList();
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
input {
  margin: 0;
  padding: 0;
}
.container {
  width: 1000px;
  margin: 0 auto;
  font-size: 14px;
  color: #666;
}
/deep/ .el-breadcrumb {
  padding: 20px 0;
  font-size: 14px;
  line-height: 1;
}
.area {
  overflow: hidden;
}
.mb {
  margin-bottom: 20px;
}
.filter-row {
  border: 1px solid #ccc;
}
.filter-list {
  padding: 5px 20px;
}
.border-right {
  border-right: 1px solid #ccc;
  padding: 5px;
}
.pagination {
  padding: 20px 0 30px;
}
.userSelect {
  display: none;
  position: absolute;
  top: 55px;
  left: 5px;
  z-index: 9;
  width: 300px;
  background-color: #fff;
  padding: 10px;
}
.select-item {
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.row-height {
  height: 28px;
  line-height: 28px;

  /deep/ .el-input__inner {
    height: 28px;
    line-height: 40px;
    font-size: 12px;
  }
}
/deep/ .el-input__icon {
  margin-top: 5px;
}
.sure-btn {
  /deep/ .el-button {
    margin-top: 20px;
    font-size: 12px;
    line-height: 3px;
    text-align: center;
  }
  span {
    display: block;
    width: 24px;
    height: 12px;
  }
}
</style>
