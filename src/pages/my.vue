<template>
  <div>
    <myInfo v-if="personInfo.id"></myInfo>
    <editInfo v-else></editInfo>
  </div>
</template>
<script setup lang="ts">
import myInfo from '../components/my-info.vue'
import editInfo from '../components/edit-info.vue'
import { get } from '../../api/api'
import { reactive } from 'vue'
let personInfo: any = reactive({})
get('/personInfo',{id:localStorage.getItem('Id')}).then((res: any) => {
    personInfo = res.data
    console.log(personInfo)
})
</script>
        