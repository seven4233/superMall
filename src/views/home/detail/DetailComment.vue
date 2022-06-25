<template>
  <div class="comment">
    <div class="title">
      <p>
        {{ `用户评价 ` }} <span>({{ rate.cRate }})</span>
      </p>
      <span>更多 <van-icon name="arrow" /></span>
    </div>
    <div class="comment-item" v-for="(item, index) in rate.list" :key="index">
      <div class="user-info">
        <div class="avatar">
          <img :src="item.user.avatar" alt="" />
        </div>
        <div class="user-name">{{ item.user.uname }}</div>
      </div>
      <div class="content">{{ item.content }}</div>
      <div class="style">
        <span class="time">{{ item.created | showDate }}</span>
        <span>{{ item.style }}</span>
      </div>
      <div class="picture">
        <div v-for="(link, index) in item.images" :key="index">
          <img :src="link" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  props: ['rate'],
  computed: {},
  filters: {
    showDate(value) {
      return dayjs(value * 1000).format('YYYY-MM-DD ');
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  padding: 0 0 20px 0;
  border-bottom: 10px solid #eee;
  .title {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid #ddd;
    p {
      color: #000;
      font-weight: 600;
      font-size: 18px;
    }
  }
  .comment-item {
    padding: 20px 10px 10px 10px;
    .user-info {
      display: flex;
      align-items: center;
      .avatar {
        width: 50px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .user-name {
        margin-left: 10px;
        font-size: 18px;
        font-weight: 600;
      }
    }
    .content {
      margin: 15px;
      color: #666;
    }
    .style {
      margin: 15px;
      font-size: 13px;
      color: #aaa;
      .time {
        margin-right: 10px;
      }
    }
    .picture {
      padding-left: 15px;
      div {
        display: inline-block;
        margin-right: 5px;
      }

      img {
        width: 50px;
      }
    }
  }
}
</style>
