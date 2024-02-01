<template>
  <div class="login">
    <div ref="vantaRef" style="width: 100%; height: 100vh;" class="bgColor">
      <div class="glass-container" id="glass">
         <var-input blur-color="#fff" focus-color="#fff" text-color="#fff"  placeholder="用户名" v-model="userName" />
        <var-input  blur-color="#fff" focus-color="#fff" text-color="#fff" placeholder="密码" v-model="passWord" />
        <div  class="btn">登录</div>
       </div>
    </div>
   
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'//导入样式
import HALO from 'vanta/src/vanta.halo'//导入动态样式逻辑
const vantaRef = ref(null);
const userName = ref()
const passWord = ref()
onMounted(() => {
  console.log('获取dom元素', vantaRef)
  const vantaEffect = HALO({
    el: vantaRef.value,
    THREE: THREE
  })
  VANTA.HALO({
    el: vantaRef.value,
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    color1: 1000000,
    color2: 16443110,
  });
})



</script>

<style scoped lang="scss">
.login{

.glass-container{
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 230px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  background-color: rgba(0,191,255, 0.075);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;

}
.bgColor{
display: flex;
justify-content: center;
align-items: center;
}
.btn {

  /* 居中 */
  transform: translate(0, 0);
  font-size: 14px;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #09ec7b, #03a9f4);
  background-size: 400%;
  width: 200px;
  height: 40px;
  color: #fff;
  line-height: 40px;
  text-align: center;
  text-transform: uppercase;
  border-radius: 20px;
  z-index: 1;
}

.btn::before {
  content: "";
  position: absolute;
  left: -5px;
  right: -5px;
  top: -5px;
  bottom: -5px;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #3bff93, #03a9f4);
  background-size: 400%;
  border-radius: 50px;
  filter: blur(20px);
  z-index: -1;
}

.btn:hover::before {
  animation: sun 8s infinite;
}

.btn:hover {
  animation: sun 8s infinite;
}

@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}

}
</style>