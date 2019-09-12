<template>
  <div class="container">
      <el-row type="flex" justify="center" >
          <el-col :span="8">
            <el-slider v-model="price"></el-slider>
          </el-col>
          <el-col :span="4">
            
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      price:''
    }
  }
}
</script>

<style lang="less" scoped>

</style>