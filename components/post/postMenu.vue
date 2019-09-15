<template>
  <div class="menu">
    <div class="menus_body" @mouseleave="handleClick(-1)">
      <div
        class="menu_item"
        v-for="(item,index) in menuList"
        :key="index"
        @mouseover="handleClick(index)"
      >
        <span class="menu_item_title title">{{item.type}}</span>
        <i class="el-icon-arrow-right arrow"></i>
      </div>
      <ul class="menu_item_info" v-show="current>0">
        <li v-for="(item2,index2) in menuList2" :key="index2">
          <nuxt-link :to="`/post?city=${item2.city}`">
            <i>{{index2 +1}}</i>
            <strong>{{item2.city}}</strong>
            <span>{{item2.desc}}</span>
          </nuxt-link>
          <!-- <a href @click="childMethod()">
            
          </a>-->
        </li>
      </ul>
    </div>
    <div class="aside_recommend">
      <h4>推荐城市</h4>
      <a href="#">
        <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt style="width:100%" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      menuList2: [],
      current: 0,
      isShow: 0
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取城市列表
    getData() {
      this.$axios({
        url: "/posts/cities"
      }).then(res => {
        console.log(res.data.data);
        this.menuList = res.data.data;
      });
    },
    //hover后触发的事件
    handleClick(index) {
      if (index >= 0) {
        this.current = index + 1;
        setTimeout(() => {
          this.menuList2 = this.menuList[this.current - 1].children;
        }, 10);
      }
      if (index < 0) {
        this.current = 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.active {
  display: none;
}
.menu {
  padding-right: 40px;
  .menus_body {
    border-top: 1px solid #ddd;
    .menu_item {
      height: 40px;
      line-height: 40px;
      border: 1px solid #ddd;
      border-top: none;
      padding: 0 20px;
      font-size: 14px;
      position: relative;
      z-index: 3;
      .arrow {
        position: absolute;
        right: 8px;
        top: 11px;
        font-size: 20px;
        color: #999;
      }
      &:hover {
        border-right: 1px solid rgba(255, 255, 255, 1);
      }
      &:hover .title {
        color: orange;
      }
      &:hover .arrow {
        color: orange;
      }
    }
    .menu_item_info2 {
      height: 40px;
      line-height: 40px;
      border: 1px solid #ddd;
      border-top: none;
      padding: 0 20px;
      font-size: 14px;
      position: relative;
      z-index: 2;
    }
    .menu_item_info {
      position: absolute;
      left: 259px;
      top: 0;
      width: 350px;
      padding: 10px 10px;
      box-sizing: border-box;
      background: #fff;
      border: 1px solid #ddd;
      z-index: 2;
      li {
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: orange;
        i {
          font-size: 24px;
          font-style: italic;
          vertical-align: top;
        }
        strong {
          margin: 0 10px;
          font-weight: normal;
          &:hover {
            text-decoration: underline;
          }
        }
        span {
          color: #999;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .aside_recommend {
    h4 {
      font-weight: 400;
      margin-top: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }
  }
}
</style>