<template>
  <div class="tab">
      <div class="tab_menu">
          <span  v-for="(item,index) in ['新闻','体育','娱乐']" :key='index' @click="handleClick(index)"
          :class='{active: current===index}'>{{item}}</span>
      </div>
      <ul v-show="current === 0" >
          <li>假装我是个新闻</li>
          <li>假装我是个新闻</li>
          <li>假装我是个新闻</li>
      </ul>
      <ul v-show="current === 1" >
          <li>惊了~某小学深夜十二点竟传来湖人总冠军</li>
          <li>惊了~某小学深夜十二点竟传来湖人总冠军</li>
          <li>惊了~某小学深夜十二点竟传来湖人总冠军</li>
      </ul>
      <ul v-show="current === 2" >
          <li>2019年众明星陷入离婚风波，到底是不爱还是买卖</li>
          <li>2019年众明星陷入离婚风波，到底是不爱还是买卖</li>
          <li>2019年众明星陷入离婚风波，到底是不爱还是买卖</li>
      </ul>
  </div>
</template>

<script>
export default {
    data(){
        return{
            current:0
        }
    },
    methods:{
       handleClick(index) {
           this.current = index
       }
    }
}
</script>

<style lang="less" scoped>
    .tab_menu {
        margin-bottom: 20px;
        span {
            cursor: pointer;
        }
    }
    .active {
        color:red;
    }
</style>