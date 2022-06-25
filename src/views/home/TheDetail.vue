<template>
  <div class="detail">
    <van-tabbar v-model="active" @change="tabClick">
      <van-tabbar-item>商品</van-tabbar-item>
      <van-tabbar-item>参数</van-tabbar-item>
      <van-tabbar-item>评价</van-tabbar-item>
      <van-tabbar-item>推荐</van-tabbar-item>
    </van-tabbar>
    <div class="content">
      <!-- 详情页————商品 -->
      <detail-goods
        :itemInfo="itemInfo"
        :shopInfo="shopInfo"
        :columns="columns"
        :detailInfo="detailInfo"
        id="goods"
      ></detail-goods>
      <!-- 详情页————参数 -->
      <detail-params :itemParams="itemParams" id="params"></detail-params>
      <!-- 详情页————评论 -->
      <detail-comment :rate="rate" id="comment"></detail-comment>
      <!-- 详情页————推荐 -->
      <detail-recommend
        :detail_recommends="detail_recommends"
        id="recommend"
      ></detail-recommend>
      <!-- 加入购物车  -->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
        <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
      <van-cell title="" value="" />
    </div>
  </div>
</template>

<script>
import DetailGoods from './detail/DetailGoods.vue';
import DetailParams from './detail/DetailParams.vue';
import DetailComment from './detail/DetailComment.vue';
import DetailRecommend from './detail/DetailRecommend.vue';
export default {
  components: { DetailGoods, DetailParams, DetailComment, DetailRecommend },
  data() {
    return {
      active: 0,
      title: ['商品', '参数', '评论', '推荐'],
    };
  },
  created() {
    this.id = this.$route.params.id;

    this.$store.dispatch('getDetail', { id: this.id });
    this.$store.dispatch('getRecommend');
  },
  computed: {
    itemInfo() {
      return this.$store.getters['itemInfo'];
    },
    shopInfo() {
      return this.$store.getters['shopInfo'];
    },
    columns() {
      return this.$store.getters['columns'];
    },
    detailInfo() {
      return this.$store.getters['detailInfo'];
    },
    itemParams() {
      return this.$store.getters['itemParams'];
    },
    rate() {
      return this.$store.getters['rate'];
    },
    detail_recommends() {
      return this.$store.getters['detail_recommends'];
    },
  },
  methods: {
    tabClick(index) {
      if (index === 0) {
        document
          .querySelector('#goods')
          .scrollIntoView({ block: 'start', behavior: 'smooth' });
      } else if (index === 1) {
        document
          .querySelector('#params')
          .scrollIntoView({ block: 'start', behavior: 'smooth' });
      } else if (index === 2) {
        document
          .querySelector('#comment')
          .scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else if (index === 3) {
        document
          .querySelector('#recommend')
          .scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      // console.log(document.querySelector(`#${position}`));
    },

    onClickIcon() {
      this.$toast('点击图标');
    },
    onClickButton() {
      this.$toast('点击按钮');
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  // overflow: hidden;
  .van-tabbar {
    position: fixed;
    top: 0;
    left: 0;
    .van-tabbar-item {
      font-size: 18px;

      .van-tabbar-item__text {
        display: block;
        padding-bottom: 10px;
      }
    }
  }

  .van-tabbar-item--active {
    color: red !important;
    padding: 0 10px;
    &::after {
      content: '';
      width: 50%;
      // height: 2px;
      margin-top: 5px;
      // background: red;
      border-bottom: 5px solid red;
      border-radius: 5px;
    }
  }
  .content {
    margin-top: 50px;
    height: 85vh;
    overflow: scroll;
  }
}
</style>
