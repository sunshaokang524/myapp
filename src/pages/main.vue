<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import NET from "vanta/src/vanta.net"; //导入动态样式逻辑
import * as THREE from "three"; //导入样式
const router = useRouter();
const active = ref("home");

const changeFn = (path: any): void => {
  console.log(active.value);
  router.push({
    name: path,
  });
  // 背景
};
changeFn("home");
const vantaRef: any = ref(null);
onMounted(() => {
  const vantaEffect = NET({
    el: vantaRef.value,
    THREE: THREE,
  });
  VANTA.NET({
    el: vantaRef.value,
    mouseControls: true,
    touchControls: true,
    gyroControls: true,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    color: 0xb3b3,
    color2: 16443110,
    backgroundColor: 0x0,
  });
});
</script>
<template>
  <div>
    <div ref="vantaRef" style="width: 100vw; height: 100vh" class="bgColor">
      <router-view  v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.path" />
          </keep-alive>
        </router-view>
    </div>
    <var-bottom-navigation
      v-model:active="active"
      :fixed="true"
      @change="changeFn"
    >
      <var-bottom-navigation-item name="home" label="首页" icon="home" />
      <var-bottom-navigation-item name="about" label="动态" icon="magnify" />
      <var-bottom-navigation-item name="info" label="好友" icon="heart" />
      <var-bottom-navigation-item
        name="my"
        label="我的"
        icon="account-circle"
      />
    </var-bottom-navigation>
  </div>
</template>
<style lang="scss">
.var-bottom-navigation {
  background-color: #fff0;

  .var-bottom-navigation-item--active {
    color: #fff;
    background-color: #ffffff85;
    transition: background-color 250ms;
  }
}
</style>
