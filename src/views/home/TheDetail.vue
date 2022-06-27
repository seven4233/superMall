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
      <detail-params
        :itemParamsInfo="itemParamsInfo"
        :itemParamsRule="itemParamsRule"
        id="params"
      ></detail-params>
      <!-- 详情页————评论 -->
      <detail-comment :rate="rate" id="comment"></detail-comment>
      <!-- 详情页————推荐 -->
      <detail-recommend
        :detail_recommends="detail_recommends"
        id="recommend"
      ></detail-recommend>
      <!-- 加入购物车  -->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-goods-action-icon
          @click="cartClick"
          icon="cart-o"
          text="购物车"
          :badge="badge"
        />
        <!-- 显示收藏状态 -->
        <van-goods-action-icon
          @click="collectClick"
          v-if="!collection"
          icon="star-o"
          text="收藏"
        />
        <!-- 显示收藏状态 -->
        <van-goods-action-icon
          @click="collectClick"
          v-else
          icon="star"
          text="已收藏"
          color="#ff5000"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="addCartClick"
        />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
      <van-sku
        ref="sku"
        v-model="show"
        :sku="sku"
        :goods="goods"
        :quota="quota"
        :quota-used="quotaUsed"
        :hide-stock="sku.hide_stock"
        :message-config="messageConfig"
        @add-cart="addCart"
      />
      <van-cell title="" value="" />
    </div>
  </div>
</template>

<script>
import { getDetail } from '@/api/detail';
import DetailGoods from './detail/DetailGoods.vue';
import DetailParams from './detail/DetailParams.vue';
import DetailComment from './detail/DetailComment.vue';
import DetailRecommend from './detail/DetailRecommend.vue';
export default {
  components: { DetailGoods, DetailParams, DetailComment, DetailRecommend },
  data() {
    return {
      active: 0,
      id: null,
      title: ['商品', '参数', '评论', '推荐'],
      show: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '款式', // skuKeyName：规格类目名称
            k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [],
            largeImageMode: true, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: '0', // 是否必填 '1' 表示必填
            placeholder: '', // 可选值，占位文本
            extraDesc: '', // 可选值，附加描述文案
          },
        ],
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 数据结构见下方文档
        picture: 'https://i.postimg.cc/0Q07T7yh/1.jpg',
      },
      messageConfig: {
        // 数据结构见下方文档
      },
      quota: 0,
      quotaUsed: 0,

      // 是否收藏
      collection: false,
      // 购物车数量
      badge: null,
    };
  },
  created() {
    // this.$nextTick(() => {
    this.id = this.$route.params.id;
    this.$store.dispatch('getDetail', { id: this.id });
    this.$store.dispatch('getRecommend');
    // });
    // sku详情列表
    getDetail(this.id).then((res) => {
      this.sku.price = res.data.result.skuInfo.defaultPrice.replaceAll('¥', '');
      this.sku.stock_num = res.data.result.skuInfo.totalStock;

      // const props = res.data.result.skuInfo.props;
      const skus = res.data.result.skuInfo.skus;
      console.log(res.data.result.skuInfo);
      skus.forEach((item) => {
        // this.sku.tree[index1].v[index2].name = item2.name;
        // this.sku.tree[index1].v[index2].id = item2.styleId;
        const v = {};
        const list = {};
        list.id = item.stockId;
        list.s1 = item.stockId;
        list.price = item.price;
        list.stock_num = item.stock;

        v.id = item.stockId;
        v.name = `${item.style} ${item.size}`;
        v.imgUrl = item.img;
        // 绑定购物车数据
        list.title = res.data.result.skuInfo.title;

        list.desc = v.name;
        list.img = v.imgUrl;

        this.sku.tree[0].v.push(v);
        this.sku.list.push(list);
      });

      // console.log(this.sku.tree);
    });
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
    itemParamsInfo() {
      return this.$store.getters['itemParamsInfo'];
    },
    itemParamsRule() {
      return this.$store.getters['itemParamsRule'];
    },
    rate() {
      return this.$store.getters['rate'];
    },
    detail_recommends() {
      return this.$store.getters['detail_recommends'];
    },
    skuInfo() {
      return this.$store.getters['skuInfo'];
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

    addCartClick() {
      this.show = true;
    },
    //加入购物车
    addCart(e) {
      this.$store.dispatch('cartData', e);
      this.$toast('加入购物车成功');
      this.badge += e.selectedNum;
      this.show = false;
    },
    // 切换收藏状态
    collectClick() {
      this.collection = !this.collection;
    },
    // 点击跳转到购物车
    cartClick() {
      this.$router.push('/shopcart');
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
    // margin-left: 30px;
    .van-tabbar-item {
      // width: 30px;
      font-size: 16px;
      .van-tabbar-item__text {
        font-size: 24px;
      }
    }
  }

  .van-tabbar-item--active {
    color: red !important;
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
    margin-bottom: 50px;
    height: 85vh;
    overflow: scroll;
  }
}
</style>
