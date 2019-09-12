<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item,index) in airSizeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      dataList: [],
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      airSizeList: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ]
    };
  },
  watch: {
    airport() {
      this.changeChoose();
    },
    flightTimes() {
      this.changeChoose();
    },
    company() {
      this.changeChoose();
    },
    airSize() {
      this.changeChoose();
    }
  },
  methods: {
    // 封装一个筛选过滤条件的方法
    changeChoose() {
      this.dataList = this.data.flights;
      if (this.airport) {
        this.dataList = this.dataList.filter(e => {
          return e.org_airport_name === this.airport;
        });
      }
      if (this.flightTimes) {
        const [from, to] = this.flightTimes.split(",");
        this.dataList = this.dataList.filter(e => {
          let current = e.dep_time.split(":")[0];
          return +current >= +from && +current < +to;
        });
      }
      if (this.company) {
        this.dataList = this.dataList.filter(e => {
          return e.airline_name === this.company;
        });
      }
      if (this.airSize) {
        this.dataList = this.dataList.filter(e => {
          return e.plane_size === this.airSize;
        });
      }
      this.$emit("changeDataList", this.dataList);
    },
    // 选择机场时候触发
    handleAirport(value) {
      // let arr = this.data.flights.filter(e => {
      //   return e.org_airport_name === value;
      // });
      // this.$emit("changeDataList", arr);
      this.airport = value;
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // const [from, to] = value.split(",");
      // let arr = this.data.flights.filter(e => {
      //   let current = e.dep_time.split(":")[0];
      //   return +current >= +from && +current < +to;
      // });
      // this.$emit("changeDataList", arr);
      this.flightTimes = value
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // let arr = this.data.flights.filter(e => {
      //   return e.airline_name === value;
      // });
      // this.$emit("changeDataList", arr);
      this.company = value
    },

    // 选择机型时候触发
    handleAirSize(value) {
      // let arr = this.data.flights.filter(e => {
      //   return e.plane_size === value;
      // });
      // this.$emit("changeDataList", arr);
      this.airSize = value
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = ""; // 机场
      this.flightTimes = ""; // 出发时间
      this.company = ""; // 航空公司
      this.airSize = ""; // 机型大小
      this.$emit("changeDataList", this.data.flights);
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>