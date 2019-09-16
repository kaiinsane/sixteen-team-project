<template>
  <div class="postList">
    <div class="postList1" v-if="data.images.length>=3">
      <!-- 文章标题 -->
      <h4 class="post_title">
        <nuxt-link :to="`/post/detail?id=${data.id}`">{{data.title}}</nuxt-link>
      </h4>
      <!-- 文章内容 -->
      <!-- v-html 将内容解析成html-->
      <p class="post_content">
        <nuxt-link :to="`/post/detail?id=${data.id}`" v-html="data.summary"></nuxt-link>
      </p>

      <!-- 文章内容 -->
      <div class="post_img">
        <el-row type="flex" justify="space-between">
          <nuxt-link
            :to="`/post/detail?id=${data.id}`"
            v-for="(item,index) in data.images.slice(0,3)"
            :key="index"
          >
            <img :src="item" alt />
          </nuxt-link>
        </el-row>
      </div>
      <!-- 文章信息 -->

      <div class="post_info">
        <el-row type="flex" justify="space-between">
          <div class="post_info_left">
            <el-row type="flex" justify="space-between">
              <span>
                <i class="el-icon-location-outline"></i>
                {{data.cityName}}
              </span>
              <div class="post_user">
                <el-row type="flex" justify="space-between">
                  by
                  <a href>
                    <img :src="`${$axios.defaults.baseURL}`+data.account.defaultAvatar" alt class />
                  </a>
                  <a href>{{data.account.nickname}}</a>
                </el-row>
              </div>
              <span>
                <i class="el-icon-view"></i>
                {{data.watch}}
              </span>
            </el-row>
          </div>
          <span class="post-info-right" v-if="data.like">{{data.like}} 赞</span>
          <span class="post-info-right" v-if="!data.like">0 赞</span>
        </el-row>
      </div>
    </div>
    <div class="postList2" v-else>
      <el-row type="flex" justify="space-between">
        <div class="postList2_left">
          <!-- 文章内容 -->
          <div class="post_img">
            <el-row type="flex" justify="space-between">
              <nuxt-link
                :to="`/post/detail?id=${data.id}`"
                v-for="(item,index) in data.images.slice(0,1)"
                :key="index"
              >
                <img :src="item" alt />
              </nuxt-link>
            </el-row>
          </div>
        </div>
        <div class="postList2_right">
          <!-- 文章标题 -->
          <h4 class="post_title">
            <nuxt-link :to="`/post/detail?id=${data.id}`">{{data.title}}</nuxt-link>
          </h4>
          <!-- 文章内容 -->
          <!-- v-html 将内容解析成html-->
          <p class="post_content">
            <nuxt-link :to="`/post/detail?id=${data.id}`" v-html="data.summary"></nuxt-link>
          </p>
          <!-- 文章信息 -->
          <div class="post_info">
            <el-row type="flex" justify="space-between">
              <div class="post_info_left">
                <el-row type="flex" justify="space-between">
                  <span>
                    <i class="el-icon-location-outline"></i>
                    {{data.cityName}}
                  </span>
                  <div class="post_user">
                    <el-row type="flex" justify="space-between">
                      by
                      <a href>
                        <img
                          :src="`${$axios.defaults.baseURL}`+data.account.defaultAvatar"
                          alt
                          class
                        />
                      </a>
                      <a href>{{data.account.nickname}}</a>
                    </el-row>
                  </div>
                  <span>
                    <i class="el-icon-view"></i>
                    {{data.watch}}
                  </span>
                </el-row>
              </div>

              <span class="post-info-right" v-if="data.like">{{data.like}} 赞</span>
              <span class="post-info-right" v-if="!data.like">0 赞</span>
            </el-row>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      defaultL: ""
    }
  }
};
</script>

<style lang="less" scoped>
.postList {
  .postList1 {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    .post_title {
      overflow: hidden;
      text-overflow: ellipsis; //文本溢出隐藏,文本溢出时“...”显示,clip（不显示省略标记)
      white-space: nowrap; //文本不换行
      margin-bottom: 15px;
      font-weight: 400;
      font-size: 18px;
    }
    .post_content {
      margin-bottom: 15px;
      line-height: 1.5;
      font-size: 14px;
      height: 63px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .post_img {
      margin: 15px 0;
      img {
        width: 220px;
        height: 150px;
        object-fit: cover; //被替换的内容大小保持其宽高比，同时填充元素的整个内容框
      }
    }
    .post_info {
      .post_info_left {
        font-size: 12px;
        color: #999;
        span {
          margin-right: 10px;
        }
        .post_user {
          margin-right: 10px;
          img {
            display: block;
            width: 16px;
            height: 16px;
            border-radius: 100px;
            margin: 0 5px 5px 5px;
          }
        }
      }
      .post-info-right {
        color: orange;
      }
    }
  }
  .postList2 {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    .postList2_left {
      .post_img {
        img {
          width: 220px;
          height: 150px;
          object-fit: cover; //被替换的内容大小保持其宽高比，同时填充元素的整个内容框
          margin-right: 10px;
        }
      }
    }
    .postList2_right {
      width: 470px;
      .post_title {
        overflow: hidden;
        text-overflow: ellipsis; //文本溢出隐藏,文本溢出时“...”显示,clip（不显示省略标记)
        white-space: nowrap; //文本不换行
        margin-bottom: 15px;
        font-weight: 400;
        font-size: 18px;
      }
      .post_content {
        margin-bottom: 15px;
        line-height: 1.5;
        font-size: 14px;
        height: 63px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .post_info {
        .post_info_left {
          font-size: 12px;
          color: #999;
          span {
            margin-right: 10px;
          }
          .post_user {
            margin-right: 10px;
            img {
              display: block;
              width: 16px;
              height: 16px;
              border-radius: 100px;
              margin: 0 5px 5px 5px;
            }
          }
        }
        .post-info-right {
          color: orange;
        }
      }
    }
  }
}
</style>