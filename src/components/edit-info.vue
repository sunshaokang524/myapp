<template>
  <div class="edit-info">
    <div class="glass-container" id="glass">
      <var-uploader
        v-model="imgPath"
        @after-read="handleAfterRead"
        maxlength="1"
      ></var-uploader>

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
      <div id="frozen-btn">
        <button class="green" @click="take_off">提交</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// import { getImg } from "../utile/index";
import { ref, getCurrentInstance, onUnmounted } from "vue";
import area from "@varlet/ui/json/area.json";
import { post } from "../../api/api";
const { proxy }: any = getCurrentInstance();
const nickname = ref<string>("");
const age = ref<string>("");
const phone = ref<string>("");
const sex = ref<number>(0);
const imgPath = ref<any>([]);
const native_place = ref<string>("");
const show_over = () => {
  console.log(111,area);
  proxy.$Picker({
    columns: area,
    selected: (val: any) => {
      native_place.value = val.map((item: any) => item).join("-");
    },
  });
};
let timer: any;
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
  console.log(file);
};
const take_off = () => {
  let params = {
    nickname: nickname.value,
    age: age.value,
    phone: phone.value,
    sex: sex.value,
    nativePlace: native_place.value,
    avatar: imgPath.value[0].url,
    id: window.localStorage.getItem("Id"),
    account: window.localStorage.getItem("Account"),
  };
  console.log(params);
  post("/personInfo", params).then((res: any) => {
    getInfo(res.data.id)
    console.log(res);
  });
 
};
const getInfo = (id:any)=>{
    emit('getInfo',id)
  }
  const emit = defineEmits(["getInfo"]);
onUnmounted(() => {
  window.clearInterval(timer);
});
</script>

<style lang="scss">
.edit-info {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .glass-container {
    margin-top: 30px;
    padding: 20px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 580px;
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
  .var-uploader__file-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  #frozen-btn {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 300px;
  }

  button {
    border: 0;
    margin: 20px;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: bold;
    padding: 15px 50px;
    border-radius: 50px;
    color: white;
    outline: none;
    position: relative;
  }

  button:before {
    content: "";
    display: block;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.4) 50%
    );
    background-size: 210% 100%;
    background-position: right bottom;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 50px;
    transition: all 1s;
    -webkit-transition: all 1s;
  }

  .green {
    background-image: linear-gradient(to right, #25aae1, #40e495);
    box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
  }

  .green:hover:before {
    background-position: left bottom;
  }
}
</style>