<template>
  <div class="otherInfo">
    <titleBar :round="false" title="空间"></titleBar>
    <otherInfo
      :item="info"
      @Follow:any="addFollow"
      @Friend="addFriends"
    ></otherInfo>
  </div>
</template>

<script setup lang="ts">
import { get, post } from "../../../api/api";
import otherInfo from "../../components/other-info.vue";
import { ref, getCurrentInstance } from "vue";
const account = history.state.account;
const info = ref<any>({});
const { proxy }: any = getCurrentInstance();
const getOtherInfo = () => {
  get("/otherInfo", {
    account: account,
    id: localStorage.getItem("Id"),
    myAccount: localStorage.getItem("Account"),
  }).then((res) => {
    info.value = res.data;
  });
};
const addFollow = (account: string, type: boolean) => {
  post("/addAttention", { account, id: localStorage.getItem("Id"), type }).then(
    (res) => {
      proxy.$Toast({
        content: res.message,
        hide: () => {
          getOtherInfo();
        },
      });
      console.log(res);
    }
  );
};
getOtherInfo();
const addFriends = (item: any) => {
  console.log(item);
  if(item.isFriend==='pending') {
    proxy.$Toast({
      content: '已发出好友申请，请等待对方同意！',
    })
    return
  }
  post("/addFriends", {
    account: item.account,
    id: localStorage.getItem("Id"),
  }).then((res) => {
    proxy.$Toast({
      content: res.message,
    })
    console.log(res);
  });
};
</script>

<style lang="scss" scoped>
.otherInfo {
  width: 100%;
  height: 100%;
  background: url(../../assets/bg4.jpeg) 100% 100% no-repeat;
  background-size: cover;
  overflow: hidden;
}
</style>
