<template>
  <div class="body">
    <div class="card">
      <div class="imgBox">
        <img :src="item.avatar" alt="" />
      </div>
      <div class="content">
        <div class="details">
          <h2>
            {{ item.nickname }}<br />
            <p>{{ item.nativePlace }}</p>
          </h2>
          <div class="data">
            <h3>
              账号<br /><sub>{{ item.account }}</sub>
            </h3>
            <h3>
              年龄<br /><sub>{{ item.age }}</sub>
            </h3>
            <h3>
              性别<br /><sub>{{ sexDic[item.sex] }}</sub>
            </h3>
          </div>
          <div class="actionBtn">
            <button
              @click="Follow(item.account, item.isattention)"
              v-if="!item.isattention"
            >
              关注Ta
            </button>
            <button @click="Follow(item.account, item.isattention)" v-else>
              已关注
            </button>
            <button @click="addFriends(item)" :disabled="flag" v-if="item.isFriend==='no' || item.isFriends==='refuse'">添加好友</button>
            <button  v-else-if="item.isFriend==='pending'" disabled>等待同意</button>
            <button @click="addFriends(item)" v-else-if="item.isFriend==='agree'">聊天</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps,ref } from "vue";

defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["Follow","Friend"]);
const sexDic: any = {
  0: "男",
  1: "女",
  2: "其他",
};
let flag = ref<boolean>(false)
const Follow = (account: string, type: boolean) => {
  emit("Follow", account, !type);
  console.log("关注");
};
const addFriends = (item: any) => {

  emit("Friend", item)
  flag.value = true
};
</script>

<style scoped>
/* 设置整个页面为一个flex容器，居中对齐和垂直对齐 */

.body {
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  /*  background: linear-gradient(45deg, #6e7955, #006e54)*/
}

/* 设置卡片的基本样式 */
.card {
  z-index: 1;
  position: relative;
  width: 350px;
  height: 180px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 35px 80px rgba(243, 241, 241, 0.15);
  transition: 0.5s;
}

/* 当鼠标悬停在卡片上时，卡片高度会发生变化 */
.card:hover {
  height: 450px;
}

/* 设置图片框的基本样式 */
.imgBox {
  position: absolute;
  left: 50%;
  top: -50px;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  background: #ffffff69;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(218, 207, 207, 0.35);
  overflow: hidden;
  transition: 0.5s;
}

/* 当鼠标悬停在卡片上时，图片框的宽度和高度会发生变化 */
.card:hover .imgBox {
  width: 250px;
  height: 250px;
}

/* 设置图片的基本样式 */
.imgBox img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 设置卡片内容的基本样式 */
.card .content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
}

/* 设置卡片内容的详细信息 */
.card .content .details {
  padding: 40px;
  text-align: center;
  width: 100%;
  transition: 0.5s;
  transform: translateY(150px);
}

/* 当鼠标悬停在卡片上时，卡片内容会发生变化 */
.card:hover .content .details {
  transform: translateY(0px);
}

/* 设置卡片内容中标题的样式 */
.card .content .details h2 {
  font-size: 1.25em;
  font-weight: 600;
  color: #555;
  line-height: 1.2em;
}

/* 设置卡片内容中标题下的小段落的样式 */
.card .content .details h2 p {
  font-size: 0.75em;
  font-weight: 500;
  opacity: 0.5;
}

/* 设置卡片内容中详细信息的样式 */
.card .content .details .data {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

/* 设置卡片内容中详细信息中每个小标题的样式 */
.card .content .details .data h3 {
  width: 100px;
  padding: 0 auto;
  font-size: 1em;
  color: #555;
  line-height: 1.2em;
  font-weight: 600;
}

/* 设置卡片内容中详细信息中每个小标题下的小字体的样式 */
.card .content .details .data h3 sub {
  font-size: 0.85em;
  font-weight: 400;
  opacity: 0.5;
}

/* 设置卡片内容中操作按钮的样式 */
.card .content .details .actionBtn {
  display: flex;
  justify-content: space-between;
}

/* 设置卡片内容中操作按钮的样式 */
.card .content .details .actionBtn button {
  width: 120px;
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  outline-style: none;
  font-size: 1em;
  font-weight: 500;
  background: #0a6885;
  color: #fff;
  cursor: pointer;
}

/* This was made with GlassGenerator.netlify.app */
</style>
