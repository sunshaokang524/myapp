<template>
  <div class="edit">
    <titleBar :round="false" title="发布动态"></titleBar>
    <div class="glass-container" id="glass">
      <div class="upload-img">
        <var-uploader
          v-model="imgPath"
          @after-read="handleAfterRead"
          maxlength="9"
          class="uploader"
        >
        </var-uploader>
      </div>

      <var-input
        text-color="#fff"
        style="width: 100%"
        focus-color="#fff"
        variant="outlined"
        placeholder="动态"
        textarea
        v-model="textValue"
      />
      <div class="button1">
        <div>发布动态</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
let timer: any;
const imgPath = ref<any>([]);
const textValue = ref<string>("");

const handleAfterRead = (file: any) => {
  file.state = "loading";

  timer = window.setInterval(() => {
    if (file.progress === 100) {
      window.clearInterval(timer);
      file.state = "success";
      return;
    }

    file.progress += 10;
  }, 250);
};
</script>

<style lang="scss" scoped>
.edit {
  width: 100%;
  height: 100%;
  background: url(../../assets/bg4.jpeg) 100% 100% no-repeat;
  background-size: cover;

  .glass-container {
    margin: 20px;
    margin-top: 10px;
    padding: 10px 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: auto;
    height: 570px;
    color: white;
    display: flex;
    //   justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    background-color: rgba(148, 157, 161, 0.075);
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  }
  .upload-img {
    width: 100%;
    min-height: 200px;
    border: 2px solid white;
    border-radius: 5px;

    .var-uploader__file-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
  .button1 {
    position: relative;
    height: 30px;
    width: 200px;
    text-align: center;
    line-height: 30px;
    color: #ffffff;
    cursor: pointer;
    /* transition: 0s background-color; */
    /* 倒影 */
    -webkit-box-reflect: below 0 -webkit-linear-gradient(transparent, transparent
          30%, rgba(255, 255, 255, 0.3));
    transition: all 0.3s linear;
  }

  .button1::before,
  .button1::after {
    content: "";
    position: absolute;
    height: 15px;
    width: 15px;
    /* transition-delay: 2s; */
    transition: all 0.3s linear 0.4s;
  }

  .button1::after {
    border-top: 4px solid #ffffff;
    border-left: 4px solid #ffffff;
    top: -2px;
    left: -2px;
  }

  .button1::before {
    border-bottom: 4px solid #ffffff;
    border-right: 4px solid #ffffff;
    bottom: -2px;
    right: -2px;
  }

  .button1:hover::before,
  .button1:hover::after {
    height: 100%;
    width: 100%;
    transition: all 0.3s ease-in;
  }

  .button1:hover {
    transition: all 0.3s ease-in;
    transition-delay: 0.4s;
    color: rgb(11, 0, 58);
    box-shadow: 0px 0px 60px #ffffff;
    background-color: #ffffff;
  }

  @keyframes button1-boder {
    from {
      height: 30px;
      width: 30px;
      transition: all 0.5s ease-in;
    }
    to {
      height: 100%;
      width: 100%;
      transition: all 0.5s ease-in;
    }
  }
}
</style>
