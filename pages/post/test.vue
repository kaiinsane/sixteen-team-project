<template>
  <div class="container">
    <div class="comment">
      <Comment/>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/post/comment'
export default {
  components:{
    Comment
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .comment {
    margin:30px 0;
  }
}
</style>