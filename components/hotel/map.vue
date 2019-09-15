<template>
  <div>
    <div id="container">
      <!-- <div class="box"></div> -->
      <!-- <img src="" alt=""> -->
      <!-- <img src="https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png" 
      alt="xx酒店" style="width: 25px;height: 34px;>-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infoData: {}
  },
  mounted() {
    let data;
    setTimeout(() => {
      data = this.$store.state.hotelList.hotelList 
    }, 1000);
     
    // 等待下面Url加载完毕之后再执行
    window.onLoad = function() {
      // 创建地图。container是容器的id
      var map = new AMap.Map("container", {
        zoom: 8, // 放大倍数，默认值11
        center: [118.78, 32.07] // 中心点，根据经纬度确定
      });
      // var marker = new AMap.Marker({
      //   position: [118.79, 32.17], //位置
      //   title: "xx酒店",
      //   content: `<div style="width: 25px;height: 34px;background-image:url(https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png);background-size:contain";position:relative>
      //     <span style="position:absolute;top:2px;left:8px;color:#fff;">1</span>
      //   </div>`
      // });
      // map.add(marker); //添加到地图


      let markerList = [];
      for (let i = 0; i < data.length; i++) {
        let location = [];
        location.push(data[i].location.longitude);
        location.push(data[i].location.latitude);
        console.log(location,1234567);

        let marker = new AMap.Marker({
          position: location, //位置
          title: `${data[i].name}`,
          content: `<div style="width: 25px;height: 34px;background-image:url(https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png);background-size:contain";position:relative>
          <span style="position:absolute;top:2px;left:8px;color:#fff;">${i}</span>
        </div>`
        });
        markerList.push(marker)
      }
      map.add(markerList);
    };
    setTimeout(() => {
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=a3e56c195bc69d6231b122018128879b&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
#container {
  width: 420px;
  height: 260px;
}
.box {
  position: absolute;
  width: 300px;
  height: 300px;
  background: url(https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png);
}
.marker {
  width: 25px;
  height: 34px;
  background: #4297fc;
  // color: #fff;
  // padding: 4px 10px;
  // box-shadow: 1px 1px 1px rgba(10, 10, 10, 0.2);
  // white-space: nowrap;
  // font-size: 12px;
  // font-family: "";
  // background-color: #25a5f7;
  // border-radius: 3px;
}
</style>