<template>
  <div class="container">
    <!-- 头部导航和搜索框 -->
    <div class="header mb">
      <HotelHeader />
    </div>

    <!-- 区域和地图 -->
    <div class="location mb">
      <el-row type="flex" justify="center">
        <el-col :span="24">
          <!-- 左侧区域攻略部分 -->
          <div class="area">
            <Area />
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 酒店主体内容 -->
    <div class="content">
      <!-- 条件筛选部分 -->
      <div class="filter"></div>

      <!-- 酒店列表 -->
      <div class="hotel-list"></div>
    </div>
  </div>
</template>

<script>
import HotelHeader from "@/components/hotel/hotelHeader";
import Area from "@/components/hotel/area";
export default {
  components: {
    HotelHeader,
    Area,
    Map
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
.area {
  overflow:hidden;
}
.mb {
  margin-bottom: 20px
}
</style>
