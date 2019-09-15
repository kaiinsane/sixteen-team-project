<template>
  <div class="container">
    <el-row
      type="flex"
      justify="center"
      class="hotelItem"
      v-for="(item,index) in $store.state.hotelList.hotelList"
      :key="index"
    >
      <el-col :span="8">
        <img :src="item.photos" alt />
      </el-col>
      <el-col :span="10" class="hotel-intro">
        <h2 class="hotel-name">{{item.name}}</h2>
        <p style="color:#999">
          {{item.alias}}
          <span v-if="item.hotellevel&&item.hotellevel.level === 1">
            <i class="iconfont iconhuangguan origin" v-for="(item,index) in [1]" :key="index" />
          </span>
          <span v-if="item.hotellevel&&item.hotellevel.level === 2">
            <i class="iconfont iconhuangguan origin" v-for="(item,index) in [1,2]" :key="index" />
          </span>
          <span v-if="item.hotellevel&&item.hotellevel.level === 3">
            <i class="iconfont iconhuangguan origin" v-for="(item,index) in [1,2,3]" :key="index" />
          </span>
          <span v-if="item.hotellevel&&item.hotellevel.level === 4">
            <i class="iconfont iconhuangguan origin" v-for="(item,index) in [1,2,3,4]" :key="index" />
          </span>
          <span v-if="item.hotellevel&&item.hotellevel.level === 5">
            <i class="iconfont iconhuangguan origin" v-for="(item,index) in [1,2,3,4,5]" :key="index" />
          </span>
          {{item.hoteltype&&item.hoteltype.name}}
        </p>
        <p>
          <el-rate
            v-model="item.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}分"
          ></el-rate>
          <span class="origin">{{item.stars}} 分</span>
          <span class="origin" style="padding-left:20px">{{getRandom()}}</span> 条评价
          <span class="origin" style="padding-left:30px">{{getRandom()}}</span> 篇游记
        </p>
        <span class="location">
          <i class="iconfont iconlocation"></i>
          位于：{{item.address}}
        </span>
      </el-col>
      <el-col :span="6" style="padding-left:20px">
        <div class="other-path">
          <el-row
            type="flex"
            justify="center"
            class="other-path-item"
            v-for="(item2,index) in item.products"
            :key="index"
          >
            <el-col :span="16">{{item2.name}}</el-col>
            <el-col :span="8">
              <span class="origin">￥{{item2.price}}</span>起 >
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      data: [
        {
          hotellevel: {},
          hoteltype: {}
        }
      ],
      type: Object,
      default: {}
    }
  },
  computed: {
    levelArr(item) {
      let arr = [];
      for (let i = 0; i < item.hotellevel.level; i++) {
        arr.push(i);
      }
      return arr;
    }
  },

  data() {
    return {
      hotelList: []
    };
  },
  methods: {
    getRandom() {
      return Math.floor(Math.random() * 90 + 10);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  font-family: "Microsoft YaHei";
}
.hotelItem {
  padding: 25px 0;
  border-bottom: 1px solid #eee;
}
.hotelItem img {
  width: 320px;
  height: 210px;
}
.origin {
  color: #f90;
}
.hotel-name {
  font-weight: 400;
}
.hotel-intro {
  color: #000;
  font-size: 16px;
  line-height: 30px;
}
.location {
  font-size: 14px;
  color: #666;
}
.other-path {
  margin-top: 20px;
  font-size: 14px;
  color: #606266;
}
.other-path-item {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}
</style>