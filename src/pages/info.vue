<script setup lang="ts">
import { get, post } from "../../api/api";
import { ref,getCurrentInstance } from "vue";
import { getTime } from "../utile/index";
import { Dialog } from "@varlet/ui";
const {proxy} = getCurrentInstance() as any

// 消息列表
const infoList: any = ref([]);
const getInfo = () => {
  get("/getInfo", { id: localStorage.getItem("Id") }).then((res: any) => {
    infoList.value = res.data[0].infoList;
  });
};
getInfo()
const checkInfo = (item: any) => {
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
        })
        getInfo()
      });
      console.log("同意", item);
    },
    onCancel: () => {
      post("/confirmFriend", {
        id: localStorage.getItem("Id"),
        sendAccount: item.sendAccount,
        type: false,
      }).then((res) => {
        proxy.$Toast({
            content: res.message,
        })
        getInfo()
      });
      console.log("拒绝", item);
    },
  });
};
// 好友列表
</script>
<template>
  <div class="info">
    <div class="info-box" v-if="infoList.length > 0">
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
    </div>
  </div>
</template>
<style lang="scss" scoped>
.info {
  display: flex;
  justify-content: center;
}
.info-box {
  height: 100vh;

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
</style>
