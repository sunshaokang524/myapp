<template>
  <div class="chat">
    <titleBar :round="false" title="聊天" style="width: 100%"></titleBar>
    <div class="info-list" style="z-index: 10" ref="chatBox">
      <div v-for="(item, i) in chatList" :key="i">
        <div
          class="info-item right-info"
          v-if="myItem.account === item.myAccount"
        >
          <div style="margin-right: 8px">
            <div class="info-name">{{ myItem.nickname }}(我)</div>
            <div class="info-text">{{ item.message }}</div>
            <div class="info-time">{{ item.createTime }}</div>
          </div>
          <var-avatar :src="myItem.avatar" size="60" />
        </div>
        <div class="info-item left-info" v-else>
          <var-avatar :src="targetItem.avatar" size="60" />
          <div style="margin-left: 8px">
            <div class="info-name">{{ targetItem.nickname }}</div>
            <div class="info-text">{{ item.message }}</div>
            <div class="info-time">{{ item.createTime }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="input-box">
      <var-input
        :rows="rowsValue ? rowsValue : 1"
        placeholder="请输入聊天内容"
        textarea
        v-model="infoValue"
        variant="outlined"
      >
        <template #append-icon>
          <var-button text outline type="primary" @click.prevent="sendInfo"
            >发送</var-button
          >
        </template>
      </var-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount,onUpdated } from "vue";
import { post } from "../../../api/api";
import io from "socket.io-client";
const infoValue = ref<string>("");
const chatList: any = ref([]);
const targetItem = ref<any>({});
const myItem = ref<any>({});
const chatBox = ref<any>(null);
const rowsValue = computed(() => {
  let n = 1;
  n = Math.ceil(infoValue.value.length / 18);

  if (n > 5) n = 5;
  return n;
});
const targetAccount = history.state.account;

const myAccount = localStorage.getItem("Account");
let socket = io("http://120.53.240.109:3005"); // 连接后端的 socket.io 方法里面传服务端的ip
socket.on("connect", () => {
  // 监听客户端连接成功
  console.log(socket.id, "监听客户端连接成功-connect");
});
// 向服务器发送请求，获取目标账户和自身账户的物品信息
post("/goLink", {
  myAccount: localStorage.getItem("Account"),
  targetAccount: targetAccount,
}).then((res: any) => {
  // 将获取到的目标账户和自身账户的物品信息赋值给对应的变量
  targetItem.value = res.data.targetItem;
  myItem.value = res.data.myItem;
  console.log(res.data, "连接成功");
});
socket.on("fresh-message", (data) => {
  // 自定义一个事件来获取，服务端推送回来的消息列表
  console.log(data, "监听客户端连接成功-fresh-message");
  let arr = data.filter((item: any) => {
    return (
      (item.myAccount === localStorage.getItem("Account") &&
        item.targetAccount === targetAccount) ||
      (item.targetAccount === localStorage.getItem("Account") &&
        item.myAccount === targetAccount)
    );
  });
console.log(arr, "arr");
  chatList.value = arr;
  console.log(chatBox.value.scrollHeight, "滚动条滚动到底部")
});
onBeforeUnmount(() => {
  socket.disconnect();
});

const sendInfo = () => {
  // 发送消息，通过自定义事件 send-message
  socket.emit("send-message", targetAccount, myAccount, infoValue.value);
};

onUpdated(() => {
  chatBox.value.scrollTop = chatBox.value.scrollHeight
  console.log(chatBox.value.scrollHeight, "滚动条滚动到底部")
})
</script>

<style lang="scss" scoped>
.chat {
  width: 100%;
  height: 100%;

  background: url(../../assets/bg4.jpeg) 100% 100% no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .input-box {
    position: absolute;
    bottom: 10px;
    width: 90%;
    margin: 0 10px;
    max-height: 200px;
  }
  .info-list {
    //  background-color: #fff;
    color: #fff;
    height: 500px;
    overflow-y: scroll;
    margin: 10px;
    //  padding: 0 10px;
    width: 100%;
    // transition: transform 2s ease-out; /* 定义过渡效果 */
    .info-item {
      margin: 0 20px;
      margin-top: 30px;

      .info-name {
        font-size: 12px;
      }
      .info-time {
        font-size: 12px;
      }
      .info-text {
        font-size: 20px;
        color: black;
        border-radius: 5px 20px 20px 5px;
        max-width: 200px;
        word-break: break-all;
        display: inline-block;
        padding: 8px 15px;
      }
    }
    .left-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .info-text {
        font-size: 20px;
        color: black;
        background-color: #94fafa;
        border-radius: 5px;
      }
    }
    .right-info {
      display: flex;
      justify-content: flex-end;
      text-align: right;
      align-items: center;
      .info-text {
        font-size: 20px;
        color: black;
        background-color: rgb(97, 216, 151);
        border-radius: 5px;
      }
    }
  }
}
</style>
