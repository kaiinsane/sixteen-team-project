<template>
  <div>
    <div id="container">
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

      let markerList = [];
      for (let i = 0; i < data.length; i++) {
        let location = [];
        location.push(data[i].location.longitude);
        location.push(data[i].location.latitude);

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
</style>