<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import HALO from 'vanta/src/vanta.halo'//导入动态样式逻辑
import * as THREE from 'three'//导入样式
const router= useRouter()
const active =ref('home')

const changeFn =(path:any):void=>{
  console.log(active.value);
  router.push({
    name:path
  })
// 背景
}
changeFn('home')
const vantaRef: any = ref(null);
onMounted(() => {
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
    backgroundColor: 0x7192f,
    skyColor: 0x144da0,
    cloudShadowColor: 0x83157,
  });
})
</script>
<template>
    <div>
        <div ref="vantaRef" style="width: 100vw; height: 100vh;" class="bgColor">
        
        <router-view></router-view>
      </div>
        <var-bottom-navigation v-model:active="active" :fixed="true" @change="changeFn">
            <var-bottom-navigation-item name="home" label="首页" icon="home" />
            <var-bottom-navigation-item name="about" label="动态" icon="magnify" />
            <var-bottom-navigation-item name="info" label="好友" icon="heart" />
            <var-bottom-navigation-item name="my" label="我的" icon="account-circle" />
          </var-bottom-navigation>
    </div>
</template>
<style lang="scss">
.var-bottom-navigation{
  background-color: #fff0;

  .var-bottom-navigation-item--active {
    color: #fff;
    background-color: #ffffff85;
    transition: background-color 250ms;
}
}
</style>