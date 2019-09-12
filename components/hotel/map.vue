<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 等待下面Url加载完毕之后再执行
    window.onLoad = function() {
      // 创建地图。container是容器的id
      var map = new AMap.Map("container", {
        zoom: 15, // 放大倍数，默认值11
        center: [113.3245904, 23.1066805] // 中心点，根据经纬度确定
      });
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=a3e56c195bc69d6231b122018128879b&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style lang="less" scoped>
#container {
  width: 420px;
  height: 260px;
}
</style>