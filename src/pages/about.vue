<template>
  <div class="content">
    <div class="img-box">
      <var-list
        offset="200"
        :immediate-check="false"
        :finished="finished"
        v-model:loading="listLoad"
        @load="loadFn"
        finished-text=""
      >
        <var-skeleton :loading="loading" card fullscreen>
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
                  <var-icon
                    name="heart"
                    size="16"
                    style="margin-left: 10px"
                    v-if="item.isLike"
                    @click="getLike(false, item.infoId)"
                  />
                  <var-icon
                    name="heart-outline"
                    size="16"
                    style="margin-left: 10px"
                    v-else
                    @click="getLike(true, item.infoId)"
                  />
                </div>
                <span @click="goOtherInfo(item)">{{ item.nickname }}</span>
              </div>
            </div>
          </template>
        </var-skeleton>
      </var-list>
    </div>
    <var-fab color="rgba(118, 140, 165, 0.562)" bottom="100px">
      <var-tooltip content="关注动态"  placement="left-start">
      <var-button type="info" icon-container color="rgba(118, 140, 165, 0.562)">
        <var-icon name="account-circle" :size="24" />
      </var-button>
    </var-tooltip>
    <var-tooltip content="发布动态" placement="left-start">
      <var-button
        type="success"
        icon-container
        color="rgba(118, 140, 165, 0.562)"
        @click="goEdite"
      >
        <var-icon name="translate" :size="24" />
      </var-button>
      </var-tooltip>
    </var-fab>
  </div>
</template>
<script setup lang="ts">
import { get, post } from "../../api/api";
import { getTime } from "../utile/index";
import { ref, getCurrentInstance } from "vue";
import { ImagePreview } from "@varlet/ui";
import { useRouter } from "vue-router";
const { proxy }: any = getCurrentInstance();
const router = useRouter();
const loading = ref(true);
const imgList: any = ref([]);
const pageNum = ref<number>(1);
const finished = ref<boolean>(false);
const listLoad = ref<boolean>(false);
const sum = ref<number>(0);
const loadFn = () => {
  pageNum.value++;
  console.log(pageNum.value);
  if (imgList.value.length === sum.value) {
    finished.value = true;
    listLoad.value = false;
    return;
  }
  getDynamicState(3, pageNum.value);
};
const goEdite = () => {
  get("/personInfo", { id: localStorage.getItem("Id") }).then((res: any) => {
    if (res.code == 200) {
      router.push("/about/edit");
    } else if (res.code == 406) {
      proxy.$Toast({ content: "还未填写个人信息，请点击我的填写个人信息" });
      return;
    }
    // loading.value = false;
  });
};
const getLike = (type: boolean, infoId: any) => {
  console.log(type, infoId);
  post("/myLike", {
    type: type,
    id: localStorage.getItem("Id"),
    infoId: infoId,
  }).then((res: any) => {
    proxy.$Toast({ content: res.message });
    get("/dynamicstate", { id: localStorage.getItem("Id"), pageSize: 3,
    pageNum: pageNum.value, }).then((r: any) => {
      let info = r.data.imgList.filter(
        (item: any) => item.infoId == res.data.infoId
      );
      imgList.value.forEach((element: any) => {
        if (element.infoId == info[0].infoId) {
          element.isLike = info[0].isLike;
        }
      });
    });
  });
};
const getDynamicState = (pageSize: number = 5, pageNum: number) => {
  get("/dynamicstate", {
    id: localStorage.getItem("Id"),
    pageSize: pageSize,
    pageNum: pageNum,
  }).then((res: any) => {
    imgList.value = [...imgList.value, ...res.data.imgList];
    loading.value = false;
    listLoad.value = false;
    sum.value = res.data.sum;
  });
};
const goOtherInfo = (item: any) => {
  if(item.account==localStorage.getItem("Account")) return
  router.push({
    name: "otherInfo",
    state: {
   
        nickname: item.nickname,
        account: item.account,
        infoId: item.infoId,
    
    },
  });
};
// onMounted(() => {
  console.log("", "<===getImg");
  getDynamicState(3, pageNum.value);
// });
</script>

<style scoped lang="scss">
.content {
  height: 100vh;
}
.img-box {
  width: 100%;
  height: 100vh;
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
  .info-icon {
    display: flex;
    align-items: center;
  }
}
.var-button--primary {
  background-color: rgba(118, 140, 165, 0.562);
}
</style>
