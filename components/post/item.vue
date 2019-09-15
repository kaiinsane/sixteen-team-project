<template>
  <div class="item">
    <item v-if="item.parent" :item="item.parent"/>
    <div class="head">
      <span class="name">{{item.account.nickname}}</span>
      <span class="time">{{item.updated_at}}</span>
    </div>
    <div class="comment">
      <p>{{item.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "item",
  // 父传子
  props: {
    item: {
      type: Object,
      dafault: {}
    }
  }
};
</script>

<style>
</style>