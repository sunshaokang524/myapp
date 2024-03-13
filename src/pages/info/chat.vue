<template>
  <div class="chat">
    <titleBar :round="false" title="聊天" style="width: 100%"></titleBar>
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
import { ref, computed } from "vue";
// import {post} from '../../../api/api'
import io from 'socket.io-client';
const infoValue = ref<string>("");
  const chatList = ref([]);
const rowsValue = computed(() => {
  let n = 1;
  n = Math.ceil(infoValue.value.length / 18);
  console.log("n", n);
  if (n > 5) n = 5;
  return n;
});
let socket = io('http://192.168.0.3:3001'); // 连接后端的 socket.io 方法里面传服务端的ip
      socket.on('connect', () => {
        console.log(socket.id, '监听客户端连接成功-connect');
      });
      socket.on('fresh-message', (data) => {
        // 自定义一个事件来获取，服务端推送回来的消息列表
        chatList.value = data;
        console.log(chatList.value, '监听客户端连接成功-fresh-message');
      });


      const account = history.state.account;
    const sendInfo = () => {
      // 发送消息，通过自定义事件 send-message
      socket.emit('send-message', account, infoValue.value);
      // chatMsg.value = '';
    };


// const messages = ref<any[]>([]);

// const sendInfo = () => {
  
// };
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
}
</style>
