<script setup lang="ts">
import { get, post } from "../../api/api";
import { ref, getCurrentInstance } from "vue";
import { getTime } from "../utile/index";
import { Dialog } from "@varlet/ui";
import { useRouter } from "vue-router";
import {getImg} from "../utile/index"
const router = useRouter();
const { proxy } = getCurrentInstance() as any;

// 消息列表
const infoList: any = ref([]);
const getInfo = () => {
  get("/getInfo", { id: localStorage.getItem("Id") }).then((res: any) => {
    if(res.data.length == 0) return;
    infoList.value = res.data[0].infoList;
  });
};
getInfo();
const checkInfo = (item: any) => {
  if (item.isRead) return;
  Dialog({
    title: item.type == 0 ? "系统消息" : "好友消息",
    message: `${item.sendNickName}（${item.sendAccount}）${item.content}`,
    dialogStyle: {
      backgroundColor: "rgba(0,0,0)",
    },
    confirmButtonText: "同意",
    cancelButtonText: "拒绝",
    confirmButtonTextColor: "#00bcd4",
    cancelButtonTextColor: "#fff",
    onConfirm: () => {
      post("/confirmFriend", {
        id: localStorage.getItem("Id"),
        sendAccount: item.sendAccount,
        type: true,
        infoId: item.infoId,
      }).then((res) => {
        proxy.$Toast({
          content: res.message,
        });
        getInfo();
      });
    },
    onCancel: () => {
      post("/confirmFriend", {
        id: localStorage.getItem("Id"),
        sendAccount: item.sendAccount,
        type: false,
      }).then((res) => {
        proxy.$Toast({
          content: res.message,
        });
        getInfo();
      });
    },
  });
};

const active: any = ref(0);
const changeFn = (val: any) => {
  active.value = val;
  if (val == 1) {
    getFriend();
  }
};
// 好友列表
const friendList: any = ref([]);
const getFriend = () => {
  get("/getFriends", { id: localStorage.getItem("Id") }).then((res) => {
    console.log(res);
    friendList.value = res.data;
  });
};

const goLink = (item: any) => {
  router.push({
    path: "/info/chat",
    state: item,
  });
};
</script>
<template>
  <div class="info">
    <var-tabs
      v-model:active="active"
      style="margin-top: 20px"
      color="rgba(255,255,255,0)"
      active-color="rgba(255,255,255)"
      @change="changeFn"
      :sticky="true"
    >
      <var-tab>消息</var-tab>
      <var-tab>好友</var-tab>
    </var-tabs>
    <div class="info-box" v-if="active == 0">
      <div
        class="glass-container"
        id="glass"
        v-for="(item, i) in infoList"
        :key="i"
        @click="checkInfo(item)"
      >
        <var-badge
          type="danger"
          value="new"
          :max-value="99"
          :offset-x="-30"
          :offset-y="20"
          style="z-index: 100"
          :hidden="item.isRead"
        >
          <div class="info-item">
            <div class="info-state" v-if="item.isRead">已处理</div>
            <div class="info-type">
              {{ item.type == 0 ? "系统消息" : "好友消息" }}
              <var-icon class="bell-icon" name="bell" size="14" />
            </div>
            <div class="info-content info-title">{{ item.content }}</div>
            <div class="info-time info-text">{{ getTime(item.time) }}</div>
            <div class="info-send info-text">
              来自：{{ item.sendNickName }}（{{ item.sendAccount }}）
            </div>
          </div>
        </var-badge>
      </div>
    <img src="src/assets/empty.png" style="width:200px;margin-top:50px"  alt="空" v-if="infoList.length===0">
    </div>
    <div v-else class="info-box">
      <div
        class="glass-container"
        id="glass"
        v-for="(item, i) in friendList"
        :key="i"
      >
        <div class="friend-box" @click="goLink(item)">
          <div class="friend-img">
            <var-avatar :src="item.avatar" size="70" />
          </div>
          <div class="friend-name">{{ item.nickName }}</div>
        </div>
      </div>
      <img src="src/assets/empty.png" style="width:200px;margin-top:50px"  alt="空" v-if="friendList.length===0">

    </div>
  </div>
</template>
<style lang="scss" scoped>
.info {
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.info-box {
  height: 100%;

  overflow: hidden;
  overflow-y: scroll;
  z-index: 1;
}
.glass-container {
  margin-top: 30px;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  background-color: rgba(250, 250, 250, 0.075);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  .info-item {
    padding: 10px 0;
    width: 350px;
    height: 100px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .info-state {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #aaa7a7;
  }
  .info-type {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    .bell-icon {
      position: absolute;
      top: 3px;
      right: -18px;
    }
  }
  .info-send {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .info-time {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
  .info-text {
    font-size: 12px;
    color: #e7e7e7;
  }
  .info-title {
    font-size: 20px;
    font-weight: 700;
  }
}
.friend-box {
  display: flex;
  width: 100%;

  .friend-img {
    margin: 0 20px;
    display: flex;
    align-items: center;
  }
}
</style>
