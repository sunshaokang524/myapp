<template>
  <div class="AI">
    <titleBar :round="false" title="聊天" style="width: 100%"></titleBar>
    <div class="info-list" style="z-index: 10" ref="chatBox">
      <div v-for="(item, i) in AiList" :key="i">
        <div class="info-item right-info" v-if="item.type === 'AI'">
          <div style="margin-right: 8px">
            <div class="info-name">机器人</div>
            <div class="info-text">{{ item.message }}</div>
            <div class="info-time">{{ item.createTime }}</div>
          </div>
          <!-- <var-avatar :src="myItem.avatar" size="60" /> -->
        </div>
        <div class="info-item left-info" v-else>
          <!-- <var-avatar :src="targetItem.avatar" size="60" /> -->
          <div style="margin-left: 8px">
            <div class="info-name">我</div>
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
        v-model="inputInfo"
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

<script setup>
import * as base64 from "base-64";
import CryptoJs from "crypto-js";
import { ref, computed, onUpdated } from "vue";
const rowsValue = computed(() => {
  let n = 1;
  n = Math.ceil(inputInfo.value.length / 18);
  if (n > 5) n = 5;
  return n;
});
let requestObj = {
  APPID: "4c13f3ff",
  APISecret: "YzI0YWU4OTdjMDdlYjFiMDFiYTFhMWY2",
  APIKey: "b4bd64c1bed74c51a500a76a1ca7632f",
  Uid: "red润",
  sparkResult: "",
};
const inputInfo = ref("");
// 点击发送信息按钮
const sendInfo = (e) => {
  AiList.value.push({
    message: inputInfo.value,
    createTime: new Date().toLocaleString(),
    type: "my",
  });
  sendMsg();
};

// 发送消息
const AiList = ref([]);
const myList = ref([]);
const sendMsg = async () => {
  // 获取请求地址
  let myUrl = await getWebsocketUrl();
  // 获取输入框中的内容
  let inputVal = inputInfo.value;
  console.log(inputVal);
  // 每次发送问题 都是一个新的websocketqingqiu
  let socket = new WebSocket(myUrl);

  // 监听websocket的各阶段事件 并做相应处理
  socket.addEventListener("open", (event) => {
    console.log("开启连接！！", event);
    // 发送消息
    let params = {
      header: {
        app_id: requestObj.APPID,
        uid: "redrun",
      },
      parameter: {
        chat: {
          domain: "generalv3.5",
          temperature: 0.5,
          max_tokens: 2048,
        },
      },
      payload: {
        message: {
          // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
          // 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
          text: [
            //# AI的历史回答结果
            // ....... 省略的历史对话
            { role: "user", content: inputVal }, //# 最新的一条问题，如无需上下文，可只传最新一条问题
          ],
        },
      },
    };
    console.log("发送消息");
    socket.send(JSON.stringify(params));
  });
  let str = "";
  socket.addEventListener("message", (event) => {
    let data = JSON.parse(event.data);
    console.log("收到消息！！", data);
    // requestObj.sparkResult += data.payload.choices.text[0].content
    if (data.header.code !== 0) {
      console.log("出错了", data.header.code, ":", data.header.message);
      // 出错了"手动关闭连接"
      socket.close();
    }

    if (data.header.code === 0) {
      // 对话已经完成
      str += data.payload.choices.text[0].content;
      if (data.payload.choices.text.length > 0 && data.header.status === 2) {
        AiList.value.push({
          message: str,
          createTime: new Date().toLocaleString(),
          type: "AI",
        });
        console.log("对话已经完成", str);
      }
    }
    // addMsgToTextarea(requestObj.sparkResult);
  });
  socket.addEventListener("close", (event) => {
    console.log("连接关闭！！", event);
    // 对话完成后socket会关闭，将聊天记录换行处理
    // requestObj.sparkResult = requestObj.sparkResult + "&#10;"
    // addMsgToTextarea(requestObj.sparkResult);
    // 清空输入框
    // questionInput.value = ''
  });
  socket.addEventListener("error", (event) => {
    console.log("连接发送错误！！", event);
  });
};
// 鉴权url地址
const getWebsocketUrl = () => {
  return new Promise((resovle, reject) => {
    let url = "wss://spark-api.xf-yun.com/v3.5/chat";
    let host = "spark-api.xf-yun.com";
    let apiKeyName = "api_key";
    let date = new Date().toGMTString();
    let algorithm = "hmac-sha256";
    let headers = "host date request-line";
    let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v3.5/chat HTTP/1.1`;
    let signatureSha = CryptoJs.HmacSHA256(
      signatureOrigin,
      requestObj.APISecret
    );
    let signature = CryptoJs.enc.Base64.stringify(signatureSha);

    let authorizationOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;

    let authorization = base64.encode(authorizationOrigin);

    // 将空格编码
    url = `${url}?authorization=${authorization}&date=${encodeURI(
      date
    )}&host=${host}`;

    resovle(url);
  });
};
/** 将信息添加到textare中
    在textarea中不支持HTML标签。
    不能使用
    标签进行换行。
    也不能使用\r\n这样的转义字符。

    要使Textarea中的内容换行，可以使用&#13;或者&#10;来进行换行。
    &#13;表示回车符；&#10;表示换行符；
*/

const addMsgToTextarea = (text) => {
  AiList.value.push(text);
};
const chatBox = ref(null);
onUpdated(() => {
  chatBox.value.scrollTop = chatBox.value.scrollHeight;
  console.log(chatBox.value.scrollHeight, "滚动条滚动到底部");
});
</script>

<style lang="scss" scoped>
.AI {
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
    color: #fff;
    height: 500px;
    overflow-y: scroll;
    margin: 10px;

    width: 100%;

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
