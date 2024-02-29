<template>
  <div class="content">
    <var-list class="img-box">
      <var-skeleton :loading="loading">
        <template v-if="imgList.length > 0">
          <div class="glass-container" :key="i" v-for="(item, i) in imgList">
            <var-image
              v-if="item.img.length === 1"
              ripple
              :radius="10"
              width="300px"
            
              :src="item.img[0]"
              alt=""
              @click="ImagePreview(item.img[0])"
            />
            <var-swipe
              v-if="item.img.length > 1"
              style="width: 300px; height: 200px"
              class="swipe-example"
              :autoplay="2000"
            >
              <var-swipe-item v-for="(pic, i) in item.img" :key="i">
                <var-image
                  ripple
                  :radius="10"
                  width="300px"
                  height="200px"
                  fit="cover"
                  :src="pic"
                  alt=""
                  @click="ImagePreview(pic)"
                />
              </var-swipe-item>
            </var-swipe>
            <var-cell style="color: #fff">{{ item.content }}</var-cell>
            <div class="info-item">
              <div class="info-icon">
                <span>{{ getTime(item.time) }}</span>
                  <var-icon name="heart" size="16" style="margin-left:10px" v-if="item.islick"/>
                  <var-icon name="heart-outline" size="16" style="margin-left:10px" v-else/>
              </div>
              <span>{{ item.nickname }}</span>
            </div>
          </div>
        </template>
      </var-skeleton>
    </var-list>
    <var-fab color="rgba(118, 140, 165, 0.562)" bottom="100px">
      <var-button type="info" icon-container color="rgba(118, 140, 165, 0.562)">
        <var-icon name="account-circle" :size="24" />
      </var-button>
      <var-button
        type="success"
        icon-container
        color="rgba(118, 140, 165, 0.562)"
        @click="goEdite"
      >
        <var-icon name="translate" :size="24" />
      </var-button>
    </var-fab>
  </div>
</template>
<script setup lang="ts">
import { get } from "../../api/api";
import { getTime } from "../utile/index";
import { ref, onMounted } from "vue";
import { ImagePreview } from "@varlet/ui";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const loading = ref(true);
const imgList: any = ref([]);
console.log(route.params.tag, " router.currentRoute.value", route);
const goEdite = () => {
  router.push("/about/edit");
};
onMounted(() => {
  console.log("", "<===getImg");
  get("/dynamicstate").then((res: any) => {
    imgList.value = res.data.imgList;
    loading.value = false;
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
  min-height: 230px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  background-color: rgba(252, 251, 251, 0.096);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  font-size: 12px;
  .info-icon{
    display: flex;
    align-items: center;
  }
}
.var-button--primary {
  background-color: rgba(118, 140, 165, 0.562);
}
</style>
