<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="购物街" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="24" />
      </template>
    </van-nav-bar>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="image in banners" :key="image.image">
        <img :src="image.image" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 今日推荐 -->
    <the-recommend :recommend="recommends"></the-recommend>
  </div>
</template>

<script>
import { NavBar, Swipe, SwipeItem, Icon } from "vant";
import TheRecommend from "@/views/home/TheRecommend";
export default {
  name: "TheHome",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    TheRecommend,
  },
  data() {
    return {};
  },
  computed: {
    banners() {
      return this.$store.getters["banners"];
    },
    recommends() {
      return this.$store.getters["recommends"];
    },
  },

  methods: {
    // getHomeData() {
    //   getHomeData().then((res) => {
    //     console.log(res.data.data);
    //     this.banners = res.data.data.banner.list;
    //     this.recommend = res.data.data.recommend.list;
    //   });
    // },
  },
};
</script>

<style>
img {
  width: 100%;
  height: 100%;
}
</style>
