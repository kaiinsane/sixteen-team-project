<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="14">
        <div class="left">
          <!-- 区域 -->
          <div class="area mb">
            <el-row>
              <el-col :span="3">区域：</el-col>
              <el-col :span="21">
                全部
                <p>
                  <a href="javascript:">
                    <i class="el-icon-d-arrow-right iconfont"></i> 等0个区域
                  </a>
                </p>
              </el-col>
            </el-row>
          </div>

          <!-- 攻略 -->
          <div class="attack mb">
            <el-row>
              <el-col :span="3">攻略：</el-col>
              <el-col :span="21">
                <div class="attack-text">
                  <span>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</span>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 均价 -->
          <div class="average-price">
            <el-row>
              <el-col :span="3">
                <span class="price">
                  均价:
                  <el-tooltip
                    class="price-text"
                    effect="dark"
                    content="等级均价由平日价格计算得出,节假日价格会有上浮"
                    placement="top-start"
                  >
                    <i class="price-icon">?</i>
                  </el-tooltip>
                </span>
              </el-col>
              <el-col :span="7">三星：￥332</el-col>
              <el-col :span="7">四星：￥521</el-col>
              <el-col :span="7">五星：￥768</el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <Map />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Map from "@/components/hotel/map";
export default {
  components: {
    Map
  }
};
</script>

<style lang="less" scoped>
.container {
  color: #666;
  font-size: 14px;
}
.iconfont {
  transform: rotate(90deg);
  color: #f90;
}
.mb {
  margin-bottom: 20px;
}
.price-icon {
  display: block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #ccc;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 15px;
  position: absolute;
  top: -3px;
  left: 35px;
  &:hover {
    .price-text {
      display: block;
    }
  }
}
</style>