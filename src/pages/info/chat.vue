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
const infoValue = ref<string>("");
const rowsValue = computed(() => {
  let n = 1;
  n = Math.ceil(infoValue.value.length / 18);
  console.log("n", n);
  if (n > 5) n = 5;
  return n;
});
const messages = ref<any[]>([]);
const socket = new WebSocket("ws://192.168.0.3:8080");
console.log("socket", socket);
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log("message", message);
  messages.value.push(message);
};
const sendInfo = () => {
  console.log("sendInfo", infoValue.value);
//   socket.onopen = function (event) {
    console.log("Connected to WebSocket server!");
    // 连接建立后，可以发送消息
    socket.send(JSON.stringify({ message: infoValue.value }));
//   };
};
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
