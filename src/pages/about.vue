<template>
    <div class="content">
      <var-list class="img-box">
        <div class="glass-container" :key="i" v-for="(item, i) in imgList">
          <var-image ripple :radius="10"  width='200px'  height='200px' :src="item.img[0]" alt=""  @click="ImagePreview(item.img[0])"/>
        </div>
      </var-list>
    </div>
  </template>
<script setup lang="ts">
import { get } from "../../api/api";

import { ref, onMounted } from "vue";
import { ImagePreview } from '@varlet/ui'

const imgList: any = ref([]);

onMounted(() => {
  console.log("", "<===getImg");
  get("/dynamicstate").then((res: any) => {
    imgList.value = res.data.imgList;
    console.log(imgList.value, "<===res");
  });
 
});
</script>

<style scoped lang="scss">
.content {
  height: 100vh;
}
.img-box {
  padding-bottom: 50px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
}
img {
  position: relative;
  z-index: 1;
}
.glass-container {
    margin: 30px;
  padding: 20px 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  //width: 100%;
  height: 230px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 191, 255, 0.075);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
}
.img-item {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
