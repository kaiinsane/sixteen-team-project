<template>
  <div style="padding: 50px 0">
    高德地图
    <!-- 地图组件 -->
    <el-container style="height: 300px">
      <el-aside style="width: 60%">
        <!-- 地图 -->
        <div id="container"></div>
      </el-aside>
      <!-- 地图列表 -->
      <el-main style="width: 40%">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <ul class="maplist">
              <li v-for="(item, index) in pointData.pois1" :key="index">
                {{item.name}}
                <div class="mapright">公里</div>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second">
            <ul class="maplist">
              <li v-for="(item, index) in pointData.pois2" :key="index">
                {{item.name}}
                <div class="mapright">公里</div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  props: {
    pointData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      //地图列表切换
      activeName: "second",
      mapdata: [],
      traffic: [],
      mapbluepoint: []
    };
  },
  methods: {
    handleClick() {
      // console.log(this.activeName);
    }
  },
  mounted() {
    let temp = []
    setTimeout(() => {
      console.log(this.activeName);
      if (this.activeName === "first") {
        temp = this.$store.state.map.pois1;
      }else {
        temp = this.$store.state.map.pois2;
      }
    }, 1000);
    // 等待下面url加载完毕之后再执行
    window.onLoad = function() {
      
      // 创建地图， container是容器的id
      var map = new AMap.Map("container", {
        zoom: 10, // 放大倍数，默认值11
        center: [118.78, 32.07] // 中心点，根据经纬度确定
      });

      let markerList = [];
      
      for (let i = 0; i < temp.length; i++) {
        // 创建一个 Marker 实例：
        let marker = new AMap.Marker({
          // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          position: temp[i].location.split(','),
          // position:[116.39, 39.9],
          title: `${temp.name}`,
          content:  `<div style="width: 25px;height: 34px;background-image:url(https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png);background-size:contain";position:relative>
          <span style="position:absolute;top:2px;left:8px;color:#fff;">${i}</span>
        </div>`
        });
        markerList.push(marker);
      }

      // 将创建的点标记添加到已有的地图实例：
      map.add(markerList);
    };
    setTimeout(() => {
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=144e1bdc353db812fc79f782ebd35b1f&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    }, 2000);
  }
};
</script>

<style scoped lang="less" >
#container {
  width: 500px;
  height: 300px;
}
.scrollhidden {
  overflow: hidden;
}
.maplist {
  list-style: none;
  padding: 0px;
  color: gray;
  li {
    margin-top: 10px;
    margin-bottom: 10px;
    .mapright {
      float: right;
    }
  }
}
</style> 