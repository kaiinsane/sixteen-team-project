<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="right">
        <!-- 文章详情 -->
        <PostArtile />
        <!-- 文章分享 -->
        <PostShare />
      </div>

      <!-- 文章列表 -->
      <div class="left">
        <PostRelat />
      </div>
    </el-row>
  </div>
</template>

<script>
import PostRelat from "@/components/post/postRelative.vue";
import PostArtile from "@/components/post/postArtile.vue";
import PostShare from "@/components/post/postShare.vue";
export default {
  components: {
    PostRelat,
    PostArtile,
    PostShare
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .comment {
    margin: 30px 0;
  }
  .right {
    width: 700px;
  }
  .left {
    width: 300px;
  }
}
</style>