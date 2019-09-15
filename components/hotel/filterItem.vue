<template>
  <div class="container">
    <el-row type="flex" justify="center" class="filter-row">
      <el-col :span="8" class="filter-list border-right">
        <el-row type="flex" justify="space-between">
          <el-col :span="20">价格</el-col>
          <el-col :span="4">0-4000</el-col>
        </el-row>
        <div class="slide">
          <el-slider v-model="price_in"></el-slider>
        </div>
      </el-col>
      <el-col :span="4" class="filter-list border-right">
        <p class="mb">住宿等级</p>
        <el-dropdown trigger="click" placement="bottom">
          <span class="el-dropdown-link" size="medium">
            <span style="display:inline-block;width:100px">不限</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in data.levels" :key="index">
              <el-radio  v-model="radio" :label="item.id" style="width:100px">
                {{item.name}}
              </el-radio>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4" class="filter-list border-right">
        <p class="mb">住宿类型</p>
         <el-dropdown trigger="click" placement="bottom">
          <span class="el-dropdown-link" size="medium">
            <span style="display:inline-block;width:100px">不限</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in data.types" :key="index">
              <el-radio  v-model="radio" :label="item.id" style="width:100px">
                {{item.name}}
              </el-radio>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4" class="filter-list border-right">
        <p class="mb">酒店设施</p>
         <el-dropdown trigger="click" placement="bottom">
          <span class="el-dropdown-link" size="medium">
            <span style="display:inline-block;width:100px">不限</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in data.assets" :key="index">
              <el-radio  v-model="radio" :label="item.id" style="width:100px">
                {{item.name}}
              </el-radio>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4" class="filter-list" style="padding:5px 20px;">
        <p class="mb">酒店品牌</p>
         <el-dropdown trigger="click" placement="bottom">
          <span class="el-dropdown-link" size="medium">
            <span style="display:inline-block;width:100px">不限</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="height:200px;overflow: scroll;">
            <el-dropdown-item v-for="(item,index) in data.brands" :key="index">
              <el-radio  v-model="radio" :label="item.id" style="width:100px">
                {{item.name}}
              </el-radio>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      price_in: 4000, //酒店价格
      hotellevel: [], // 酒店星级
      hoteltype: [], // 酒店类型
      hotelbrand: [], // 酒店品牌
      hotelasset: [], // 酒店设施
      // 住宿等级列表
      levelList: [{ label: "一星", value: "一星" }],
      // 选中状态
      radio:false
    };
  }
};
</script>

<style lang="less" scoped>
.container {
  font-size: 14px;
  color: #666;
}
.mb {
  margin-bottom: 10px;
}
.filter-row {
  border: 1px solid #ccc;
}
.filter-list {
  padding: 5px 20px;
}
.border-right {
  border-right: 1px solid #ccc;
  padding: 5px 20px;
}
/deep/ .el-input {
  padding: 10px 0 0;
}
</style>