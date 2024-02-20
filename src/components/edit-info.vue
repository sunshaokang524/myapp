<template>
  <div class="edit-info">
    <div class="glass-container" id="glass">
      <var-avatar :src="getImg('src/assets/1.jpg')" size="large" />
      <var-input
        style="width: 285px"
        placeholder="昵称"
        v-model="nickname"
        blur-color="#fff"
        focus-color="#fff"
      />
      <var-input
        style="width: 285px"
        placeholder="年龄"
        v-model="age"
        blur-color="#fff"
        focus-color="#fff"
      />
      <var-input
        style="width: 285px"
        placeholder="电话"
        v-model="phone"
        blur-color="#fff"
        focus-color="#fff"
      />
      <var-radio-group v-model="sex" style="color: #fff">
        <var-radio
          :checked-value="0"
          unchecked-color="#fff"
          checked-color="#fff"
          >男</var-radio
        >
        <var-radio
          :checked-value="1"
          unchecked-color="#fff"
          checked-color="#fff"
          >女</var-radio
        >
        <var-radio
          :checked-value="2"
          unchecked-color="#fff"
          checked-color="#fff"
          >其他</var-radio
        >
      </var-radio-group>
      <var-cell border  description="描述">这是单元格</var-cell>

    </div>
  </div>
</template>
<script setup lang="ts">
import { getImg } from "../utile/index";
import { ref } from "vue";
const nickname = ref<string>("");
const age = ref<string>("");
const phone = ref<string>("");
const sex = ref<number>(0);
</script>

<style lang="scss">
.edit-info {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .glass-container {
    margin-top: 60px;
    padding: 20px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 500px;
    color: white;
    display: flex;
    //   justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 191, 255, 0.075);
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  }
  .var-cell {
    color: #fff;
  }
  .var-radio__text {
    color: #fff;
  }
  .var-radio-group__wrap {
    .var-radio-group {
      width: 300px;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>