<template>
  <div>
    <var-skeleton :loading="loading"
    card  >
      <myInfo v-if="my_id" :item="personInfo"></myInfo>
      <editInfo v-else @getInfo="getInfo"></editInfo>
    </var-skeleton>
  </div>
</template>
<script setup lang="ts">
import myInfo from "../components/my-info.vue";
import editInfo from "../components/edit-info.vue";
import { get } from "../../api/api";
import { reactive, ref } from "vue";
let personInfo: any = reactive({});
let my_id: any = ref("");
const loading = ref(true);
const initInfo = () => {
  get("/personInfo", { id: localStorage.getItem("Id") }).then((res: any) => {
    personInfo = res.data;
    my_id.value = res.data.id;
    loading.value = false;
  });
};

if (!my_id.value) {
  initInfo();
}

const getInfo = () => {
  initInfo();
};
</script>
