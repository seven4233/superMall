<template>
  <div>
    <div class="detail-info">
      <h2 class="title">{{ `【${shopInfo.name}】${itemInfo.title}` }}</h2>

      <div class="price">
        <span class="now">{{ itemInfo.price }}</span>

        <span class="old"
          >{{ itemInfo.oldPrice }}
          <van-tag round type="danger" size="large" color="rgb(255, 103, 123)"
            >活动价</van-tag
          >
        </span>
      </div>
      <div class="info">
        <p>{{ columns[0] }}</p>
        <p>{{ columns[1] }}</p>
        <p>72小时发货</p>
      </div>
    </div>
    <div class="ensure">
      <p><van-icon name="passed" /><span>退货补运费</span></p>
      <p><van-icon name="passed" /><span>全国包邮</span></p>
      <p><van-icon name="passed" /><span>7天无理由退货</span></p>
    </div>

    <div class="shoplogo">
      <img :src="shopInfo.shopLogo" alt="" />
      <div class="cSells">
        <p>{{ totalSell }}万</p>
        <span>总销量</span>
      </div>
      <div class="cGoods">
        <p>{{ shopInfo.cGoods }}</p>
        <span>全部宝贝</span>
      </div>
    </div>
    <!-- 评分 -->
    <div class="rate">
      <div
        class="rate-item"
        v-for="(item, index) in shopInfo.score"
        :key="index"
      >
        <span>{{ item.name }}</span>
        <div class="score">
          <span :class="{ green: !item.isBetter, red: item.isBetter }"
            >{{ item.score }}
            <van-tag :class="{ bg_green: !item.isBetter }">{{
              `${item.isBetter ? '高' : '低'}`
            }}</van-tag>
          </span>
        </div>
        <van-rate v-model="item.score" allow-half />
      </div>
      <a :href="shopInfo.shopUrl">
        <van-button type="primary" block round color="rgb(241, 245, 249)"
          >进店逛逛</van-button
        ></a
      >
    </div>

    <!-- 详情 -->
    <div class="details">
      <van-progress inactive :percentage="30" />
      <p class="detail-desc">{{ detailInfo.desc }}</p>
      <!-- <div v-for="(link, index) in item.list" :key="index">
          <img :src="link" alt="" />
        </div> -->
    </div>
    <van-cell title="单元格" value="内容">
      <template #value>
        <van-tag type="danger">标签</van-tag>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: ['itemInfo', 'shopInfo', 'columns', 'detailInfo'],
  data() {
    return {};
  },
  mounted() {},
  computed: {
    totalSell() {
      return (this.shopInfo.cSells / 10000).toFixed(1);
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.detail-info {
  height: 200px;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  .title {
    height: 62px;
    font-size: 18px;
    font-weight: 600;
    text-indent: 1em;
    color: #444;
  }
  .price {
    height: 50px;
    margin: 10px 0 0 0;
    line-height: 50px;
    .now {
      margin-right: 10px;
      font-size: 22px;
      color: rgb(255, 103, 123);
    }
    .old {
      position: relative;

      text-decoration: line-through;
      display: inline-block;
      width: 150px;
      height: 50px;
      .van-tag {
        position: absolute;
        right: 30px;
        bottom: 14px;
      }
    }
  }
  .info {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    color: #aaa;
  }
}

.ensure {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0 10px 20px 10px;
  color: #000;
  border-bottom: 10px solid #eee;
  font-weight: 600;
  .van-icon {
    font-weight: 700;
    margin-right: 1px;
  }
}

.shoplogo {
  display: flex;
  border-bottom: 10px solid #eee;
  img {
    width: 50%;
    padding: 10px;
    border-radius: 50%;
  }
  .cSells,
  .cGoods {
    width: 25%;
    padding: 20px 10px 20px 10px;
    text-align: center;
    border-left: 5px solid #eee;
    // line-height: 93px;
    p {
      height: 30px;
      margin-top: 50px;
      font-size: 18px;
    }
  }
}
.rate {
  padding: 10px 0 20px 0;
  border-bottom: 10px solid #eee;
  .rate-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 44px;
    border-bottom: 1px solid #eee;
    span {
      color: #000;
    }
    .score {
      position: relative;
      width: 60px;

      .van-tag {
        position: absolute;
        right: 0;
        bottom: 1px;
        background: red;
        color: white;
      }
    }
  }
  .van-button {
    margin: 20px auto 0;
    width: 50%;
    span {
      color: #333;
      font-size: 22px;
      font-weight: 600;
    }
  }
}
.details {
  .detail-desc {
    padding: 30px 10px 20px 10px;
    font-size: 14px;
    color: #000;
  }
}

.green {
  color: green !important;
}
.red {
  color: red !important;
}
.bg_green {
  background: green !important;
}
</style>
