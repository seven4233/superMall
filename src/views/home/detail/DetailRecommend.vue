<template>
  <div class="recommend">
    <div class="title">推荐商品</div>
    <div class="images">
      <div
        class="item"
        v-for="link in detail_recommends"
        :key="link.tradeItemId"
      >
        <img :src="link.image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['detail_recommends'],
};
</script>

<style lang="less" scoped>
.recommend {
  .title {
    padding: 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #000;
    font-style: italic;
    border-bottom: 1px solid #eee;
  }
  .images {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 10px;
    .item {
      padding: 10px;
      width: 50%;
      img {
        width: 100%;
        border-radius: 5px;
        box-shadow: 1px 1px 5px;
      }
    }
  }
}
</style>
