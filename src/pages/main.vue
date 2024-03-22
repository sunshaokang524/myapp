// @ts-nocheck
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { get } from "../../api/api";
// @ts-ignore
import NET from "vanta/src/vanta.net"; //导入动态样式逻辑
import * as THREE from "three"; //导入样式
const router = useRouter();

const infoValue: any = ref(0);

const active: any = ref(

  router.currentRoute.value.name === "Main"
    ? "home"
    : router.currentRoute.value.name
);
get("/getInfo", { id: localStorage.getItem("Id") }).then((res: any) => {
  if (res.data.length > 0) {
    const newInfo = res.data[0].infoList.filter(
      (item: any) => item.isRead === false
    );
    infoValue.value = newInfo.length;
  }
});

console.log(router.currentRoute.value.name,'  console.log(router.currentRoute.value.name)')
const changeFn = (path: any): void => {
  if (path === "info") {
    infoValue.value = 0;
  }
  router.push({
    name: path,
  });
  // 背景
};
changeFn(active.value)
const goAi = () => {
  router.push({
    name: "Ai",
  });
};
// changeFn(route.params.tag || "home");
const vantaRef: any = ref(null);
onMounted(() => {
  // @ts-ignore
  const vantaEffect = NET({
    el: vantaRef.value,
    THREE: THREE,
  });
  // @ts-ignore
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
  <div class="main">
    <div ref="vantaRef" style="width: 100vw; height: 100vh" class="bgColor">
      <div class="Ai-chat" @click="goAi">
        <var-icon name="chat-processing" color="#fff" size="30" />
      </div>
      <router-view v-slot="{ Component }">
        <keep-alive>
          
          <component :is="Component" :key="$route.path" >{{Component}}</component>
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
      <var-badge
        type="danger"
        :value="infoValue"
        :max-value="99"
        :hidden="infoValue === 0"
        style="z-index: 100"
      >
        <var-bottom-navigation-item
          name="info"
          label="消息"
          icon="heart"
          style="width: 100%"
        />
      </var-badge>
      <var-bottom-navigation-item
        name="my"
        label="我的"
        icon="account-circle"
      />
    </var-bottom-navigation>
  </div>
</template>
<style lang="scss" scoped>
.main {
  position: relative;
}
.var-bottom-navigation {
  background-color: #fff0;

  .var-bottom-navigation-item--active {
    color: #fff;
    background-color: #ffffff85;
    transition: background-color 250ms;
  }
  ::v-deep .var-badge {
    width: 25%;
  }
}
.Ai-chat {
  z-index: 10;
  position: absolute;
  top: 10px;
  right: 10px;
  // background-color: #fff;
}
</style>
