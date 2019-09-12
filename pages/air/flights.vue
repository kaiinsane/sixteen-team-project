<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheData" @changeDataList="changeDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="margin-left:100px"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <FlightsAside />
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";

export default {
  data() {
    return {
      // 定义一个不变的数据去储存拿到的数据列表
      cacheData: {
        info: {},
        options: {}
      },
      flightsData: {
        info: {},
        options: {}
      },
      dataList: [],
      pageNum: 1,
      pageSize: 5,
      total: 0
    };
  },
  methods: {
    getData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res.data);

        this.flightsData = res.data;
        this.cacheData = { ...res.data };
        //   this.dataList = res.data.flights;
        this.setDataList();
        this.total = res.data.total;
      });
    },
    changeDataList(arr) {
      this.flightsData.flights = arr;
      this.total = arr.length;
      this.pageNum = 1;
      this.setDataList();
    },
    setDataList() {
      this.dataList = this.flightsData.flights.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.setDataList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.setDataList();
    }
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  watch: {
    $route() {
      this.getData()
    }
  },
  mounted() {
    this.getData()
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>