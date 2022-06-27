<template>
  <div class="shopcart">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <div class="goodslist" v-if="cartData.length">
      <div
        class="goodsitem"
        v-for="item in cartData"
        :key="item.selectedSkuComb.id"
      >
        <van-swipe-cell
          ><van-card
            :num="item.selectedNum"
            :price="item.selectedSkuComb.price / 100"
            :desc="item.selectedSkuComb.desc"
            :title="item.selectedSkuComb.title"
            :thumb="item.selectedSkuComb.img" />
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="delClick(item.selectedSkuComb.id)"
            />
          </template>

          <label>
            <div class="checkbox">
              <input
                type="checkbox"
                v-model="checkedNames"
                :value="{
                  price: item.selectedSkuComb.price,
                  num: item.selectedNum,
                  id: item.selectedSkuComb.id,
                }"
                :name="item"
              /></div></label
        ></van-swipe-cell>
      </div>
    </div>

    <div v-else>
      <van-empty description="购物车空空如也哦😉">
        <van-button
          round
          type="danger"
          class="bottom-button"
          @click="emptyClick"
          >点此去发家致富</van-button
        >
      </van-empty>
    </div>

    <van-submit-bar :price="totalPrice" button-text="提交订单">
      <van-checkbox v-model="checked" @click="changeAllChecked"
        >全选</van-checkbox
      >
      <template #tip>
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      checkedNames: [],
      checkedArr: [],

      cartData: this.$store.state.cartData,
    };
  },
  created() {
    this.cartPrice();
    // console.log(this.checkedArr);
    // console.log(this.checkedNames);
    console.log(this.cartData);
  },
  computed: {
    totalPrice() {
      return this.checkedNames.reduce((add, cur) => {
        return add + cur.price * cur.num;
      }, 0);
    },
  },
  methods: {
    changeAllChecked() {
      if (this.checked) {
        this.checkedNames = this.checkedArr;
      } else {
        this.checkedNames = [];
      }
    },
    // price 数组
    cartPrice() {
      this.checkedArr = this.cartData.map((item) => {
        return {
          price: item.selectedSkuComb.price,
          num: item.selectedNum,
          id: item.selectedSkuComb.id,
        };
      });
    },

    emptyClick() {
      this.$router.push('/home');
    },
    // 删除购物车
    delClick(id) {
      console.log('---');
      this.$dialog
        .confirm({
          title: '嗨！',
          message: '确认删除？',
        })
        .then(() => {
          this.cartData = this.cartData.filter(
            (item) => item.selectedSkuComb.id !== id
          );
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    // 导航栏返回按钮
    onClickLeft() {
      this.$router.back();
    },
  },
  watch: {
    checkedNames: {
      handler() {
        if (this.checkedNames.length === this.checkedArr.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      },
    },
    // cartData: {
    //   handler() {
    //     this.$nextTick(() => {});
    //   },
    // },
  },
};
</script>

<style lang="less" scoped>
.shopcart {
  .goodsitem {
    position: relative;
    .checkbox {
      position: absolute;
      padding: 56px 0 0 320px;
      width: 100%;
      height: 88px;
      left: 0;
      top: 0;
      input[type='checkbox'] {
        display: block;
        width: 15px;
        height: 15px;
        border: 2px solid #999;
        border-radius: 50%;
      }
    }
  }
  .delete-button {
    height: 100%;
  }
}
</style>
