<template>
  <div class="edit-info">
    <div class="glass-container" id="glass">
      <var-avatar src="../assets/1.jpg" size="100" :round="false" />

      <var-input
        style="width: 285px"
        placeholder="昵称："
        v-model="nickname"
        blur-color="#fff"
        focus-color="#fff"
      />
      <var-input
        style="width: 285px"
        placeholder="年龄："
        v-model="age"
        blur-color="#fff"
        focus-color="#fff"
      />
      <var-input
        style="width: 285px"
        placeholder="电话："
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

      <var-input
        style="width: 285px"
        placeholder="籍贯："
        v-model="native_place"
        blur-color="#fff"
        focus-color="#fff"
        @click="show_over"
        readonly
      />
    </div>
  </div>
</template>
<script setup lang="ts">
// import { getImg } from "../utile/index";
import { ref, getCurrentInstance } from "vue";
import area from "@varlet/ui/json/area.json";
const { proxy }: any = getCurrentInstance();
const nickname = ref<string>("");
const age = ref<string>("");
const phone = ref<string>("");
const sex = ref<number>(0);
const imgPath = ref<string>("192.168.255.174:5000/");
const native_place = ref<string>("");

const show_over = () => {
  proxy.$Picker({
    columns: area,
    selected: (val: any) => {
      native_place.value = val.map((item: any) => item).join("-");
    },
  });
};
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
  .var-input__input {
    color: #fff;
  }
  .var-radio-group__wrap {
    .var-radio-group {
      width: 300px;
      display: flex;
      justify-content: space-around;
    }
  }
  .var-cell {
    width: 285px;
    font-size: 16px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .var-cell__description {
    font-size: 16px;
    color: #fff;
  }
  .picker_live {
    position: fixed;
    bottom: 0;
    z-index: 9;
  }
}
</style>